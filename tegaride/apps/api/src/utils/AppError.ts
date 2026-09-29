/**
 * Throw this from services/controllers for expected, user-facing errors.
 * The global error handler turns it into the standard JSON error response.
 */
export class AppError extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly code: string,
    message: string,
    public readonly details?: unknown,
  ) {
    super(message);
    this.name = "AppError";
  }
}
