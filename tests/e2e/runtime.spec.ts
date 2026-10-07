import { expect, test } from "@playwright/test";

const routes = [
  "/",
  "/about",
  "/services",
  "/offers",
  "/plans",
  "/quick-booking",
  "/contact",
  "/faq",
  "/help",
  "/blog",
  "/privacy",
  "/terms",
  "/api",
  "/services/reservations-turkey",
  "/services/visa",
  "/services/vip-cars",
  "/services/hotels",
  "/services/flights",
  "/services/daily-tours",
  "/services/private-tours",
  "/services/group-tours",
  "/services/hajj-umrah",
  "/services/medical-tourism",
  "/services/other-services",
  "/blog/best-10-places-istanbul",
  "/blog/turkey-visa-complete-guide",
  "/blog/cappadocia-balloon-city",
  "/blog/golden-tips-before-turkey-trip",
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
    await page.goto("/", { waitUntil: "domcontentloaded" });

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
