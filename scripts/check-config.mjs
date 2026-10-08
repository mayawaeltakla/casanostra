import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import ts from "typescript";

const projectRoot = process.cwd();

function loadTypeScriptModule(relativePath, moduleMocks = {}) {
  const filePath = path.join(projectRoot, relativePath);
  const moduleRequire = createRequire(filePath);
  const resolveModule = (specifier) =>
    Object.hasOwn(moduleMocks, specifier)
      ? moduleMocks[specifier]
      : moduleRequire(specifier);
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
    resolveModule,
  );
  return loadedModule.exports;
}

function readEnvValue(key) {
  for (const filename of [
    ".env.production.local",
    ".env.local",
    ".env.production",
    ".env",
  ]) {
    const filePath = path.join(projectRoot, filename);
    if (!fs.existsSync(filePath)) {
      continue;
    }

    const line = fs
      .readFileSync(filePath, "utf8")
      .split(/\r?\n/)
      .find((entry) => entry.trimStart().startsWith(`${key}=`));
    if (line) {
      return line.slice(line.indexOf("=") + 1).trim().replace(/^(['"])(.*)\1$/, "$2");
    }
  }
  return undefined;
}

const { siteConfig } = loadTypeScriptModule("src/lib/site-config.ts");
const envNumber =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ||
  readEnvValue("NEXT_PUBLIC_WHATSAPP_NUMBER");
const configuredNumber = envNumber || siteConfig.whatsappNumber;
const whatsappNumber = configuredNumber.replace(/\D/g, "");
const siteConfigNumber = siteConfig.whatsappNumber.replace(/\D/g, "");
const errors = [];
const phoneIntl = siteConfig.contact.phoneIntl.replace(/\D/g, "");
const phoneDisplay = siteConfig.contact.phoneDisplay.replace(/\D/g, "");

if (!/^\d{8,15}$/.test(whatsappNumber)) {
  errors.push("WhatsApp number must contain 8 to 15 digits after normalization.");
}
if (envNumber && siteConfigNumber !== whatsappNumber) {
  errors.push("NEXT_PUBLIC_WHATSAPP_NUMBER must match siteConfig.whatsappNumber.");
}
if (/X{3,}/i.test(siteConfig.whatsappNumber)) {
  errors.push("siteConfig.whatsappNumber still contains a placeholder.");
}
if (phoneIntl !== whatsappNumber || phoneDisplay !== whatsappNumber) {
  errors.push("Displayed phone, tel destination, and WhatsApp number must match.");
}
if (!siteConfig.contact.email || !siteConfig.contact.privacyEmail) {
  errors.push("Public contact and privacy email addresses must be configured.");
}

if (errors.length > 0) {
  console.error("Configuration validation failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

process.env.NEXT_PUBLIC_WHATSAPP_NUMBER = configuredNumber;
const servicesModule = loadTypeScriptModule("src/lib/services.ts");
const {
  buildSimpleWhatsAppLink,
  buildWhatsAppLink,
} = loadTypeScriptModule("src/lib/whatsapp.ts", {
  "./site-config": { siteConfig },
  "./services": servicesModule,
});
const expectedPrefix = `https://wa.me/${whatsappNumber}?text=`;
const generatedLinks = [
  buildSimpleWhatsAppLink("Configuration check"),
  buildWhatsAppLink({ name: "Configuration check" }),
];

if (generatedLinks.some((link) => !link.startsWith(expectedPrefix))) {
  console.error("Configuration validation failed: WhatsApp builders do not use the configured number.");
  process.exit(1);
}

console.log("Configuration validation passed: WhatsApp number and URL builders are valid.");
