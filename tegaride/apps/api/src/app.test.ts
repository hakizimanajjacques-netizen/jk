import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "./app";

const app = createApp();

describe("API foundation", () => {
  it("GET /api/v1/health returns success", async () => {
    const res = await request(app).get("/api/v1/health");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.status).toBe("ok");
  });

  it("sets secure headers and hides x-powered-by", async () => {
    const res = await request(app).get("/api/v1/health");
    expect(res.headers["x-powered-by"]).toBeUndefined();
    expect(res.headers["x-content-type-options"]).toBe("nosniff");
    expect(res.headers["x-request-id"]).toBeTruthy();
  });

  it("returns the standard error shape for unknown routes", async () => {
    const res = await request(app).get("/api/v1/does-not-exist");
    expect(res.status).toBe(404);
    expect(res.body).toMatchObject({ success: false, code: "NOT_FOUND" });
  });

  it("returns a clean 400 for malformed JSON without leaking details", async () => {
    const res = await request(app)
      .post("/api/v1/health")
      .set("Content-Type", "application/json")
      .send("{ this is not json");
    expect(res.status).toBe(400);
    expect(res.body).toMatchObject({ success: false, code: "INVALID_JSON" });
    expect(JSON.stringify(res.body)).not.toContain("SyntaxError");
  });

  it("does not allow a foreign origin through CORS", async () => {
    const res = await request(app)
      .get("/api/v1/health")
      .set("Origin", "https://evil.example.com");
    expect(res.headers["access-control-allow-origin"]).toBeUndefined();
  });

  it("allows the configured web origin through CORS", async () => {
    const res = await request(app)
      .get("/api/v1/health")
      .set("Origin", "http://localhost:5173");
    expect(res.headers["access-control-allow-origin"]).toBe("http://localhost:5173");
  });
});
