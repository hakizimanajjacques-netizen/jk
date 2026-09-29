import { RideStatus } from "./enums";

/**
 * The single source of truth for which ride status changes are legal.
 * The ride service (Step 7) will call canTransition() before every change,
 * and ALSO enforce it in the database update, so it cannot be bypassed.
 *
 * REQUESTED -> SEARCHING -> ACCEPTED -> ARRIVED -> IN_PROGRESS -> COMPLETED
 *     any of the first four (before the trip starts) -> CANCELLED
 */
export const RIDE_TRANSITIONS: Record<RideStatus, readonly RideStatus[]> = {
  REQUESTED: ["SEARCHING", "CANCELLED"],
  SEARCHING: ["ACCEPTED", "CANCELLED"],
  ACCEPTED: ["ARRIVED", "CANCELLED"],
  ARRIVED: ["IN_PROGRESS", "CANCELLED"],
  IN_PROGRESS: ["COMPLETED"],
  COMPLETED: [],
  CANCELLED: [],
};

export function canTransition(from: RideStatus, to: RideStatus): boolean {
  return RIDE_TRANSITIONS[from].includes(to);
}

/** A passenger may only have ONE ride in these statuses at a time. */
export const ACTIVE_RIDE_STATUSES: readonly RideStatus[] = [
  RideStatus.REQUESTED,
  RideStatus.SEARCHING,
  RideStatus.ACCEPTED,
  RideStatus.ARRIVED,
  RideStatus.IN_PROGRESS,
];

/** A driver may only be assigned to ONE ride in these statuses at a time. */
export const DRIVER_ASSIGNED_STATUSES: readonly RideStatus[] = [
  RideStatus.ACCEPTED,
  RideStatus.ARRIVED,
  RideStatus.IN_PROGRESS,
];

export function isTerminalStatus(status: RideStatus): boolean {
  return RIDE_TRANSITIONS[status].length === 0;
}
