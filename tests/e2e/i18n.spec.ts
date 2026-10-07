import { expect, test } from "@playwright/test";

const locales = [
  { code: "ar", dir: "rtl", contactSubmit: "إرسال عبر البريد الإلكتروني", bookingSubmit: "إرسال المعلومات إلى واتساب" },
  { code: "en", dir: "ltr", contactSubmit: "Send via Email", bookingSubmit: "Send Details via WhatsApp" },
  { code: "tr", dir: "ltr", contactSubmit: "E-posta ile Gönder", bookingSubmit: "Bilgileri WhatsApp ile Gönder" },
  { code: "fr", dir: "ltr", contactSubmit: "Envoyer par E-mail", bookingSubmit: "Envoyer les Informations via WhatsApp" },
  { code: "ru", dir: "ltr", contactSubmit: "Отправить по электронной почте", bookingSubmit: "Отправить данные через WhatsApp" },
];

const priorityRoutes = [
  "/",
  "/services",
  "/services/vip-cars",
  "/services/reservations-turkey",
  "/services/visa",
  "/services/hotels",
  "/services/flights",
  "/services/daily-tours",
  "/services/private-tours",
  "/services/group-tours",
  "/services/hajj-umrah",
  "/services/medical-tourism",
  "/services/other-services",
  "/offers",
  "/quick-booking",
  "/contact",
  "/about",
  "/faq",
  "/help",
  "/plans",
  "/privacy",
  "/terms",
  "/blog",
  "/blog/best-10-places-istanbul",
  "/blog/turkey-visa-complete-guide",
  "/blog/cappadocia-balloon-city",
  "/blog/golden-tips-before-turkey-trip",
];
const deferredRoutes = new Set([
  "/blog",
  "/blog/best-10-places-istanbul",
  "/blog/turkey-visa-complete-guide",
  "/blog/cappadocia-balloon-city",
  "/blog/golden-tips-before-turkey-trip",
  "/privacy",
  "/terms",
]);

for (const locale of locales) {
  for (const route of priorityRoutes) {
    test(`${locale.code}: ${route} uses the selected language and direction`, async ({ page }) => {
      test.setTimeout(90_000);
      await page.context().addCookies([
        { name: "casanostra-locale", value: locale.code, url: "http://127.0.0.1:3010" },
      ]);
      console.log(`[${locale.code}] ${route}`);
      const startedAt = Date.now();
      await page.goto(route, { waitUntil: "domcontentloaded" });
      console.log(`[${locale.code}] ${route} loaded in ${Date.now() - startedAt}ms`);
      await expect(page.locator("html")).toHaveAttribute("lang", locale.code);
      await expect(page.locator("html")).toHaveAttribute("dir", locale.dir);
      const main = page.locator("main");
      await expect(main, `No <main> at ${route} (${locale.code})`).toBeVisible({ timeout: 60_000 });
      const mainText = await main.innerText();
      if (locale.code !== "ar") {
        const whatsappMessages = await main.locator('a[href^="https://wa.me/"]').evaluateAll((links) =>
          links.map((link) => new URL((link as HTMLAnchorElement).href).searchParams.get("text") || ""),
        );
        expect(
          whatsappMessages.filter((message) => /[\u0600-\u06FF]/.test(message)),
          `Arabic WhatsApp message at ${route} (${locale.code})`,
        ).toEqual([]);
      }

      if (deferredRoutes.has(route)) {
        const robots = await page.locator('meta[name="robots"]').getAttribute("content");
        const hasNoindex = robots?.includes("noindex") ?? false;
        expect(hasNoindex, `Unexpected robots metadata at ${route} (${locale.code}): ${robots}`).toBe(locale.code !== "ar");
        await expect(page.locator('link[rel="alternate"][hreflang]')).toHaveCount(0);
      }

      if (locale.code !== "ar") {
        const arabicLines = mainText.split("\n").filter((line) => /[\u0600-\u06FF]/.test(line));
        expect(arabicLines, `Arabic text at ${route} (${locale.code}): ${JSON.stringify(arabicLines)}`).toEqual([]);

        const metaDescription = await page.locator('meta[name="description"]').getAttribute("content");
        expect(metaDescription, `Missing meta description at ${route} (${locale.code})`).toBeTruthy();
        const surfaces = [
          ["header", await page.getByRole("banner").innerText()],
          ["footer", await page.getByRole("contentinfo").innerText()],
          ["document.title", await page.title()],
          ["meta description", metaDescription || ""],
        ];
        for (const [surface, text] of surfaces) {
          const arabicText = text.split("\n").filter((line) => /[\u0600-\u06FF]/.test(line));
          expect(arabicText, `Arabic text in ${surface} at ${route} (${locale.code}): ${JSON.stringify(arabicText)}`).toEqual([]);
        }

        if (route === "/blog" || route.startsWith("/blog/")) {
          await expect(main.locator('a[href^="/blog/"]')).toHaveCount(0);
        }
      }
    });
  }

  test(`${locale.code}: contact and booking validation use localized copy`, async ({ page }) => {
    await page.context().addCookies([
      { name: "casanostra-locale", value: locale.code, url: "http://127.0.0.1:3010" },
    ]);

    await page.goto("/contact", { waitUntil: "domcontentloaded" });
    await page.getByRole("button", { name: locale.contactSubmit }).click();
    await expect(page.locator("main")).toContainText(
      locale.code === "en" ? "Name is required" :
        locale.code === "tr" ? "Ad gereklidir" :
          locale.code === "fr" ? "Le nom est obligatoire" :
            locale.code === "ru" ? "Укажите имя" : "الاسم مطلوب",
    );

    await page.goto("/services/vip-cars", { waitUntil: "domcontentloaded" });
    await page.getByRole("button", { name: locale.bookingSubmit }).click();
    await expect(page.locator("#booking-form")).toContainText(
      locale.code === "en" ? "is required" :
        locale.code === "tr" ? "gereklidir" :
          locale.code === "fr" ? "est obligatoire" :
            locale.code === "ru" ? "обязательно" : "مطلوب",
    );
  });
}

test("language switcher keeps the current page", async ({ page }) => {
  await page.goto("/offers");
  const languageButton = page.locator('[aria-label="تبديل اللغة"]').first();
  await languageButton.evaluate((element) => (element as HTMLButtonElement).click());
  await page.getByRole("option", { name: /English/ }).evaluate((element) => (element as HTMLButtonElement).click());

  await expect(page).toHaveURL(/\/offers$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator("main h1").first()).toContainText("Special Offers");
});

test("sitemap excludes content without full locale translations", async ({ request }) => {
  const response = await request.get("/sitemap.xml");
  expect(response.ok()).toBeTruthy();
  const sitemap = await response.text();

  for (const route of ["/blog", "/privacy", "/terms"]) {
    expect(sitemap).not.toContain(`https://casanostra.com${route}`);
  }
  expect(sitemap).toContain("https://casanostra.com/services");
});

for (const locale of locales.filter(({ code }) => code !== "ar")) {
  test(`${locale.code}: WhatsApp quick chat uses localized copy`, async ({ page }) => {
    await page.context().addCookies([
      { name: "casanostra-locale", value: locale.code, url: "http://127.0.0.1:3010" },
    ]);
    await page.goto("/");
    await page.getByRole("button", {
      name: {
        en: "Contact via WhatsApp",
        tr: "WhatsApp ile İletişim",
        fr: "Contacter via WhatsApp",
        ru: "Связаться через WhatsApp",
      }[locale.code],
    }).click();
    const chat = page.locator(".fixed.bottom-24");
    await expect(chat).toBeVisible();
    const chatText = await chat.innerText();
    expect(chatText).not.toMatch(/[\u0600-\u06FF]/);
  });

  test(`${locale.code}: services dropdown uses localized copy`, async ({ page }) => {
    await page.context().addCookies([
      { name: "casanostra-locale", value: locale.code, url: "http://127.0.0.1:3010" },
    ]);
    await page.goto("/");
    const trigger = page.locator("header nav button[aria-controls]").first();
    await trigger.hover();
    const menu = page.locator("header").getByRole("link", { name: /.+/ }).filter({ has: page.locator("svg") });
    await expect(menu.first()).toBeVisible();
    const headerText = await page.getByRole("banner").innerText();
    expect(headerText).not.toMatch(/[\u0600-\u06FF]/);
  });
}

test("services dropdown stays open while moving into its menu", async ({ page }) => {
  await page.goto("/");
  const trigger = page.locator("header nav button[aria-controls]").first();
  await trigger.hover();

  const firstService = page.locator('header a[href^="/services/"]').first();
  await expect(firstService).toBeVisible();
  await firstService.hover();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
});