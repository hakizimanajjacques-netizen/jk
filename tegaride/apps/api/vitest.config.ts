import { defineConfig } from "vitest/config";

// Tests use their own fake env values so they never depend on your real .env.
export default defineConfig({
  test: {
    environment: "node",
    env: {
      NODE_ENV: "test",
      DATABASE_URL: "postgresql://test:test@localhost:5432/test",
      JWT_ACCESS_SECRET: "test-access-secret-0123456789abcdef0123",
      JWT_REFRESH_SECRET: "test-refresh-secret-0123456789abcdef012",
      CORS_ORIGINS: "http://localhost:5173",
    },
  },
});
