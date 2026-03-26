import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { ErrorBoundary } from "./ErrorBoundary";

function Boom() {
  throw new Error("boom");
}

describe("ErrorBoundary", () => {
  it("renders fallback when child throws", () => {
    const { getByText } = render(
      <ErrorBoundary>
        <Boom />
      </ErrorBoundary>,
    );
    expect(getByText(/Something went wrong/i)).toBeInTheDocument();
  });
});
