import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { AutumnCards, AUTUMN_CARDS_DEFAULTS } from "../AutumnCards";
import { LanguageProvider } from "../../../app/context/LanguageContext";
import uk from "../../locales/uk.json";
import en from "../../locales/en.json";
import de from "../../locales/de.json";

afterEach(cleanup);

function classesOf(element) {
  return element.className.split(/\s+/).filter(Boolean);
}

describe("AutumnCards — rendering", () => {
  it("renders three cards with default English text from LanguageProvider", () => {
    render(
      <LanguageProvider>
        <AutumnCards />
      </LanguageProvider>,
    );
    expect(screen.getByTestId("autumn-cards-section")).toBeTruthy();
    expect(screen.getAllByTestId(/^autumn-card-/)).toHaveLength(3);
  });

  it("displays all three card titles in English when using default LanguageProvider", () => {
    render(
      <LanguageProvider>
        <AutumnCards />
      </LanguageProvider>,
    );
    expect(screen.getByText(en.autumnCards.card1Title)).toBeTruthy();
    expect(screen.getByText(en.autumnCards.card2Title)).toBeTruthy();
    expect(screen.getByText(en.autumnCards.card3Title)).toBeTruthy();
  });

  it("displays all three card descriptions in English when using default LanguageProvider", () => {
    render(
      <LanguageProvider>
        <AutumnCards />
      </LanguageProvider>,
    );
    expect(screen.getByText(en.autumnCards.card1Description)).toBeTruthy();
    expect(screen.getByText(en.autumnCards.card2Description)).toBeTruthy();
    expect(screen.getByText(en.autumnCards.card3Description)).toBeTruthy();
  });

  it("renders three cards with Ukrainian text when language is set to Ukrainian", () => {
    render(
      <LanguageProvider defaultLanguage="uk">
        <AutumnCards />
      </LanguageProvider>,
    );
    expect(screen.getByText(uk.autumnCards.card1Title)).toBeTruthy();
    expect(screen.getByText(uk.autumnCards.card2Title)).toBeTruthy();
    expect(screen.getByText(uk.autumnCards.card3Title)).toBeTruthy();
  });

  it("renders three cards with German text when language is set to German", () => {
    render(
      <LanguageProvider defaultLanguage="de">
        <AutumnCards />
      </LanguageProvider>,
    );
    expect(screen.getByText(de.autumnCards.card1Title)).toBeTruthy();
    expect(screen.getByText(de.autumnCards.card2Title)).toBeTruthy();
    expect(screen.getByText(de.autumnCards.card3Title)).toBeTruthy();
  });
});

describe("AutumnCards — styling", () => {
  it("uses white background and light styling", () => {
    render(
      <LanguageProvider>
        <AutumnCards />
      </LanguageProvider>,
    );
    const section = screen.getByTestId("autumn-cards-section");
    expect(classesOf(section)).toContain("bg-white");
  });

  it("arranges cards in a responsive grid", () => {
    render(
      <LanguageProvider>
        <AutumnCards />
      </LanguageProvider>,
    );
    const cards = screen.getAllByTestId(/^autumn-card-/);
    const containerDiv = cards[0].parentElement;
    expect(classesOf(containerDiv)).toContain("grid");
    expect(classesOf(containerDiv)).toContain("md:grid-cols-3");
  });

  it("applies Tailwind utility classes only (no CSS modules)", () => {
    render(
      <LanguageProvider>
        <AutumnCards />
      </LanguageProvider>,
    );
    const section = screen.getByTestId("autumn-cards-section");
    for (const el of [section, ...section.querySelectorAll("*")]) {
      for (const c of classesOf(el)) {
        expect(c).not.toMatch(/__|^_/);
      }
    }
  });

  it("has hover shadow effect on cards", () => {
    render(
      <LanguageProvider>
        <AutumnCards />
      </LanguageProvider>,
    );
    const card = screen.getByTestId("autumn-card-1");
    expect(classesOf(card)).toContain("hover:shadow-md");
  });

  it("displays icons with aria-hidden attribute", () => {
    const { container } = render(
      <LanguageProvider>
        <AutumnCards />
      </LanguageProvider>,
    );
    const icons = container.querySelectorAll('[aria-hidden="true"]');
    expect(icons.length).toBe(3);
  });
});

describe("AutumnCards — localization", () => {
  it("has autumn card content in every language dictionary", () => {
    for (const dict of [uk, en, de]) {
      expect(typeof dict.autumnCards?.card1Title).toBe("string");
      expect(typeof dict.autumnCards?.card1Description).toBe("string");
      expect(typeof dict.autumnCards?.card2Title).toBe("string");
      expect(typeof dict.autumnCards?.card2Description).toBe("string");
      expect(typeof dict.autumnCards?.card3Title).toBe("string");
      expect(typeof dict.autumnCards?.card3Description).toBe("string");

      expect(dict.autumnCards.card1Title.trim().length).toBeGreaterThan(0);
      expect(dict.autumnCards.card1Description.trim().length).toBeGreaterThan(0);
      expect(dict.autumnCards.card2Title.trim().length).toBeGreaterThan(0);
      expect(dict.autumnCards.card2Description.trim().length).toBeGreaterThan(0);
      expect(dict.autumnCards.card3Title.trim().length).toBeGreaterThan(0);
      expect(dict.autumnCards.card3Description.trim().length).toBeGreaterThan(0);
    }
  });

  it("uses Ukrainian defaults when rendered outside LanguageProvider", () => {
    render(<AutumnCards />);
    expect(screen.getByText(AUTUMN_CARDS_DEFAULTS.card1Title)).toBeTruthy();
    expect(screen.getByText(AUTUMN_CARDS_DEFAULTS.card2Title)).toBeTruthy();
    expect(screen.getByText(AUTUMN_CARDS_DEFAULTS.card3Title)).toBeTruthy();
  });
});

describe("AutumnCards — accessibility", () => {
  it("renders as a section element", () => {
    render(
      <LanguageProvider>
        <AutumnCards />
      </LanguageProvider>,
    );
    const section = screen.getByTestId("autumn-cards-section");
    expect(section.tagName).toBe("SECTION");
  });

  it("has semantic card structure with headings", () => {
    render(
      <LanguageProvider>
        <AutumnCards />
      </LanguageProvider>,
    );
    const headings = screen.getAllByRole("heading", { level: 3 });
    expect(headings).toHaveLength(3);
  });
});
