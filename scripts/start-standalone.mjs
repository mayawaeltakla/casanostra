import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

const portFlagIndex = process.argv.indexOf("-p");
const port = portFlagIndex >= 0
  ? process.argv[portFlagIndex + 1]
  : process.env.PORT || "3000";
const serverPath = resolve(".next/standalone/server.js");

if (!existsSync(serverPath)) {
  console.error(`Standalone server not found: ${serverPath}. Run npm run build first.`);
  process.exit(1);
}

const server = spawn(process.execPath, [serverPath], {
  env: {
    ...process.env,
    HOSTNAME: "127.0.0.1",
    NODE_ENV: "production",
    PORT: port,
  },
  stdio: "inherit",
});

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => server.kill(signal));
}

server.on("error", (error) => {
  console.error("Failed to start standalone server:", error);
  process.exitCode = 1;
});

server.on("exit", (code, signal) => {
  process.exitCode = code ?? (signal ? 1 : 0);
});
