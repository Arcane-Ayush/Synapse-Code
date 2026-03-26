import { describe, it, expect } from "vitest";
import { cn } from "./cn";

describe("cn", () => {
  it("merges tailwind classes", () => {
    const out = cn("p-2", "p-4", "text-white", null, undefined);
    expect(out).toContain("p-4");
    expect(out).toContain("text-white");
  });
});
