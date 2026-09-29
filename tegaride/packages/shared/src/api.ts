/** Standard API response shapes shared by backend and frontend. */

export interface ApiSuccess<T> {
  success: true;
  data: T;
}

export interface ApiFailure {
  success: false;
  message: string;
  /** Stable machine-readable code, e.g. "VALIDATION_ERROR". */
  code: string;
  /** Optional extra info such as per-field validation errors. */
  details?: unknown;
}

export type ApiResponse<T> = ApiSuccess<T> | ApiFailure;

export interface HealthData {
  status: "ok";
  service: string;
  time: string;
}
