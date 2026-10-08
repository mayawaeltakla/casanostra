import { expect, test } from "@playwright/test";

const locales = ["ar", "en", "tr", "fr", "ru"] as const;
const emailHref = "mailto:info@casanostra-tr.com";
const privacyEmailHref = "mailto:kvkk@casanostra-tr.com";

test("public and KVKK email addresses remain distinct across localized contact surfaces", async ({
  page,
  baseURL,
}) => {
  if (!baseURL) {
    throw new Error("Playwright baseURL must be configured for the official email test.");
  }

  for (const locale of locales) {
    for (const route of [`/${locale}/contact`, `/${locale}/help`]) {
      await page.goto(route, { waitUntil: "domcontentloaded" });
      await expect(
        page.locator(`a[href="${emailHref}"]`).first(),
        `${locale} ${route} should link to the official public email`,
      ).toBeVisible();
    }

    for (const route of [`/${locale}/privacy`, `/${locale}/terms`]) {
      await page.goto(route, { waitUntil: "domcontentloaded" });
      await expect(
        page.locator(`a[href="${emailHref}"]`).first(),
        `${locale} ${route} should keep the public contact email in the footer`,
      ).toBeVisible();
      if (locale === "ar") {
        await expect(
          page.locator(`a[href="${privacyEmailHref}"]`).first(),
          `${route} should link to the KVKK privacy email`,
        ).toBeVisible();
      }
    }
  }
});
