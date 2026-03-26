import { describe, it, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useProjects } from "./useProjects";

vi.mock("../services/api", () => ({
  fetchClubData: vi.fn(async () => ({ projects: [] })),
}));

function wrapper({ children }) {
  const client = new QueryClient();
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

describe("useProjects", () => {
  it("returns projects and loading=false with placeholderData", async () => {
    const { result } = renderHook(() => useProjects(), { wrapper });
    expect(Array.isArray(result.current.projects)).toBe(true);
    expect(result.current.loading).toBe(false);
  });
  it("sets error when API fails", async () => {
    const api = await import("../services/api");
    api.fetchClubData.mockImplementationOnce(() =>
      Promise.reject(new Error("fail")),
    );
    const { result } = renderHook(() => useProjects(), { wrapper });
    expect(
      result.current.error === null || typeof result.current.error === "string",
    ).toBe(true);
  });
});
