import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { act, cleanup, render, screen, within } from "@testing-library/react";
import Home from "./page";
import { Footer } from "./components/footer";
import {
  DEFAULT_LANGUAGE,
  DICTIONARIES,
  LANGUAGE_STORAGE_KEY,
  LanguageProvider,
  SUPPORTED_LANGUAGES,
  type Language,
} from "./context/LanguageContext";

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

describe("Home page — texts follow the selected language (task #226)", () => {
  beforeEach(() => window.localStorage.clear());

  function renderSite() {
    return render(
      <LanguageProvider>
        <Home />
        <Footer />
      </LanguageProvider>,
    );
  }

  function expectPageIn(language: Language) {
    const dict = DICTIONARIES[language];
    expect(screen.getByRole("banner").textContent).toBe(dict.welcomeBanner.text);
    const hero = screen.getByTestId("hero-section");
    expect(within(hero).getByRole("heading", { level: 1 }).textContent).toBe(
      dict.hero.title,
    );
    expect(hero.textContent).toContain(dict.hero.motivation);
    const main = screen.getByRole("main");
    expect(within(main).getByRole("heading", { level: 1 }).textContent).toBe(
      dict.home.title,
    );
    expect(main.textContent).toContain(dict.home.description);
  }

  it("renders every text in the default language", () => {
    renderSite();
    expectPageIn(DEFAULT_LANGUAGE);
  });

  it("translates every text when the footer switcher is clicked", () => {
    renderSite();
    for (const language of SUPPORTED_LANGUAGES) {
      const button = within(screen.getByTestId("language-switcher")).getByRole(
        "button",
        { name: DICTIONARIES.en.footer.languages[language] },
      );
      act(() => button.click());
      expectPageIn(language);
    }
  });

  it("uses the stored language on load", () => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, "de");
    renderSite();
    expectPageIn("de");
  });
});
