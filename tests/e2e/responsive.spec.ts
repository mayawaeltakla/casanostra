import { expect, test } from "@playwright/test";

const viewports = [
  { width: 375, height: 812 },
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1280, height: 800 },
];

const routes = [
  "/",
  "/contact",
  "/help",
  "/quick-booking",
  "/plans",
  "/services/visa",
];

test("key pages and forms stay within the viewport at required screen sizes", async ({
  page,
}) => {
  for (const viewport of viewports) {
    await page.setViewportSize(viewport);

    for (const route of routes) {
      await page.goto(route, { waitUntil: "domcontentloaded" });
      const dimensions = await page.evaluate(() => ({
        viewportWidth: document.documentElement.clientWidth,
        documentWidth: document.documentElement.scrollWidth,
      }));
      expect(
        dimensions.documentWidth,
        `${route} at ${viewport.width}x${viewport.height} should not overflow horizontally`,
      ).toBeLessThanOrEqual(dimensions.viewportWidth);

      const outOfBounds = await page.locator("main h1, main input, main textarea, main button").evaluateAll(
        (elements) =>
          elements
            .map((element) => {
              const bounds = element.getBoundingClientRect();
              return { left: bounds.left, right: bounds.right };
            })
            .filter(({ left, right }) => left < 0 || right > document.documentElement.clientWidth),
      );
      expect(
        outOfBounds,
        `${route} controls should remain in-bounds at ${viewport.width}x${viewport.height}`,
      ).toEqual([]);

      if (route === "/" && viewport.width < 768) {
        const mobileMenuButton = page.locator("header button:has(svg.lucide-menu)");
        await expect(mobileMenuButton).toBeVisible();
        await mobileMenuButton.click();
        await expect(page.locator("header div.fixed.inset-0")).toBeVisible();
      }
      if (["/contact", "/help", "/services/visa"].includes(route)) {
        const form = page.locator("form").first();
        await expect(form, `${route} form should be available`).toBeVisible();
        await expect(form.locator("input").first(), `${route} form input should be usable`).toBeVisible();
      }
    }
  }
});
