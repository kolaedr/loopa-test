import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { QuoteBlock } from "./quote-block";
import { LanguageProvider, DICTIONARIES, DEFAULT_LANGUAGE } from "@/app/context/LanguageContext";
import uk from "@/src/locales/uk.json";
import en from "@/src/locales/en.json";
import de from "@/src/locales/de.json";

afterEach(cleanup);

function classesOf(element: Element) {
  return element.className.split(/\s+/).filter(Boolean);
}

describe("QuoteBlock — rendering", () => {
  it("renders quote block section with default English text from LanguageProvider", () => {
    render(
      <LanguageProvider>
        <QuoteBlock />
      </LanguageProvider>,
    );
    expect(screen.getByTestId("quote-block-section")).toBeTruthy();
    expect(screen.getByTestId("quote-latin")).toBeTruthy();
    expect(screen.getByTestId("quote-translation")).toBeTruthy();
  });

  it("displays Latin quote in English when using default LanguageProvider", () => {
    render(
      <LanguageProvider>
        <QuoteBlock />
      </LanguageProvider>,
    );
    const latinElement = screen.getByTestId("quote-latin");
    expect(latinElement.textContent).toContain(en.quoteBlock.latin);
  });

  it("displays English translation when using default LanguageProvider", () => {
    render(
      <LanguageProvider>
        <QuoteBlock />
      </LanguageProvider>,
    );
    expect(screen.getByText(en.quoteBlock.translation)).toBeTruthy();
  });

  it("displays Ukrainian translation when language is set to Ukrainian", () => {
    render(
      <LanguageProvider defaultLanguage="uk">
        <QuoteBlock />
      </LanguageProvider>,
    );
    expect(screen.getByTestId("quote-latin").textContent).toContain(uk.quoteBlock.latin);
    expect(screen.getByText(uk.quoteBlock.translation)).toBeTruthy();
  });

  it("displays German translation when language is set to German", () => {
    render(
      <LanguageProvider defaultLanguage="de">
        <QuoteBlock />
      </LanguageProvider>,
    );
    expect(screen.getByTestId("quote-latin").textContent).toContain(de.quoteBlock.latin);
    expect(screen.getByText(de.quoteBlock.translation)).toBeTruthy();
  });
});

describe("QuoteBlock — styling", () => {
  it("uses gradient background from blue-900 to blue-600", () => {
    render(
      <LanguageProvider>
        <QuoteBlock />
      </LanguageProvider>,
    );
    const section = screen.getByTestId("quote-block-section");
    expect(classesOf(section)).toContain("bg-gradient-to-b");
    expect(classesOf(section)).toContain("from-blue-900");
    expect(classesOf(section)).toContain("to-blue-600");
  });

  it("has full width with padding", () => {
    render(
      <LanguageProvider>
        <QuoteBlock />
      </LanguageProvider>,
    );
    const section = screen.getByTestId("quote-block-section");
    expect(classesOf(section)).toContain("w-full");
    expect(classesOf(section)).toContain("px-6");
    expect(classesOf(section)).toContain("py-16");
  });

  it("applies Tailwind utility classes only (no CSS modules)", () => {
    render(
      <LanguageProvider>
        <QuoteBlock />
      </LanguageProvider>,
    );
    const section = screen.getByTestId("quote-block-section");
    for (const el of [section, ...section.querySelectorAll("*")]) {
      for (const c of classesOf(el)) {
        expect(c).not.toMatch(/__|^_/);
      }
    }
  });

  it("styles Latin quote as italic and semibold", () => {
    render(
      <LanguageProvider>
        <QuoteBlock />
      </LanguageProvider>,
    );
    const latín = screen.getByTestId("quote-latin");
    expect(classesOf(latín)).toContain("italic");
    expect(classesOf(latín)).toContain("font-semibold");
  });

  it("styles translation with light blue text", () => {
    render(
      <LanguageProvider>
        <QuoteBlock />
      </LanguageProvider>,
    );
    const translation = screen.getByTestId("quote-translation");
    expect(classesOf(translation)).toContain("text-blue-100");
  });

  it("centers text alignment", () => {
    render(
      <LanguageProvider>
        <QuoteBlock />
      </LanguageProvider>,
    );
    const blockquote = screen.getByTestId("quote-latin").parentElement;
    expect(classesOf(blockquote!)).toContain("text-center");
  });
});

describe("QuoteBlock — localization", () => {
  it("has quote block content in every language dictionary", () => {
    for (const dict of [uk, en, de]) {
      expect(typeof dict.quoteBlock?.latin).toBe("string");
      expect(typeof dict.quoteBlock?.translation).toBe("string");
      expect(dict.quoteBlock.latin.trim().length).toBeGreaterThan(0);
      expect(dict.quoteBlock.translation.trim().length).toBeGreaterThan(0);
    }
  });

  it("uses default language when rendered outside LanguageProvider", () => {
    render(<QuoteBlock />);
    const defaultDict = DICTIONARIES[DEFAULT_LANGUAGE];
    expect(screen.getByTestId("quote-latin").textContent).toContain(defaultDict.quoteBlock.latin);
    expect(screen.getByText(defaultDict.quoteBlock.translation)).toBeTruthy();
  });

  it("switches language when LanguageProvider language changes", () => {
    const { rerender } = render(
      <LanguageProvider defaultLanguage="en">
        <QuoteBlock />
      </LanguageProvider>,
    );
    expect(screen.getByText(en.quoteBlock.translation)).toBeTruthy();

    rerender(
      <LanguageProvider defaultLanguage="uk">
        <QuoteBlock />
      </LanguageProvider>,
    );
    expect(screen.getByText(uk.quoteBlock.translation)).toBeTruthy();
  });
});

describe("QuoteBlock — accessibility", () => {
  it("renders as a section element", () => {
    render(
      <LanguageProvider>
        <QuoteBlock />
      </LanguageProvider>,
    );
    const section = screen.getByTestId("quote-block-section");
    expect(section.tagName).toBe("SECTION");
  });

  it("uses semantic blockquote element", () => {
    const { container } = render(
      <LanguageProvider>
        <QuoteBlock />
      </LanguageProvider>,
    );
    const blockquotes = container.querySelectorAll("blockquote");
    expect(blockquotes).toHaveLength(1);
  });

  it("contains paragraph elements for quote text", () => {
    const { container } = render(
      <LanguageProvider>
        <QuoteBlock />
      </LanguageProvider>,
    );
    const paragraphs = container.querySelectorAll("p");
    expect(paragraphs.length).toBeGreaterThanOrEqual(2);
  });

  it("displays Latin quote with quotation marks for clarity", () => {
    render(
      <LanguageProvider>
        <QuoteBlock />
      </LanguageProvider>,
    );
    const latinText = screen.getByTestId("quote-latin").textContent;
    expect(latinText).toBeTruthy();
    expect(latinText?.length).toBeGreaterThan(en.quoteBlock.latin.length);
  });

  it("maintains semantic structure with proper spacing", () => {
    render(
      <LanguageProvider>
        <QuoteBlock />
      </LanguageProvider>,
    );
    const latin = screen.getByTestId("quote-latin");
    expect(classesOf(latin)).toContain("mb-4");
  });
});
