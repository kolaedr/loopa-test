import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { act, cleanup, render, screen } from "@testing-library/react";
import {
  DEFAULT_LANGUAGE,
  DICTIONARIES,
  LANGUAGE_STORAGE_KEY,
  LanguageProvider,
  SUPPORTED_LANGUAGES,
  useLanguage,
  type Language,
} from "./LanguageContext";
import { Providers } from "../providers";

function Probe() {
  const { language, setLanguage, dictionary, languages } = useLanguage();
  return (
    <div>
      <span data-testid="language">{language}</span>
      <span data-testid="text">{dictionary.hero.motivation}</span>
      {languages.map((code) => (
        <button key={code} onClick={() => setLanguage(code)}>
          {code}
        </button>
      ))}
    </div>
  );
}

beforeEach(() => {
  window.localStorage.clear();
  document.documentElement.lang = "";
});
afterEach(cleanup);

describe("LanguageProvider", () => {
  it("supports every language dictionary", () => {
    expect([...SUPPORTED_LANGUAGES].sort()).toEqual(["de", "en", "uk"]);
  });

  it("uses the default language when nothing is stored", () => {
    render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>,
    );
    expect(screen.getByTestId("language").textContent).toBe(DEFAULT_LANGUAGE);
    expect(screen.getByTestId("text").textContent).toBe(
      DICTIONARIES[DEFAULT_LANGUAGE].hero.motivation,
    );
    expect(document.documentElement.lang).toBe(DEFAULT_LANGUAGE);
  });

  it("restores the language saved in localStorage", () => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, "de");
    render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>,
    );
    expect(screen.getByTestId("language").textContent).toBe("de");
  });

  it("ignores an unsupported stored value", () => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, "fr");
    render(
      <LanguageProvider defaultLanguage="uk">
        <Probe />
      </LanguageProvider>,
    );
    expect(screen.getByTestId("language").textContent).toBe("uk");
  });

  it.each<Language>(["uk", "de", "en"])(
    "switches to %s, persists it and updates <html lang>",
    (code) => {
      render(
        <Providers>
          <Probe />
        </Providers>,
      );
      act(() => screen.getByRole("button", { name: code }).click());
      expect(screen.getByTestId("language").textContent).toBe(code);
      expect(screen.getByTestId("text").textContent).toBe(
        DICTIONARIES[code].hero.motivation,
      );
      expect(window.localStorage.getItem(LANGUAGE_STORAGE_KEY)).toBe(code);
      expect(document.documentElement.lang).toBe(code);
    },
  );

  it("throws when useLanguage is used outside the provider", () => {
    expect(() => render(<Probe />)).toThrow(/LanguageProvider/);
  });
});
