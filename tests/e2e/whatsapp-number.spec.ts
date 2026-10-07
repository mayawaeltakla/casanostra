import { expect, test } from "@playwright/test";

const locales = ["ar", "en", "tr", "fr", "ru"] as const;
const whatsappLinkPattern =
  /^https:\/\/wa\.me\/905556444494\?text=/;
const officialTelephoneLink = "tel:+905556444494";

test("WhatsApp entry points and booking requests use the official number in every locale", async ({
  page,
  baseURL,
}) => {
  if (!baseURL) {
    throw new Error("Playwright baseURL must be configured for the WhatsApp number test.");
  }

  await page.addInitScript(() => {
    window.open = (url) => {
      sessionStorage.setItem("whatsapp-opened-url", String(url));
      return null;
    };
  });

  for (const locale of locales) {
    await page.context().clearCookies();
    await page.context().addCookies([
      {
        name: "casanostra-locale",
        value: locale,
        url: baseURL,
      },
    ]);

    await page.goto("/", { waitUntil: "domcontentloaded" });
    const homeTelephoneLinks = await page
      .locator('a[href^="tel:"]')
      .evaluateAll((links) => links.map((link) => link.getAttribute("href")));
    expect(homeTelephoneLinks.length, `${locale} home telephone links`).toBeGreaterThan(0);
    expect(homeTelephoneLinks.every((href) => href === officialTelephoneLink)).toBe(true);

    await page.goto("/contact", { waitUntil: "domcontentloaded" });
    const contactTelephoneLinks = await page
      .locator('a[href^="tel:"]')
      .evaluateAll((links) => links.map((link) => link.getAttribute("href")));
    expect(contactTelephoneLinks.length, `${locale} contact telephone links`).toBeGreaterThan(0);
    expect(contactTelephoneLinks.every((href) => href === officialTelephoneLink)).toBe(true);
    const contactWhatsAppLinks = await page
      .locator('a[href^="https://wa.me/"]')
      .evaluateAll((links) => links.map((link) => link.getAttribute("href")));
    expect(contactWhatsAppLinks.length, `${locale} contact WhatsApp links`).toBeGreaterThan(0);
    for (const href of contactWhatsAppLinks) {
      expect(href).toMatch(whatsappLinkPattern);
    }

    await page.goto("/help", { waitUntil: "domcontentloaded" });
    const helpTelephoneLinks = await page
      .locator('a[href^="tel:"]')
      .evaluateAll((links) => links.map((link) => link.getAttribute("href")));
    expect(helpTelephoneLinks.length, `${locale} help telephone links`).toBeGreaterThan(0);
    expect(helpTelephoneLinks.every((href) => href === officialTelephoneLink)).toBe(true);

    await page.goto("/services/visa", { waitUntil: "domcontentloaded" });
    const form = page.locator("form").first();
    const phoneInputs = form.locator('input[type="tel"]');
    for (const phoneInput of await phoneInputs.all()) {
      await expect(phoneInput).not.toHaveAttribute("placeholder", /\+?90|X{3,}/i);
    }
    const inputs = form.locator('input[type="text"], input[type="tel"], input[type="number"]');

    for (const input of await inputs.all()) {
      const type = await input.getAttribute("type");
      await input.fill(type === "number" ? "30" : "Test");
    }

    await form.locator('button[type="submit"]').click();
    await expect
      .poll(() => page.evaluate(() => sessionStorage.getItem("whatsapp-opened-url")))
      .toMatch(whatsappLinkPattern);
  }
});
