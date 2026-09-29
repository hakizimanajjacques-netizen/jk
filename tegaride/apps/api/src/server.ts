import http from "node:http";
import { createApp } from "./app";
import { env } from "./config/env";
import { logger } from "./config/logger";

const app = createApp();

// We create the HTTP server explicitly (instead of app.listen)
// because Socket.IO will attach to this same server in Step 9.
const server = http.createServer(app);

server.listen(env.API_PORT, () => {
  logger.info(`TegaRide API listening on http://localhost:${env.API_PORT} (${env.NODE_ENV})`);
});

function shutdown(signal: string) {
  logger.info(`${signal} received, shutting down`);
  server.close(() => process.exit(0));
  // Force exit if connections refuse to close
  setTimeout(() => process.exit(1), 10_000).unref();
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
