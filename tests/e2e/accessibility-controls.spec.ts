import { expect, test } from "@playwright/test";

const locales = [
  { code: "ar", direction: "rtl" },
  { code: "en", direction: "ltr" },
] as const;

test("desktop services disclosure supports pointer and keyboard in both themes and directions", async ({
  page,
  baseURL,
}) => {
  if (!baseURL) throw new Error("Playwright baseURL must be configured.");
  await page.setViewportSize({ width: 1280, height: 800 });

  for (const locale of locales) {
    await page.context().clearCookies();
    await page.context().addCookies([
      { name: "casanostra-locale", value: locale.code, url: baseURL },
    ]);

    for (const dark of [false, true]) {
      await page.goto("/services", { waitUntil: "domcontentloaded" });
      await page.evaluate((isDark) => {
        localStorage.setItem("theme", isDark ? "dark" : "light");
        document.documentElement.classList.toggle("dark", isDark);
      }, dark);

      const trigger = page.locator("header nav button[aria-controls]").first();
      const panel = page.locator(`#${await trigger.getAttribute("aria-controls")}`);
      await trigger.focus();
      await page.keyboard.press("Enter");
      await expect(trigger).toHaveAttribute("aria-expanded", "true");
      await expect(panel).toBeVisible();
      await expect(panel.getByRole("link").first()).toBeVisible();

      await page.keyboard.press("Tab");
      await expect(panel.getByRole("link").first()).toBeFocused();
      await page.keyboard.press("Escape");
      await expect(trigger).toHaveAttribute("aria-expanded", "false");
      await expect(trigger).toBeFocused();

      await page.evaluate(() => document.activeElement instanceof HTMLElement && document.activeElement.blur());
      await trigger.hover();
      await expect(panel).toBeVisible();
      await page.mouse.move(10, 300);
      await expect(panel).toBeHidden();
      expect(await page.locator("html").getAttribute("dir")).toBe(locale.direction);
    }
  }
});

test("footer language listbox supports active-descendant keyboard interaction", async ({
  page,
  baseURL,
}) => {
  if (!baseURL) throw new Error("Playwright baseURL must be configured.");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.context().addCookies([
    { name: "casanostra-locale", value: "en", url: baseURL },
  ]);
  await page.goto("/", { waitUntil: "domcontentloaded" });

  const trigger = page.locator("footer button[aria-haspopup='listbox']");
  await trigger.scrollIntoViewIfNeeded();
  await trigger.click();
  const listbox = page.getByRole("listbox");
  await expect(listbox).toBeFocused();
  await page.keyboard.press("End");
  await expect(listbox).toHaveAttribute("aria-activedescendant", /-ru$/);
  await page.keyboard.press("Home");
  await expect(listbox).toHaveAttribute("aria-activedescendant", /-ar$/);
  await page.keyboard.press("Escape");
  await expect(listbox).toBeHidden();
  await expect(trigger).toBeFocused();

  await trigger.click();
  await page.keyboard.press("Home");
  await page.keyboard.press("Enter");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
});

test("all visible form labels are associated and invalid fields reference errors", async ({
  page,
}) => {
  const paths = ["/", "/contact", "/help", "/services/visa"];
  for (const path of paths) {
    await page.goto(path, { waitUntil: "domcontentloaded" });
    const unassociatedLabels = await page.locator("label").evaluateAll((labels) =>
      labels
        .filter((label) => !(label as HTMLLabelElement).control)
        .map((label) => label.textContent?.trim()),
    );
    expect(unassociatedLabels, `unassociated labels on ${path}`).toEqual([]);

    const duplicateIds = await page.locator("[id]").evaluateAll((elements) => {
      const ids = elements.map((element) => element.id);
      return ids.filter((id, index) => ids.indexOf(id) !== index);
    });
    expect(duplicateIds, `duplicate IDs on ${path}`).toEqual([]);
  }

  await page.goto("/contact", { waitUntil: "domcontentloaded" });
  await page.locator("form button[type='submit']").click();
  for (const field of await page.locator("form [aria-invalid='true']").all()) {
    const describedBy = await field.getAttribute("aria-describedby");
    expect(describedBy).toBeTruthy();
    await expect(page.locator(`[id="${describedBy}"]`)).toBeVisible();
  }
});

test("gold text in navigation and content meets normal-text contrast in both themes", async ({ page }) => {
  for (const dark of [false, true]) {
    for (const path of ["/services", "/contact", "/offers"]) {
      await page.goto(path, { waitUntil: "domcontentloaded" });
      await page.evaluate((isDark) => {
        localStorage.setItem("theme", isDark ? "dark" : "light");
        document.documentElement.classList.toggle("dark", isDark);
      }, dark);
      await page.reload({ waitUntil: "domcontentloaded" });
      await page.evaluate(() => window.scrollTo(0, 48));
      await expect(page.locator("html")).toHaveClass(dark ? /dark/ : /^(?!.*dark)/);
      await expect(page.locator("header")).toHaveClass(/bg-background\/95/);
      const ratios = await page.locator(
        ".text-gold-readable, .text-gold-800, .text-gold-700",
      ).evaluateAll((elements) => {
        const canvas = document.createElement("canvas");
        canvas.width = 1;
        canvas.height = 1;
        const context = canvas.getContext("2d");
        if (!context) throw new Error("Canvas 2D context is required for contrast testing.");
        const parse = (color: string) => {
          context.clearRect(0, 0, 1, 1);
          context.fillStyle = color;
          context.fillRect(0, 0, 1, 1);
          const [red, green, blue, alpha] = context.getImageData(0, 0, 1, 1).data;
          return [red, green, blue, alpha / 255];
        };
        const composite = (foreground: number[], background: number[]) => {
          const alpha = foreground[3];
          return [
            foreground[0] * alpha + background[0] * (1 - alpha),
            foreground[1] * alpha + background[1] * (1 - alpha),
            foreground[2] * alpha + background[2] * (1 - alpha),
            1,
          ];
        };
        const luminance = (rgb: number[]) =>
          rgb.slice(0, 3)
            .map((channel) => {
              const normalized = channel / 255;
              return normalized <= 0.04045
                ? normalized / 12.92
                : ((normalized + 0.055) / 1.055) ** 2.4;
            })
            .reduce((sum, channel, index) => sum + channel * [0.2126, 0.7152, 0.0722][index], 0);

        return elements.filter((element) => element.getClientRects().length > 0).map((element) => {
          const foreground = parse(getComputedStyle(element).color);
          const ancestors: Element[] = [];
          let current: Element | null = element;
          while (current) {
            ancestors.push(current);
            current = current.parentElement;
          }
          let background = parse(getComputedStyle(document.body).backgroundColor);
          for (const ancestor of ancestors.reverse()) {
            const color = parse(getComputedStyle(ancestor).backgroundColor);
            if (color[3] > 0) background = composite(color, background);
          }
          const textLum = luminance(foreground);
          const backgroundLum = luminance(background);
          return {
            text: element.textContent?.trim(),
            foreground: getComputedStyle(element).color,
            background: getComputedStyle(element.parentElement ?? element).backgroundColor,
            ratio: (Math.max(textLum, backgroundLum) + 0.05) /
              (Math.min(textLum, backgroundLum) + 0.05),
          };
        });
      });
      expect(ratios.length, `${path} should expose branded text in ${dark ? "dark" : "light"} mode`)
        .toBeGreaterThan(0);
      for (const sample of ratios) {
        expect(
          sample.ratio,
          `${path} ${dark ? "dark" : "light"} ${sample.text}: ${sample.foreground} on ${sample.background}`,
        ).toBeGreaterThanOrEqual(4.5);
      }
    }
  }
});
