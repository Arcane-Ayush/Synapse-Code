import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { ThemeProvider } from "../context/ThemeContext";
import AuthProvider from "../context/AuthContext";
import { render } from "@testing-library/react";

describe("Navbar", () => {
  it("renders Sign In when no user", () => {
    const { getByText } = render(
      <MemoryRouter>
        <ThemeProvider>
          <AuthProvider>
            <Navbar />
          </AuthProvider>
        </ThemeProvider>
      </MemoryRouter>,
    );
    expect(getByText(/Sign In/i)).toBeTruthy();
  });
});
