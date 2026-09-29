import { describe, expect, it } from "vitest";
import { RideStatus } from "./enums";
import { canTransition, isTerminalStatus, RIDE_TRANSITIONS } from "./rideStateMachine";

describe("ride state machine", () => {
  it("allows the happy path in order", () => {
    const path: RideStatus[] = [
      "REQUESTED",
      "SEARCHING",
      "ACCEPTED",
      "ARRIVED",
      "IN_PROGRESS",
      "COMPLETED",
    ];
    for (let i = 0; i < path.length - 1; i++) {
      expect(canTransition(path[i]!, path[i + 1]!)).toBe(true);
    }
  });

  it("allows cancelling before the trip starts", () => {
    for (const s of ["REQUESTED", "SEARCHING", "ACCEPTED", "ARRIVED"] as const) {
      expect(canTransition(s, "CANCELLED")).toBe(true);
    }
  });

  it("does not allow cancelling once the trip is in progress", () => {
    expect(canTransition("IN_PROGRESS", "CANCELLED")).toBe(false);
  });

  it("does not allow skipping steps", () => {
    expect(canTransition("SEARCHING", "IN_PROGRESS")).toBe(false);
    expect(canTransition("ACCEPTED", "COMPLETED")).toBe(false);
  });

  it("does not allow moving backwards", () => {
    expect(canTransition("ACCEPTED", "SEARCHING")).toBe(false);
    expect(canTransition("COMPLETED", "IN_PROGRESS")).toBe(false);
  });

  it("treats COMPLETED and CANCELLED as terminal", () => {
    expect(isTerminalStatus("COMPLETED")).toBe(true);
    expect(isTerminalStatus("CANCELLED")).toBe(true);
    expect(isTerminalStatus("SEARCHING")).toBe(false);
  });

  it("defines transitions for every status", () => {
    for (const status of Object.values(RideStatus)) {
      expect(RIDE_TRANSITIONS[status]).toBeDefined();
    }
  });
});
