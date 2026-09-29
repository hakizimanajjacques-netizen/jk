import { randomUUID } from "node:crypto";
import cors from "cors";
import express from "express";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import { pinoHttp } from "pino-http";
import { env } from "./config/env";
import { logger } from "./config/logger";
import { errorHandler } from "./middleware/errorHandler";
import { notFound } from "./middleware/notFound";
import { v1Router } from "./routes/v1";
import { sendError } from "./utils/response";

/**
 * Builds the Express app WITHOUT starting a server.
 * Keeping this separate from server.ts lets tests call the app directly.
 */
export function createApp() {
  const app = express();

  app.disable("x-powered-by");

  // Request logging with a server-generated request id (never trust a client-supplied one).
  app.use(
    pinoHttp({
      logger,
      genReqId: (_req, res) => {
        const id = randomUUID();
        res.setHeader("X-Request-Id", id);
        return id;
      },
    }),
  );

  // Secure HTTP headers
  app.use(helmet());

  // CORS allow-list. Credentials are enabled for the refresh-token cookie (Step 4).
  app.use(
    cors({
      origin: (origin, callback) => {
        // Requests with no Origin header (curl, server-to-server, same-origin) are allowed through.
        if (!origin || env.CORS_ORIGINS.includes(origin)) {
          callback(null, true);
        } else {
          callback(null, false);
        }
      },
      credentials: true,
    }),
  );

  // Global rate limit. Stricter limits for login etc. are added in Step 4.
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      limit: 300,
      standardHeaders: "draft-7",
      legacyHeaders: false,
      handler: (_req, res) => {
        sendError(res, 429, "RATE_LIMITED", "Too many requests. Please try again later.");
      },
    }),
  );

  // Small body limit; file uploads get their own handling in Step 6.
  app.use(express.json({ limit: "100kb" }));

  app.use("/api/v1", v1Router);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
