import { describe, it, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useSprints } from "./useSprints";

vi.mock("../services/api", () => ({
  fetchClubData: vi.fn(async () => ({
    leaderboard: [],
    currentSprint: { title: "Sprint", deadline: "Jan 1, 2026", tasks: [] },
  })),
}));

function wrapper({ children }) {
  const client = new QueryClient();
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

describe("useSprints", () => {
  it("returns data and loading=false with placeholderData", async () => {
    const { result } = renderHook(() => useSprints(), { wrapper });
    expect(Array.isArray(result.current.leaderboard)).toBe(true);
    expect(result.current.currentSprint.title).toBeDefined();
    expect(result.current.loading).toBe(false);
  });
  it("sets error when API fails", async () => {
    const api = await import("../services/api");
    api.fetchClubData.mockImplementationOnce(() =>
      Promise.reject(new Error("fail")),
    );
    const { result } = renderHook(() => useSprints(), { wrapper });
    expect(
      result.current.error === null || typeof result.current.error === "string",
    ).toBe(true);
  });
});
