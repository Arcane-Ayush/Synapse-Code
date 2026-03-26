import { describe, it, expect, vi, beforeEach } from "vitest";
import { fetchClubData } from "./api";

beforeEach(() => {
  vi.restoreAllMocks();
});

describe("fetchClubData", () => {
  it("returns json on success", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({
        ok: true,
        json: async () => ({ ok: true }),
      })),
    );
    const data = await fetchClubData();
    expect(data.ok).toBe(true);
  });

  it("throws on non-ok response", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({
        ok: false,
        status: 500,
        json: async () => ({}),
      })),
    );
    await expect(fetchClubData()).rejects.toThrow(/Failed to fetch data/);
  });

  it("aborts on timeout", async () => {
    vi.useFakeTimers();
    vi.stubGlobal(
      "fetch",
      (url, opts) =>
        new Promise((resolve, reject) => {
          if (opts?.signal) {
            opts.signal.addEventListener("abort", () =>
              reject(new Error("abort")),
            );
          }
        }),
    );
    const promise = fetchClubData();
    vi.advanceTimersByTime(10000);
    await expect(promise).rejects.toThrow(/abort/);
    vi.useRealTimers();
  });
});
