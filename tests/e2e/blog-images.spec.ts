import { expect, test } from "@playwright/test";

const locales = ["ar", "en", "tr", "fr", "ru"] as const;
const blogRoutes = [
  "/blog",
  "/blog/best-10-places-istanbul",
  "/blog/turkey-visa-complete-guide",
  "/blog/cappadocia-balloon-city",
  "/blog/golden-tips-before-turkey-trip",
];

test("blog covers load without broken image requests in every locale", async ({
  page,
  baseURL,
}) => {
  if (!baseURL) {
    throw new Error("Playwright baseURL must be configured for the blog image test.");
  }

  const origin = new URL(baseURL).origin;
  const imageFailures: string[] = [];
  const browserErrors: string[] = [];

  page.on("pageerror", (error) => browserErrors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") {
      browserErrors.push(message.text());
    }
  });
  page.on("requestfailed", (request) => {
    if (isBlogImageRequest(request.url(), origin)) {
      imageFailures.push(`${request.url()}: ${request.failure()?.errorText}`);
    }
  });
  page.on("response", (response) => {
    if (isBlogImageRequest(response.url(), origin) && response.status() >= 400) {
      imageFailures.push(`${response.status()}: ${response.url()}`);
    }
  });

  for (const locale of locales) {
    for (const route of blogRoutes) {
      const response = await page.goto(`/${locale}${route}`, { waitUntil: "domcontentloaded" });
      expect(response?.status(), `${route} should load in ${locale}`).toBeLessThan(400);

      const images = page.locator("main img");
      if (route === "/blog" && locale !== "ar") {
        await expect(images).toHaveCount(0);
        continue;
      }
      await expect(images.first(), `${route} should show a blog cover in ${locale}`).toBeVisible();
      const imageResults = await images.evaluateAll(async (elements) => {
        const loaded = elements as HTMLImageElement[];
        for (const image of loaded) {
          image.loading = "eager";
        }
        return Promise.all(
          loaded.map(
            (image) =>
              new Promise<{ src: string; naturalWidth: number; complete: boolean }>((resolve) => {
                const finish = () =>
                  resolve({
                    src: image.currentSrc || image.src,
                    naturalWidth: image.naturalWidth,
                    complete: image.complete,
                  });
                if (image.complete) {
                  finish();
                  return;
                }
                image.addEventListener("load", finish, { once: true });
                image.addEventListener("error", finish, { once: true });
                window.setTimeout(finish, 15_000);
              }),
          ),
        );
      });

      expect(
        imageResults.filter(({ naturalWidth }) => naturalWidth === 0),
        `${route} should not contain broken images in ${locale}: ${JSON.stringify(imageResults)}`,
      ).toEqual([]);
    }
  }

  expect(imageFailures, "blog image requests should not fail").toEqual([]);
  expect(browserErrors, "blog pages should not produce browser errors").toEqual([]);
});

function isBlogImageRequest(url: string, origin: string): boolean {
  const requestUrl = new URL(url);
  return (
    (requestUrl.origin === origin &&
      (requestUrl.pathname.startsWith("/images/") ||
        requestUrl.pathname === "/_next/image")) ||
    requestUrl.hostname === "images.unsplash.com"
  );
}
