import { Router } from "express";
import { healthRoutes } from "../modules/health/health.routes";

/** All /api/v1 routes are registered here. Each feature module adds one line. */
export const v1Router = Router();

v1Router.use("/health", healthRoutes);
