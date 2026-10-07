import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import ts from "typescript";

const nodeRequire = createRequire(import.meta.url);
const projectRoot = process.cwd();

function loadTypeScriptModule(relativePath) {
  const filePath = path.join(projectRoot, relativePath);
  const source = fs.readFileSync(filePath, "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
  });
  const loadedModule = { exports: {} };
  new Function("module", "exports", "require", outputText)(
    loadedModule,
    loadedModule.exports,
    nodeRequire,
  );
  return loadedModule.exports;
}

function reportDuplicates(values, description, errors) {
  const seen = new Set();
  for (const value of values) {
    if (seen.has(value)) {
      errors.push(`${description}: duplicate "${value}"`);
    }
    seen.add(value);
  }
}

function compareKeys(actualKeys, expectedKeys, description, errors) {
  const actual = [...new Set(actualKeys)].sort();
  const expected = [...expectedKeys].sort();
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    errors.push(
      `${description}: expected [${expected.join(", ")}], found [${actual.join(", ")}]`,
    );
  }
}

function isRecord(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function validateLocaleKeys(catalog, expectedLocales, description, errors) {
  if (!isRecord(catalog)) {
    errors.push(`${description}: expected an object keyed by locale`);
    return;
  }

  const actualLocales = Object.keys(catalog).sort();
  const expected = [...expectedLocales].sort();
  if (JSON.stringify(actualLocales) !== JSON.stringify(expected)) {
    errors.push(
      `${description}: expected locales [${expected.join(", ")}], found [${actualLocales.join(", ")}]`,
    );
  }
}

function validateLocalImage(imagePath, description, errors, { allowRemote = false } = {}) {
  if (typeof imagePath !== "string" || !imagePath.trim()) {
    errors.push(`${description}: image path is empty or invalid`);
    return;
  }

  if (/^https?:\/\//i.test(imagePath)) {
    if (allowRemote && URL.canParse(imagePath)) {
      return;
    }
    errors.push(`${description}: remote image URL is not allowed here: "${imagePath}"`);
    return;
  }

  if (!imagePath.startsWith("/") || imagePath.includes("?") || imagePath.includes("#")) {
    errors.push(`${description}: expected a root-relative local image path, found "${imagePath}"`);
    return;
  }

  const segments = imagePath.slice(1).split("/");
  const absolutePath = path.resolve(projectRoot, "public", ...segments);
  const relativePath = path.relative(path.resolve(projectRoot, "public"), absolutePath);
  if (
    relativePath === ".." ||
    relativePath.startsWith(`..${path.sep}`) ||
    path.isAbsolute(relativePath)
  ) {
    errors.push(`${description}: image path escapes public: "${imagePath}"`);
    return;
  }

  if (!fs.existsSync(absolutePath) || !fs.statSync(absolutePath).isFile()) {
    errors.push(`${description}: referenced image does not exist: "${imagePath}"`);
  }
}

const { locales, messages } = loadTypeScriptModule("src/i18n/messages.ts");
const pageModule = loadTypeScriptModule("src/i18n/page-messages.ts");
const { pageMessages, servicesPageMessages, serviceFormsMessages } = pageModule;
const { serviceDetailMessages } = loadTypeScriptModule("src/i18n/service-details.ts");
const { services: formServices } = loadTypeScriptModule("src/lib/services.ts");
const { servicesList, offersList } = loadTypeScriptModule("src/lib/site-config.ts");
const { blogPosts } = loadTypeScriptModule("src/lib/blog.ts");
const errors = [];
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const fieldTypes = new Set([
  "text",
  "tel",
  "number",
  "date",
  "datetime-local",
  "select",
  "radio",
  "textarea",
  "people-counter",
]);
const personFieldTypes = new Set(["text", "tel", "number"]);
const supportedLocales = [...locales];

const formSlugs = formServices.map(({ slug }) => slug);
const contentSlugs = servicesList.map(({ slug }) => slug);
const formSlugSet = new Set(formSlugs);
const contentSlugSet = new Set(contentSlugs);

reportDuplicates(formSlugs, "service form slugs", errors);
reportDuplicates(contentSlugs, "service content slugs", errors);
reportDuplicates(blogPosts.map(({ slug }) => slug), "blog slugs", errors);
reportDuplicates(offersList.map(({ id }) => id), "offer IDs", errors);

for (const [description, slugs, source] of [
  ["service form", formSlugs, "src/lib/services.ts"],
  ["service content", contentSlugs, "src/lib/site-config.ts"],
]) {
  for (const slug of slugs) {
    if (!slugPattern.test(slug)) {
      errors.push(`${source}: invalid slug "${slug}"`);
    }
  }
}

for (const slug of formSlugSet) {
  if (!contentSlugSet.has(slug)) {
    errors.push(`service ${slug}: has a form schema but no service content`);
  }
}
for (const slug of contentSlugSet) {
  if (!formSlugSet.has(slug)) {
    errors.push(`service ${slug}: has service content but no form schema`);
  }
}

for (const locale of supportedLocales) {
  if (!messages[locale]) {
    errors.push(`src/i18n/messages.ts: missing messages for locale "${locale}"`);
  }
}
validateLocaleKeys(messages, supportedLocales, "base message catalog", errors);

for (const [namespace, catalog] of Object.entries(pageMessages)) {
  validateLocaleKeys(catalog, supportedLocales, `page message catalog "${namespace}"`, errors);
  for (const locale of supportedLocales) {
    if (!catalog?.[locale]) {
      errors.push(`page message catalog "${namespace}": missing locale "${locale}"`);
    }
  }
}

const nonArabicLocales = supportedLocales.filter((locale) => locale !== "ar");
validateLocaleKeys(
  serviceDetailMessages,
  nonArabicLocales,
  "service detail catalog",
  errors,
);

for (const locale of supportedLocales) {
  const cards = servicesPageMessages?.[locale]?.serviceCards;
  if (!isRecord(cards)) {
    errors.push(`servicesPage/${locale}: serviceCards catalog is missing`);
    continue;
  }

  const cardSlugs = Object.keys(cards);

  const expected = [...contentSlugSet].sort();
  const actual = cardSlugs.sort();
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    errors.push(
      `servicesPage/${locale}: service card slugs do not match service content (expected [${expected.join(", ")}], found [${actual.join(", ")}])`,
    );
  }

  for (const [slug, card] of Object.entries(cards)) {
    for (const key of ["title", "description", "duration", "price"]) {
      if (typeof card?.[key] !== "string" || !card[key].trim()) {
        errors.push(`servicesPage/${locale}.serviceCards.${slug}.${key}: missing or empty`);
      }
    }
  }
}

for (const locale of nonArabicLocales) {
  const translatedServices = serviceDetailMessages?.[locale];
  if (!isRecord(translatedServices)) {
    errors.push(`serviceDetails/${locale}: catalog is missing`);
    continue;
  }

  const expected = [...contentSlugSet].sort();
  const actual = Object.keys(translatedServices).sort();
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    errors.push(
      `serviceDetails/${locale}: slugs do not match service content (expected [${expected.join(", ")}], found [${actual.join(", ")}])`,
    );
  }

  for (const [slug, details] of Object.entries(translatedServices)) {
    const source = servicesList.find((service) => service.slug === slug);
    if (!source) {
      continue;
    }
    if (details.features?.length !== source.features.length) {
      errors.push(
        `serviceDetails/${locale}.${slug}: expected ${source.features.length} features, found ${details.features?.length ?? 0}`,
      );
    }
    for (const key of ["included", "excluded"]) {
      if (details[key]?.length !== source[key].length) {
        errors.push(
          `serviceDetails/${locale}.${slug}: expected ${source[key].length} ${key} items, found ${details[key]?.length ?? 0}`,
        );
      }
    }
    if (typeof details.description !== "string" || !details.description.trim()) {
      errors.push(`serviceDetails/${locale}.${slug}.description: missing or invalid`);
    }
    for (const [index, feature] of (details.features ?? []).entries()) {
      if (
        typeof feature?.title !== "string" ||
        !feature.title.trim() ||
        typeof feature?.description !== "string" ||
        !feature.description.trim()
      ) {
        errors.push(`serviceDetails/${locale}.${slug}.features[${index}]: missing title or description`);
      }
    }
    for (const key of ["included", "excluded"]) {
      for (const [index, item] of (details[key] ?? []).entries()) {
        if (typeof item !== "string" || !item.trim()) {
          errors.push(`serviceDetails/${locale}.${slug}.${key}[${index}]: missing or invalid`);
        }
      }
    }
  }
}

const schemaFieldNames = new Set();
const schemaOptionKeys = new Set();
for (const service of formServices) {
  const fieldNames = service.fields.map(({ name }) => name);
  reportDuplicates(fieldNames, `service ${service.slug} field names`, errors);
  const fieldsByName = new Map(service.fields.map((field) => [field.name, field]));

  for (const field of service.fields) {
    if (!fieldTypes.has(field.type)) {
      errors.push(`service ${service.slug}.${field.name}: unsupported field type "${field.type}"`);
    }

    if (["select", "radio"].includes(field.type)) {
      if (!Array.isArray(field.options) || field.options.length === 0) {
        errors.push(`service ${service.slug}.${field.name}: ${field.type} field has no options`);
      } else {
        reportDuplicates(
          field.options,
          `service ${service.slug}.${field.name} options`,
          errors,
        );
      }
    }

    if (field.type === "people-counter" && !field.personFields?.length) {
      errors.push(`service ${service.slug}.${field.name}: people-counter has no person fields`);
    }
    if (field.type !== "people-counter" && field.personFields?.length) {
      errors.push(`service ${service.slug}.${field.name}: person fields require people-counter type`);
    }

    if (field.showWhen) {
      const controllingField = fieldsByName.get(field.showWhen.field);
      if (!controllingField) {
        errors.push(
          `service ${service.slug}.${field.name}: showWhen references unknown field "${field.showWhen.field}"`,
        );
      } else if (
        !["select", "radio"].includes(controllingField.type) ||
        !controllingField.options?.includes(field.showWhen.equals)
      ) {
        errors.push(
          `service ${service.slug}.${field.name}: showWhen value "${field.showWhen.equals}" is not an option of "${field.showWhen.field}"`,
        );
      }
    }

    const allFieldNames = [
      field.name,
      ...(field.personFields ?? []).map(({ name }) => name),
    ];
    for (const name of allFieldNames) {
      schemaFieldNames.add(name);
      for (const locale of supportedLocales) {
        const label = serviceFormsMessages?.[locale]?.fields?.[name];
        if (typeof label !== "string" || !label.trim()) {
          errors.push(`serviceForms/${locale}.fields.${name}: missing label for ${service.slug}`);
        }
      }
    }

    if (field.personFields) {
      reportDuplicates(
        field.personFields.map(({ name }) => name),
        `service ${service.slug}.${field.name} person field names`,
        errors,
      );
      for (const personField of field.personFields) {
        if (!personFieldTypes.has(personField.type)) {
          errors.push(
            `service ${service.slug}.${field.name}.${personField.name}: unsupported person field type "${personField.type}"`,
          );
        }
      }
    }

    if (field.options?.length) {
      const optionKey = field.name === "tourType"
        ? service.slug === "daily-tours"
          ? "dailyTours"
          : service.slug === "private-tours"
            ? "privateTours"
            : "groupTours"
        : field.name === "interest" && service.slug === "medical-tourism"
          ? "medicalInterest"
          : field.name;
      schemaOptionKeys.add(optionKey);

      for (const locale of supportedLocales) {
        const translatedOptions = serviceFormsMessages?.[locale]?.options?.[optionKey];
        if (
          !Array.isArray(translatedOptions) ||
          translatedOptions.length !== field.options.length ||
          translatedOptions.some((option) => typeof option !== "string" || !option.trim())
        ) {
          errors.push(
            `serviceForms/${locale}.options.${optionKey}: expected ${field.options.length} non-empty options for ${service.slug}.${field.name}`,
          );
        } else {
          reportDuplicates(
            translatedOptions,
            `serviceForms/${locale}.options.${optionKey}`,
            errors,
          );
        }
      }
    }
  }
}

for (const locale of supportedLocales) {
  compareKeys(
    Object.keys(serviceFormsMessages?.[locale]?.fields ?? {}),
    schemaFieldNames,
    `serviceForms/${locale}.fields`,
    errors,
  );
  compareKeys(
    Object.keys(serviceFormsMessages?.[locale]?.options ?? {}),
    schemaOptionKeys,
    `serviceForms/${locale}.options`,
    errors,
  );
}

for (const service of servicesList) {
  validateLocalImage(service.heroImage, `service ${service.slug} heroImage`, errors);
  for (const [index, imagePath] of service.galleryImages.entries()) {
    validateLocalImage(imagePath, `service ${service.slug} galleryImages[${index}]`, errors);
  }
}

const serviceRoute = fs.readFileSync(
  path.join(projectRoot, "src/app/services/[slug]/page.tsx"),
  "utf8",
);
if (!serviceRoute.includes("generateStaticParams") || !serviceRoute.includes("serviceFormDefs.map")) {
  errors.push("service route: generateStaticParams does not use the form service slugs");
}

for (const offer of offersList) {
  validateLocalImage(offer.heroImage, `offer ${offer.id} heroImage`, errors);
  if (offer.relatedServiceSlug && !contentSlugSet.has(offer.relatedServiceSlug)) {
    errors.push(`offer ${offer.id}: unknown related service "${offer.relatedServiceSlug}"`);
  }
}

const blogSlugs = new Set(blogPosts.map(({ slug }) => slug));
for (const post of blogPosts) {
  if (!slugPattern.test(post.slug)) {
    errors.push(`blog post "${post.slug}": invalid slug`);
  }
  if (
    typeof post.publishedAt !== "string" ||
    !/^\d{4}-\d{2}-\d{2}$/.test(post.publishedAt) ||
    Number.isNaN(Date.parse(`${post.publishedAt}T00:00:00Z`)) ||
    new Date(`${post.publishedAt}T00:00:00Z`).toISOString().slice(0, 10) !== post.publishedAt
  ) {
    errors.push(`blog post ${post.slug}: invalid ISO publication date "${post.publishedAt}"`);
  }
  validateLocalImage(
    post.coverImage,
    `blog post ${post.slug} coverImage`,
    errors,
    { allowRemote: true },
  );
}

const blogRoute = fs.readFileSync(
  path.join(projectRoot, "src/app/blog/[slug]/page.tsx"),
  "utf8",
);
if (!blogRoute.includes("generateStaticParams") || !blogRoute.includes("blogPosts.map")) {
  errors.push("blog route: generateStaticParams does not use the blog post slugs");
}

const sourceExtensions = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".css"]);
const localImagePattern = /\/images\/[^"'`\s,)}`>]+\.(?:jpg|jpeg|png|webp|avif|gif|svg)/gi;
let scannedImageReferences = 0;
const scannedImageChecks = new Set();

function scanSourceDirectory(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const filePath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      scanSourceDirectory(filePath);
      continue;
    }
    if (!sourceExtensions.has(path.extname(entry.name))) {
      continue;
    }

    const source = fs.readFileSync(filePath, "utf8");
    for (const match of source.matchAll(localImagePattern)) {
      scannedImageReferences += 1;
      const checkKey = `${filePath}:${match[0]}`;
      if (scannedImageChecks.has(checkKey)) {
        continue;
      }
      scannedImageChecks.add(checkKey);
      validateLocalImage(
        match[0],
        `${path.relative(projectRoot, filePath)} image reference`,
        errors,
      );
    }
  }
}

scanSourceDirectory(path.join(projectRoot, "src"));

if (errors.length > 0) {
  console.error(
    `DATA INTEGRITY: FAIL (${errors.length} issue(s); ${formServices.length} services, ${blogPosts.length} blog posts, ${supportedLocales.length} locales, ${scannedImageReferences} local image references).`,
  );
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exitCode = 1;
} else {
  console.log(
    `DATA INTEGRITY: PASS (${formServices.length} services, ${blogSlugs.size} blog posts, ${supportedLocales.length} locales, ${scannedImageReferences} local image references).`,
  );
}
