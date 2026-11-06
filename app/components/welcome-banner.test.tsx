import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { WelcomeBanner } from "./welcome-banner";
import Home from "../page";

afterEach(cleanup);

describe("WelcomeBanner", () => {
  it('renders the "Welcome to Work" text in white', () => {
    render(<WelcomeBanner />);
    const banner = screen.getByRole("banner");
    expect(banner.textContent).toBe("Welcome to Work");
    expect(banner.className).toContain("text-white");
  });

  it("is fixed and layered above all other elements", () => {
    render(<WelcomeBanner />);
    const banner = screen.getByRole("banner");
    expect(banner.className).toContain("fixed");
    expect(banner.className).toContain("z-[9999]");
  });
});

describe("Home page", () => {
  it("shows the welcome banner on load", () => {
    render(<Home />);
    expect(screen.getByRole("banner").textContent).toBe("Welcome to Work");
  });
});
