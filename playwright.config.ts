import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  reporter: "list",
  workers: 2,
  timeout: 90_000,
  use: {
    baseURL: "http://127.0.0.1:3010",
    navigationTimeout: 60_000,
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "npm run build && npm run start -- -p 3010",
    url: "http://127.0.0.1:3010",
    reuseExistingServer: true,
    timeout: 300_000,
  },
});