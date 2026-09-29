import type { ApiResponse } from "@tegaride/shared";

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly code: string,
    message: string,
    public readonly details?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/**
 * Small wrapper around fetch for our API.
 * - Always talks to /api/v1 (proxied to the API in dev)
 * - Unwraps { success, data } and throws ApiError for failures
 * - credentials: "include" so the refresh-token cookie works from Step 4
 */
export async function apiFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`/api/v1${path}`, {
      credentials: "include",
      ...init,
      headers: { "Content-Type": "application/json", ...init.headers },
    });
  } catch {
    throw new ApiError(0, "NETWORK_ERROR", "Network error. Check your connection.");
  }

  let body: ApiResponse<T>;
  try {
    body = (await res.json()) as ApiResponse<T>;
  } catch {
    throw new ApiError(res.status, "INVALID_RESPONSE", "Unexpected response from the server.");
  }

  if (!res.ok || !body.success) {
    const failure = body.success ? null : body;
    throw new ApiError(
      res.status,
      failure?.code ?? "UNKNOWN_ERROR",
      failure?.message ?? "Request failed.",
      failure?.details,
    );
  }

  return body.data;
}
