import { describe, it, expect, vi, beforeEach } from "vitest";
import { logger, setLogLevel } from "./logger";

describe("logger", () => {
  beforeEach(() => {
    vi.spyOn(console, "debug").mockImplementation(() => {});
    vi.spyOn(console, "info").mockImplementation(() => {});
    vi.spyOn(console, "warn").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  it("logs info", () => {
    logger.info("test", { a: 1 });
    expect(console.info).toHaveBeenCalled();
  });

  it("logs error", () => {
    logger.error("oops", { e: "x" });
    expect(console.error).toHaveBeenCalled();
  });

  it("logs warn", () => {
    logger.warn("warn", { w: 1 });
    expect(console.warn).toHaveBeenCalled();
  });

  it("logs debug when level allows", () => {
    setLogLevel("debug");
    logger.debug("dbg", { d: 1 });
    expect(console.debug).toHaveBeenCalled();
  });
  it("ignores invalid level", () => {
    setLogLevel(null);
    logger.info("noop");
    expect(console.info).toHaveBeenCalled();
  });
  it("handles circular meta safely", () => {
    const a = {};
    a.self = a;
    logger.info("circular", a);
    expect(console.info).toHaveBeenCalled();
  });
});
