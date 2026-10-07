import { expect, test } from "@playwright/test";

test("every reachable same-origin link resolves without an HTTP error", async ({
  page,
  baseURL,
}) => {
  if (!baseURL) {
    throw new Error("Playwright baseURL must be configured for the link integrity test.");
  }

  const origin = new URL(baseURL).origin;
  const pending = ["/"];
  const visited = new Set<string>();
  const failures: string[] = [];

  while (pending.length > 0) {
    const route = pending.shift();
    if (!route || visited.has(route)) {
      continue;
    }

    visited.add(route);
    const response = await page.goto(route, { waitUntil: "domcontentloaded" });
    if (!response) {
      failures.push(`${route}: navigation returned no response`);
      continue;
    }
    if (response.status() >= 400) {
      failures.push(`${route}: HTTP ${response.status()}`);
      continue;
    }

    const hrefs = await page.locator("a[href]").evaluateAll((anchors) =>
      anchors
        .map((anchor) => anchor.getAttribute("href"))
        .filter((href): href is string => Boolean(href)),
    );

    for (const href of hrefs) {
      const url = new URL(href, response.url());
      if (url.origin !== origin || !["http:", "https:"].includes(url.protocol)) {
        continue;
      }

      url.hash = "";
      const linkedRoute = `${url.pathname}${url.search}`;
      if (linkedRoute !== route && !visited.has(linkedRoute)) {
        pending.push(linkedRoute);
      }
    }
  }

  console.info(`Checked ${visited.size} same-origin routes.`);
  expect(
    failures,
    `same-origin routes failed (${visited.size} visited)`,
  ).toEqual([]);
});
