import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import Home from "./page";

afterEach(cleanup);

describe("Home page — hero section (task #216)", () => {
  it("renders the hero section with the motivational text", () => {
    render(<Home />);
    const hero = screen.getByTestId("hero-section");
    expect(hero.textContent).toContain(
      "мотивація працювати руками і частіше гуляти",
    );
  });

  it("places the hero section before the main content", () => {
    const { container } = render(<Home />);
    const hero = screen.getByTestId("hero-section");
    const main = container.querySelector("main");
    expect(main).not.toBeNull();
    expect(
      hero.compareDocumentPosition(main!) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });
});
