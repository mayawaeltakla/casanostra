import { expect, test } from "@playwright/test";

const viewports = [
  { width: 375, height: 812 },
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1280, height: 800 },
];

const locales = [
  { code: "ar", switchLanguage: "تبديل اللغة", direction: "rtl" },
  { code: "en", switchLanguage: "Switch Language", direction: "ltr" },
  { code: "tr", switchLanguage: "Dili Değiştir", direction: "ltr" },
  { code: "fr", switchLanguage: "Changer de Langue", direction: "ltr" },
  { code: "ru", switchLanguage: "Сменить язык", direction: "ltr" },
] as const;

test("mobile navigation is opaque and theme controls stay synchronized", async ({
  page,
  baseURL,
}) => {
  if (!baseURL) {
    throw new Error("Playwright baseURL must be configured for navigation theme tests.");
  }

  const browserErrors: string[] = [];
  page.on("pageerror", (error) => browserErrors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") browserErrors.push(message.text());
  });
  page.on("requestfailed", (request) => {
    if (
      new URL(request.url()).origin === new URL(baseURL).origin &&
      request.failure()?.errorText !== "net::ERR_ABORTED"
    ) {
      browserErrors.push(`requestfailed: ${request.url()}`);
    }
  });

  await page.context().addCookies([
    { name: "casanostra-locale", value: "ar", url: baseURL },
  ]);

  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const headerToggle = page.locator('header button[aria-label="تبديل الوضع الليلي والنهاري"]');
    const footerToggle = page.locator('footer button[aria-label="تبديل الوضع الليلي والنهاري"]');

    for (const dark of [false, true]) {
      await page.evaluate((isDark) => localStorage.setItem("theme", isDark ? "dark" : "light"), dark);
      await page.reload({ waitUntil: "domcontentloaded" });
      expect(await page.locator("html").evaluate((element) => element.classList.contains("dark"))).toBe(dark);

      if (viewport.width < 1024) {
        await page.getByRole("button", { name: "فتح القائمة" }).click();
        const menu = page.locator("header > div.fixed.inset-0");
        await expect(menu).toBeVisible();
        const colors = await menu.evaluate((element) => ({
          menu: getComputedStyle(element).backgroundColor,
          body: getComputedStyle(document.body).backgroundColor,
        }));
        expect(colors.menu).toBe(colors.body);
        await expect(menu.getByRole("button").first()).toBeVisible();
        await expect(menu.getByRole("link").first()).toBeVisible();
        await menu.locator("nav").getByRole("button").first().click();
        await expect(menu.getByRole("link").nth(1)).toBeVisible();
        await page.getByRole("button", { name: "إغلاق القائمة" }).click();
      }

      await expect(headerToggle).toHaveText(dark ? "☀️" : "🌙");
      await expect(footerToggle).toHaveText(dark ? "☀️" : "🌙");

      if (!dark) {
        await headerToggle.click();
        await expect(page.locator("html")).toHaveClass(/dark/);
        await expect(footerToggle).toHaveText("☀️");
        await page.reload({ waitUntil: "domcontentloaded" });
        await expect(page.locator("html")).toHaveClass(/dark/);
        await expect(page.locator("footer button[aria-label='تبديل الوضع الليلي والنهاري']")).toHaveText("☀️");
        await page.goto("/contact", { waitUntil: "domcontentloaded" });
        await expect(page.locator("html")).toHaveClass(/dark/);
        await page.goto("/", { waitUntil: "domcontentloaded" });
      } else {
        await footerToggle.scrollIntoViewIfNeeded();
        await footerToggle.click();
        await expect(page.locator("html")).not.toHaveClass(/dark/);
        await expect(headerToggle).toHaveText("🌙");
        await page.reload({ waitUntil: "domcontentloaded" });
        await expect(page.locator("html")).not.toHaveClass(/dark/);
      }

      await expectFooterTextContrast(page);
    }

    await page.goto("/contact", { waitUntil: "domcontentloaded" });
    expect(await page.locator("html").evaluate((element) => element.classList.contains("dark"))).toBe(false);
  }

  expect(browserErrors).toEqual([]);
});

test("footer language menu stays within the viewport in every locale and theme", async ({
  page,
  baseURL,
}) => {
  test.setTimeout(240_000);
  if (!baseURL) {
    throw new Error("Playwright baseURL must be configured for language menu tests.");
  }

  for (const viewport of viewports.slice(0, 3)) {
    await page.setViewportSize(viewport);
    for (const locale of locales) {
      for (const dark of [false, true]) {
        await page.context().clearCookies();
        await page.context().addCookies([
          { name: "casanostra-locale", value: locale.code, url: baseURL },
        ]);
        await page.goto("/", { waitUntil: "domcontentloaded" });
        await page.evaluate((isDark) => {
          localStorage.setItem("theme", isDark ? "dark" : "light");
          document.documentElement.classList.toggle("dark", isDark);
        }, dark);

        const trigger = page.locator("footer button[aria-haspopup='listbox']");
        await trigger.scrollIntoViewIfNeeded();
        await trigger.click();

        const menu = page.getByRole("listbox");
        await expect(menu).toBeVisible();
        await expect(menu.getByRole("option")).toHaveCount(5);
        for (const option of await menu.getByRole("option").all()) {
          await expect(option).toBeVisible();
        }

        const bounds = await menu.evaluate((element) => {
          const rect = element.getBoundingClientRect();
          return {
            left: rect.left,
            top: rect.top,
            right: rect.right,
            bottom: rect.bottom,
            width: document.documentElement.clientWidth,
            height: window.innerHeight,
            direction: getComputedStyle(element).direction,
          };
        });
        expect(bounds.left).toBeGreaterThanOrEqual(0);
        expect(bounds.top).toBeGreaterThanOrEqual(0);
        expect(bounds.right).toBeLessThanOrEqual(bounds.width);
        expect(bounds.bottom).toBeLessThanOrEqual(bounds.height);
        expect(bounds.direction).toBe(locale.direction);
        await page.keyboard.press("Escape");
        await expect(menu).toBeHidden();
      }
    }
  }
});

async function expectFooterTextContrast(
  page: import("@playwright/test").Page,
): Promise<void> {
  const footer = page.locator("footer");
  const samples = await page.locator(
    "footer p, footer h3, footer ul a, footer a[href^='tel:'] div, footer a[href^='mailto:'] div, footer a[aria-label='إنستغرام'] svg, footer a[aria-label='فيسبوك'] svg, footer a[aria-label='تويتر'] svg, footer a[aria-label='يوتيوب'] svg",
  ).evaluateAll((elements) => {
    const canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = 1;
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Canvas 2D context is required for contrast testing.");
    const footerBackground = getComputedStyle(document.querySelector("footer")!).backgroundColor;

    return elements.map((element) => {
      let backgroundElement: Element | null = element;
      let background = "rgba(0, 0, 0, 0)";
      const isTransparent = (color: string) => {
        const channels = color.match(/[\d.]+/g)?.map(Number);
        return channels?.length === 4 && channels[3] === 0;
      };
      while (backgroundElement && isTransparent(background)) {
        background = getComputedStyle(backgroundElement).backgroundColor;
        if (isTransparent(background)) backgroundElement = backgroundElement.parentElement;
      }
      context.fillStyle = footerBackground;
      context.fillRect(0, 0, 1, 1);
      context.fillStyle = background;
      context.fillRect(0, 0, 1, 1);
      const backgroundPixel = [...context.getImageData(0, 0, 1, 1).data.slice(0, 3)];
      context.fillStyle = getComputedStyle(element).color;
      context.fillRect(0, 0, 1, 1);
      const foregroundPixel = [...context.getImageData(0, 0, 1, 1).data.slice(0, 3)];
      return {
        text: element.textContent?.trim() || element.getAttribute("aria-label") || "",
        foreground: foregroundPixel,
        background: backgroundPixel,
      };
    });
  });

  for (const sample of samples.filter(({ text }) => text.length > 0)) {
    expect(
      contrastRatio(sample.foreground, sample.background),
      `footer contrast for "${sample.text}"`,
    ).toBeGreaterThanOrEqual(4.5);
  }
}

function contrastRatio(foreground: number[], background: number[]): number {
  const luminance = (rgb: number[]) =>
    rgb
      .map((channel) => {
        const normalized = channel / 255;
        return normalized <= 0.04045
          ? normalized / 12.92
          : ((normalized + 0.055) / 1.055) ** 2.4;
      })
      .reduce((sum, channel, index) => sum + channel * [0.2126, 0.7152, 0.0722][index], 0);
  const values = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
  return (values[0] + 0.05) / (values[1] + 0.05);
}
