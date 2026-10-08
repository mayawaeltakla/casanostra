import { expect, test } from "@playwright/test";

const plansByLocale = {
  ar: ["الخطّة البرونزية", "الخطّة الفضية", "الخطّة الذهبية"],
  en: ["Bronze Plan", "Silver Plan", "Gold Plan"],
  tr: ["Bronz Plan", "Gümüş Plan", "Altın Plan"],
  fr: ["Formule Bronze", "Formule Argent", "Formule Or"],
  ru: ["Бронзовый план", "Серебряный план", "Золотой план"],
} as const;

test("plans show only confirmed names and route questions to the official WhatsApp", async ({
  page,
  baseURL,
}) => {
  if (!baseURL) {
    throw new Error("Playwright baseURL must be configured for the plan details test.");
  }

  for (const [locale, planNames] of Object.entries(plansByLocale)) {
    await page.goto(`/${locale}/plans`, { waitUntil: "domcontentloaded" });

    for (const planName of planNames) {
      await expect(page.getByRole("heading", { name: planName })).toBeVisible();
    }

    const mainText = await page.getByRole("main").last().innerText();
    expect(mainText).not.toMatch(/\b(?:499|899|1999)\b|(?:3|5|10)\s*(?:years?|ans|yıl|лет)|\d+%/i);
    await expect(
      page.getByRole("main").last().locator('a[href^="https://wa.me/905556444494?text="]'),
    ).toBeVisible();
  }
});
