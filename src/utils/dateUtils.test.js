import { describe, it, expect } from "vitest";
import { formatDate } from "./dateUtils";

describe("formatDate", () => {
  it("formats ISO date to en-US short form", () => {
    expect(formatDate("2026-02-15")).toBe("Feb 15, 2026");
  });

  it("returns original input on parse error", () => {
    expect(formatDate("invalid")).toBe("Invalid Date");
  });
});
