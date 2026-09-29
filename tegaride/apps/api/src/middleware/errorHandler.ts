import type { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { AppError } from "../utils/AppError";
import { sendError } from "../utils/response";

/**
 * The ONE place where errors become HTTP responses.
 * Unknown errors are logged in full but only a generic message is sent to the client,
 * so stack traces and database details never leak.
 */
export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (res.headersSent) {
    next(err);
    return;
  }

  if (err instanceof ZodError) {
    sendError(res, 400, "VALIDATION_ERROR", "Invalid request data", err.flatten().fieldErrors);
    return;
  }

  if (err instanceof AppError) {
    if (err.statusCode >= 500) req.log.error({ err }, err.message);
    sendError(res, err.statusCode, err.code, err.message, err.details);
    return;
  }

  // Errors thrown by express.json() for bad request bodies
  const bodyErrorType = (err as { type?: string } | null)?.type;
  if (bodyErrorType === "entity.parse.failed") {
    sendError(res, 400, "INVALID_JSON", "Request body is not valid JSON");
    return;
  }
  if (bodyErrorType === "entity.too.large") {
    sendError(res, 413, "PAYLOAD_TOO_LARGE", "Request body is too large");
    return;
  }

  req.log.error({ err }, "Unhandled error");
  sendError(res, 500, "INTERNAL_ERROR", "Something went wrong. Please try again.");
};
