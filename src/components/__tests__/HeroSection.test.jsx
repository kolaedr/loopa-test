import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { HeroSection, HERO_MOTIVATION_TEXT } from "../HeroSection";
import Home from "../../../app/page";
import uk from "../../locales/uk.json";
import en from "../../locales/en.json";
import de from "../../locales/de.json";

afterEach(cleanup);

const MOTIVATION_UK = "мотивація працювати руками і частіше гуляти";

/** Splits an element's className into a list of Tailwind utility classes. */
function classesOf(element) {
  return element.className.split(/\s+/).filter(Boolean);
}

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

describe("HeroSection — AC1: indigo & turquoise colours (Tailwind)", () => {
  it("paints the section with an indigo → turquoise gradient", () => {
    render(<HeroSection title="Loopa" />);
    const hero = screen.getByTestId("hero-section");
    expect(hero.tagName).toBe("SECTION");
    const classes = classesOf(hero);
    expect(classes).toContain("bg-gradient-to-br");
    expect(classes).toContain("from-indigo-600");
    expect(classes).toContain("to-cyan-500");
    // Solid indigo fallback underneath the gradient.
    expect(classes).toContain("bg-indigo-600");
  });

  it("uses white text on the gradient", () => {
    render(<HeroSection title="Loopa" />);
    expect(classesOf(screen.getByTestId("hero-section"))).toContain(
      "text-white",
    );
    expect(classesOf(screen.getByText(MOTIVATION_UK))).toContain("text-white");
  });

  it("renders a turquoise accent bar", () => {
    const { container } = render(<HeroSection title="Loopa" />);
    const accent = container.querySelector('[aria-hidden="true"]');
    expect(accent).not.toBeNull();
    expect(classesOf(accent).some((c) => /^bg-cyan-\d+$/.test(c))).toBe(true);
  });

  it("is at least 60vh tall and centres its content", () => {
    render(<HeroSection title="Loopa" />);
    const classes = classesOf(screen.getByTestId("hero-section"));
    expect(classes).toContain("min-h-[60vh]");
    expect(classes).toContain("flex");
    expect(classes).toContain("items-center");
    expect(classes).toContain("justify-center");
  });

  it("does not rely on CSS-module class names", () => {
    render(<HeroSection title="Loopa" />);
    const hero = screen.getByTestId("hero-section");
    for (const el of [hero, ...hero.querySelectorAll("*")]) {
      for (const c of classesOf(el)) {
        // CSS-module output looks like `HeroSection_hero__a1b2c` / `_hero_x1`.
        expect(c).not.toMatch(/__|^_/);
      }
    }
  });

  it("no longer ships HeroSection.module.css", () => {
    const cssPath = resolve(
      import.meta.dirname,
      "../../styles/HeroSection.module.css",
    );
    expect(existsSync(cssPath)).toBe(false);
  });
});

describe("HeroSection on the home page", () => {
  it("is rendered after the WelcomeBanner", () => {
    render(<Home />);
    const banner = screen.getByRole("banner");
    const hero = screen.getByTestId("hero-section");
    expect(
      banner.compareDocumentPosition(hero) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(hero.textContent).toContain(MOTIVATION_UK);
  });

  it("is offset below the fixed banner so it is not covered", () => {
    render(<Home />);
    expect(classesOf(screen.getByRole("banner"))).toContain("fixed");
    // Banner is ~52px tall (py-3 + text-lg); mt-14 = 56px clears it.
    expect(classesOf(screen.getByTestId("hero-section"))).toContain("mt-14");
  });
});
