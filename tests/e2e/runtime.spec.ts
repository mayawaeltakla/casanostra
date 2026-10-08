import { expect, test } from "@playwright/test";

const routes = [
  "/ar",
  "/ar/about",
  "/ar/services",
  "/ar/offers",
  "/ar/plans",
  "/ar/quick-booking",
  "/ar/contact",
  "/ar/faq",
  "/ar/help",
  "/ar/blog",
  "/ar/privacy",
  "/ar/terms",
  "/api",
  "/ar/services/reservations-turkey",
  "/ar/services/visa",
  "/ar/services/vip-cars",
  "/ar/services/hotels",
  "/ar/services/flights",
  "/ar/services/daily-tours",
  "/ar/services/private-tours",
  "/ar/services/group-tours",
  "/ar/services/hajj-umrah",
  "/ar/services/medical-tourism",
  "/ar/services/other-services",
  "/ar/blog/best-10-places-istanbul",
  "/ar/blog/turkey-visa-complete-guide",
  "/ar/blog/cappadocia-balloon-city",
  "/ar/blog/golden-tips-before-turkey-trip",
];

test("production routes load without browser or internal network errors", async ({
  page,
  baseURL,
}) => {
  if (!baseURL) {
    throw new Error("Playwright baseURL must be configured for the runtime smoke test.");
  }

  const origin = new URL(baseURL).origin;
  const errors: string[] = [];

  page.on("pageerror", (error) => errors.push(`pageerror: ${error.message}`));
  page.on("console", (message) => {
    if (message.type() === "error") {
      errors.push(`console.error: ${message.text()}`);
    }
  });
  page.on("requestfailed", (request) => {
    const failure = request.failure()?.errorText;
    if (
      new URL(request.url()).origin === origin &&
      failure !== "net::ERR_ABORTED"
    ) {
      errors.push(`requestfailed: ${request.method()} ${request.url()} (${failure})`);
    }
  });
  page.on("response", (response) => {
    if (
      new URL(response.url()).origin === origin &&
      response.status() >= 400
    ) {
      errors.push(`HTTP ${response.status()}: ${response.url()}`);
    }
  });

  for (const route of routes) {
    const response = await page.goto(route, { waitUntil: "domcontentloaded" });
    if (!response) {
      errors.push(`${route}: navigation returned no document response`);
      continue;
    }
    expect(response.status(), `${route} should not return an HTTP error`).toBeLessThan(400);
  }

  for (const viewport of [
    { width: 1280, height: 800 },
    { width: 375, height: 812 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/ar", { waitUntil: "domcontentloaded" });

    const logos = page.locator('img[alt="CASANOSTRA"]');
    await expect(logos).toHaveCount(2);
    for (const link of await page.locator('link[rel="icon"], link[rel="apple-touch-icon"]').all()) {
      await expect(link).toHaveAttribute("href", /\/images\/brand\/logo\.jpg/);
    }
    const dimensions = await logos.evaluateAll((images) =>
      images.map((image) => ({
        naturalWidth: (image as HTMLImageElement).naturalWidth,
        naturalHeight: (image as HTMLImageElement).naturalHeight,
        width: image.getBoundingClientRect().width,
        height: image.getBoundingClientRect().height,
      })),
    );
    for (const image of dimensions) {
      expect(image.naturalWidth).toBeGreaterThan(0);
      expect(image.naturalHeight).toBeGreaterThan(0);
      expect(Math.abs(image.width / image.height - 1)).toBeLessThan(0.05);
    }
  }

  expect(errors, "unexpected browser runtime or internal network errors").toEqual([]);
});
