import { config as loadDotenv } from "dotenv";
import { fileURLToPath } from "node:url";
import { z } from "zod";

// Load the .env file from the repository root (does nothing if it doesn't exist,
// e.g. in production where real environment variables are provided by the host).
loadDotenv({ path: fileURLToPath(new URL("../../../../.env", import.meta.url)) });

const envSchema = z
  .object({
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    API_PORT: z.coerce.number().int().positive().default(4000),
    LOG_LEVEL: z
      .enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"])
      .default("info"),
    DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
    JWT_ACCESS_SECRET: z.string().min(32, "must be at least 32 characters"),
    JWT_REFRESH_SECRET: z.string().min(32, "must be at least 32 characters"),
    CORS_ORIGINS: z
      .string()
      .default("http://localhost:5173")
      .transform((value) =>
        value
          .split(",")
          .map((origin) => origin.trim())
          .filter(Boolean),
      ),
  })
  .superRefine((env, ctx) => {
    if (env.NODE_ENV === "production") {
      for (const key of ["JWT_ACCESS_SECRET", "JWT_REFRESH_SECRET"] as const) {
        if (env[key].includes("dev-only")) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: [key],
            message: "must not use the development placeholder value in production",
          });
        }
      }
    }
  });

function loadEnv() {
  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    // Fail fast with a clear message instead of crashing later in a confusing way.
    console.error("\n[TegaRide] Invalid environment configuration:");
    for (const issue of parsed.error.issues) {
      console.error(`  - ${issue.path.join(".")}: ${issue.message}`);
    }
    console.error("\nCheck your .env file (see .env.example).\n");
    process.exit(1);
  }
  return parsed.data;
}

export const env = loadEnv();
export type Env = typeof env;
