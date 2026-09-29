/**
 * Shared enums. Defined as const objects (not TS `enum`) so they work
 * everywhere and mirror the Prisma enums we add in Step 3.
 * IMPORTANT: keep these in sync with prisma/schema.prisma (a test will enforce it in Step 13).
 */

export const Role = {
  PASSENGER: "PASSENGER",
  DRIVER: "DRIVER",
  ADMIN: "ADMIN",
} as const;
export type Role = (typeof Role)[keyof typeof Role];

export const DriverStatus = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
  SUSPENDED: "SUSPENDED",
} as const;
export type DriverStatus = (typeof DriverStatus)[keyof typeof DriverStatus];

export const VehicleType = {
  MOTO: "MOTO",
  CAR: "CAR",
} as const;
export type VehicleType = (typeof VehicleType)[keyof typeof VehicleType];

export const RideStatus = {
  REQUESTED: "REQUESTED",
  SEARCHING: "SEARCHING",
  ACCEPTED: "ACCEPTED",
  ARRIVED: "ARRIVED",
  IN_PROGRESS: "IN_PROGRESS",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
} as const;
export type RideStatus = (typeof RideStatus)[keyof typeof RideStatus];

export const PaymentMethod = {
  CASH: "CASH",
  MOBILE_MONEY: "MOBILE_MONEY",
} as const;
export type PaymentMethod = (typeof PaymentMethod)[keyof typeof PaymentMethod];

export const PaymentStatus = {
  PENDING: "PENDING",
  PROCESSING: "PROCESSING",
  COMPLETED: "COMPLETED",
  FAILED: "FAILED",
  REFUNDED: "REFUNDED",
} as const;
export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];

export const DocumentStatus = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
} as const;
export type DocumentStatus = (typeof DocumentStatus)[keyof typeof DocumentStatus];
