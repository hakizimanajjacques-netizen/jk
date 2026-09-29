import { Router } from "express";
import type { HealthData } from "@tegaride/shared";
import { sendSuccess } from "../../utils/response";

export const healthRoutes = Router();

// Public liveness check. A database check is added in Step 3.
healthRoutes.get("/", (_req, res) => {
  const data: HealthData = {
    status: "ok",
    service: "tegaride-api",
    time: new Date().toISOString(),
  };
  sendSuccess(res, data);
});
