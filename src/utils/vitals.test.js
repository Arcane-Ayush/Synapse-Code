import { describe, it, expect, vi } from "vitest";
import { reportWebVitals } from "./vitals";

vi.mock("web-vitals", () => ({
  onCLS: (cb) => cb({ value: 0.1 }),
  onLCP: (cb) => cb({ value: 2500 }),
  onTTFB: (cb) => cb({ value: 100 }),
  onINP: (cb) => cb({ value: 120 }),
}));

vi.mock("./logger", () => ({
  logger: { info: vi.fn() },
}));

describe("reportWebVitals", () => {
  it("reports metrics via logger", async () => {
    reportWebVitals();
    const { logger } = await import("./logger");
    expect(logger.info).toHaveBeenCalled();
  });
});
