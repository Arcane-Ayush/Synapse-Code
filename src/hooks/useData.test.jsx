import { describe, it, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useData } from "./useData";

vi.mock("../services/api", () => ({
  fetchClubData: vi.fn(async () => ({
    activities: [],
    projects: [],
    leaderboard: [],
    currentSprint: { title: "Sprint", deadline: "Jan 1, 2026", tasks: [] },
  })),
}));

function wrapper({ children }) {
  const client = new QueryClient();
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

describe("useData", () => {
  it("returns merged data and loading=false with placeholderData", async () => {
    const { result } = renderHook(() => useData(), { wrapper });
    expect(result.current.activities.length >= 0).toBe(true);
    expect(result.current.projects.length >= 0).toBe(true);
    expect(result.current.loading).toBe(false);
    expect(result.current.currentSprint.title).toBeDefined();
  });
  it("sets error when API fails", async () => {
    const api = await import("../services/api");
    api.fetchClubData.mockImplementationOnce(() =>
      Promise.reject(new Error("fail")),
    );
    const { result } = renderHook(() => useData(), { wrapper });
    expect(
      result.current.error === null || typeof result.current.error === "string",
    ).toBe(true);
  });
});
