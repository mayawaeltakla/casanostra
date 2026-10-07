import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import ts from "typescript";

const nodeRequire = createRequire(import.meta.url);

function loadTypeScriptModule(relativePath) {
  const filePath = path.join(process.cwd(), relativePath);
  const source = fs.readFileSync(filePath, "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  });
  const loadedModule = { exports: {} };
  new Function("module", "exports", "require", outputText)(
    loadedModule,
    loadedModule.exports,
    nodeRequire,
  );
  return loadedModule.exports;
}

function flatten(value, prefix = "", result = new Map()) {
  if (typeof value === "string") {
    result.set(prefix, value);
    return result;
  }

  if (Array.isArray(value)) {
    value.forEach((entry, index) => flatten(entry, `${prefix}.${index}`, result));
    return result;
  }

  if (value && typeof value === "object") {
    for (const [key, entry] of Object.entries(value)) {
      flatten(entry, prefix ? `${prefix}.${key}` : key, result);
    }
  }

  return result;
}

function placeholders(value) {
  return [...value.matchAll(/\{([\w.-]+)\}/g)].map((match) => match[1]).sort();
}

const { locales, messages, languageNames } = loadTypeScriptModule("src/i18n/messages.ts");
const { pageMessages } = loadTypeScriptModule("src/i18n/page-messages.ts");
const { servicesList } = loadTypeScriptModule("src/lib/site-config.ts");
const { serviceDetailMessages } = loadTypeScriptModule("src/i18n/service-details.ts");
const catalogs = [["messages", messages], ...Object.entries(pageMessages)];
const errors = [];
const arabicPattern = /[\u0600-\u06FF]/;
const arabicExceptions = new Map([
  ["languageNames.ar.native", "Native-language name shown intentionally in the language picker."],
]);

function rejectArabic(value, locale, key, namespace) {
  if (typeof value === "string") {
    if (locale !== "ar" && arabicPattern.test(value)) {
      errors.push(`${namespace}/${locale}.${key}: contains Arabic-script text`);
    }
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((entry, index) => rejectArabic(entry, locale, `${key}.${index}`, namespace));
    return;
  }

  if (value && typeof value === "object") {
    for (const [childKey, entry] of Object.entries(value)) {
      rejectArabic(entry, locale, key ? `${key}.${childKey}` : childKey, namespace);
    }
  }
}

for (const [namespace, catalog] of catalogs) {
  const flattened = Object.fromEntries(
    locales.map((locale) => [locale, flatten(catalog[locale])]),
  );
  const referenceLocale = locales[0];
  const referenceKeys = new Set(flattened[referenceLocale].keys());

  for (const locale of locales) {
    const localeKeys = new Set(flattened[locale].keys());
    const missing = [...referenceKeys].filter((key) => !localeKeys.has(key));
    const extra = [...localeKeys].filter((key) => !referenceKeys.has(key));

    if (missing.length || extra.length) {
      errors.push(`${namespace}/${locale}: missing [${missing.join(", ")}], extra [${extra.join(", ")}]`);
    }

    rejectArabic(catalog[locale], locale, "", namespace);

    for (const [key, value] of flattened[locale]) {
      if (/\[TODO-[a-z]{2}\]/i.test(value)) {
        errors.push(`${namespace}/${locale}.${key}: contains an unfinished TODO translation`);
      }

      const referenceValue = flattened[referenceLocale].get(key);
      if (referenceValue && placeholders(value).join("|") !== placeholders(referenceValue).join("|")) {
        errors.push(`${namespace}/${locale}.${key}: interpolation placeholders do not match ${referenceLocale}`);
      }
    }
  }
}

for (const [key, value] of flatten(languageNames)) {
  if (arabicPattern.test(value) && !arabicExceptions.has(`languageNames.${key}`)) {
    errors.push(`languageNames.${key}: Arabic-script text has no documented exception`);
  }
}

for (const locale of locales.filter((value) => value !== "ar")) {
  const translations = serviceDetailMessages[locale];
  rejectArabic(translations, locale, "", "serviceDetails");
  const expectedSlugs = new Set(servicesList.map(({ slug }) => slug));
  const translatedSlugs = new Set(Object.keys(translations || {}));

  for (const slug of expectedSlugs) {
    const translated = translations?.[slug];
    const source = servicesList.find((service) => service.slug === slug);

    if (!translated) {
      errors.push(`serviceDetails/${locale}: missing service ${slug}`);
      continue;
    }

    if (translated.features.length !== source.features.length) {
      errors.push(`serviceDetails/${locale}.${slug}: expected ${source.features.length} features, found ${translated.features.length}`);
    }
    if (translated.included.length !== source.included.length) {
      errors.push(`serviceDetails/${locale}.${slug}: expected ${source.included.length} included items, found ${translated.included.length}`);
    }
    if (translated.excluded.length !== source.excluded.length) {
      errors.push(`serviceDetails/${locale}.${slug}: expected ${source.excluded.length} excluded items, found ${translated.excluded.length}`);
    }

    const values = [translated.description, ...translated.features.flatMap(({ title, description }) => [title, description]), ...translated.included, ...translated.excluded];
    for (const [index, value] of values.entries()) {
      if (typeof value !== "string" || !value.trim()) {
        errors.push(`serviceDetails/${locale}.${slug}[${index}]: translation is empty or invalid`);
      }
    }
  }

  for (const slug of translatedSlugs) {
    if (!expectedSlugs.has(slug)) {
      errors.push(`serviceDetails/${locale}: unknown service ${slug}`);
    }
  }
}

if (errors.length) {
  console.error("i18n validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(`i18n validation passed: ${catalogs.length} catalogs, ${locales.length} locales.`);
}