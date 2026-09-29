import type { RequestHandler } from "express";
import { AppError } from "../utils/AppError";

export const notFound: RequestHandler = (_req, _res, next) => {
  next(new AppError(404, "NOT_FOUND", "The requested resource was not found"));
};
