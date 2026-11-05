import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { HeroSection, HERO_MOTIVATION_TEXT } from "../HeroSection";
import uk from "../../locales/uk.json";
import en from "../../locales/en.json";
import de from "../../locales/de.json";
// Raw stylesheet source: jsdom does not compute CSS-module styles, so the
// colour scheme is asserted against the declarations themselves.
const css = readFileSync(
  resolve(import.meta.dirname, "../../styles/HeroSection.module.css"),
  "utf8",
);

afterEach(cleanup);

const MOTIVATION_UK = "мотивація працювати руками і частіше гуляти";

/** Returns the body of the first `selector { ... }` rule in the stylesheet. */
function ruleBody(selector) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = css.match(new RegExp(`${escaped}\\s*\\{([^}]*)\\}`));
  if (!match) throw new Error(`CSS rule "${selector}" not found`);
  return match[1];
}

/** Reads the value of a custom property declared on `.hero`. */
function heroVar(name) {
  const match = ruleBody(".hero").match(
    new RegExp(`${name}\\s*:\\s*([^;]+);`),
  );
  return match ? match[1].trim().toLowerCase() : undefined;
}

const INDIGO = /^#(4b0082|4f46e5|6366f1|3f51b5|4338ca|3730a3|312e81)$/;
const TURQUOISE = /^#(40e0d0|48d1cc|00ced1|30d5c8|0d9488|14b8a6|2dd4bf)$/;

describe("HeroSection — AC0: motivational text", () => {
  it('shows "мотивація працювати руками і частіше гуляти" by default', () => {
    render(<HeroSection title="Loopa" />);
    const hero = screen.getByTestId("hero-section");
    expect(hero.textContent).toContain(MOTIVATION_UK);
    expect(screen.getByText(MOTIVATION_UK).tagName).toBe("P");
  });

  it("renders as a labelled region with the given heading", () => {
    render(<HeroSection title="Loopa" />);
    const region = screen.getByRole("region", { name: "Loopa" });
    expect(region).toBe(screen.getByTestId("hero-section"));
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe("Loopa");
  });

  it("takes the default text from the Ukrainian dictionary", () => {
    expect(HERO_MOTIVATION_TEXT).toBe(MOTIVATION_UK);
    expect(uk.hero.motivation).toBe(MOTIVATION_UK);
  });

  it("accepts a localized subtitle from another dictionary", () => {
    render(<HeroSection title="Loopa" subtitle={en.hero.motivation} />);
    expect(screen.getByText(en.hero.motivation)).toBeTruthy();
    expect(screen.queryByText(MOTIVATION_UK)).toBeNull();
  });

  it("has the motivational text in every language dictionary", () => {
    for (const dict of [uk, en, de]) {
      expect(typeof dict.hero?.motivation).toBe("string");
      expect(dict.hero.motivation.trim().length).toBeGreaterThan(0);
    }
  });
});

describe("HeroSection — AC1: indigo & turquoise colours", () => {
  it("declares indigo and turquoise palette variables", () => {
    expect(heroVar("--hero-indigo")).toMatch(INDIGO);
    expect(heroVar("--hero-indigo-light")).toMatch(INDIGO);
    expect(heroVar("--hero-turquoise")).toMatch(TURQUOISE);
    expect(heroVar("--hero-turquoise-dark")).toMatch(TURQUOISE);
  });

  it("paints the section background with an indigo → turquoise gradient", () => {
    const hero = ruleBody(".hero");
    expect(hero).toMatch(/background-color:\s*var\(--hero-indigo\)/);
    const gradient = hero.match(/linear-gradient\(([\s\S]*?)\);/);
    expect(gradient).not.toBeNull();
    const stops = gradient[1];
    expect(stops).toContain("var(--hero-indigo)");
    expect(stops).toContain("var(--hero-turquoise)");
    expect(stops.indexOf("var(--hero-indigo)")).toBeLessThan(
      stops.indexOf("var(--hero-turquoise)"),
    );
  });

  it("renders the subtitle and accent in turquoise", () => {
    expect(ruleBody(".subtitle")).toMatch(/color:\s*var\(--hero-turquoise\)/);
    expect(ruleBody(".accent")).toMatch(
      /background-color:\s*var\(--hero-turquoise\)/,
    );
  });

  it("applies the coloured style classes to the rendered markup", () => {
    const { container } = render(<HeroSection title="Loopa" />);
    const hero = screen.getByTestId("hero-section");
    expect(hero.tagName).toBe("SECTION");
    expect(hero.className).toMatch(/hero/);
    expect(screen.getByText(MOTIVATION_UK).className).toMatch(/subtitle/);
    expect(container.querySelector('[aria-hidden="true"]').className).toMatch(
      /accent/,
    );
  });
});
