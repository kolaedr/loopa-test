import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, render, screen, within } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { Footer, formatFooterDate, getTodayKey } from "./footer";
import {
  DICTIONARIES,
  LANGUAGE_STORAGE_KEY,
  LanguageProvider,
  SUPPORTED_LANGUAGES,
  type Language,
} from "../context/LanguageContext";

function renderFooter() {
  return render(
    <LanguageProvider>
      <Footer />
    </LanguageProvider>,
  );
}

function switcher() {
  return screen.getByRole("group", {
    name: DICTIONARIES.en.footer.languageSwitcherLabel,
  });
}

beforeEach(() => {
  window.localStorage.clear();
  document.documentElement.lang = "";
  // Only fake the clock and timers; React's scheduler keeps working.
  vi.useFakeTimers({ toFake: ["Date", "setTimeout", "clearTimeout"] });
  vi.setSystemTime(new Date(2026, 10, 5, 12, 0, 0)); // 5 Nov 2026, local time
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

describe("getTodayKey", () => {
  it("returns the local calendar day as YYYY-MM-DD", () => {
    expect(getTodayKey(new Date(2026, 0, 3, 23, 59))).toBe("2026-01-03");
    expect(getTodayKey(new Date(2027, 11, 31))).toBe("2027-12-31");
  });

  it("defaults to the current clock", () => {
    expect(getTodayKey()).toBe("2026-11-05");
  });
});

describe("formatFooterDate", () => {
  it("formats the date for the selected language", () => {
    const date = new Date(2026, 10, 5);
    for (const language of SUPPORTED_LANGUAGES) {
      expect(formatFooterDate(date, language)).toBe(
        new Intl.DateTimeFormat(language, { dateStyle: "long" }).format(date),
      );
    }
  });
});

describe("Footer — current date", () => {
  it("shows the current year and today's date on load", () => {
    renderFooter();
    expect(screen.getByRole("contentinfo")).toBeTruthy();
    expect(screen.getByTestId("footer-copyright").textContent).toBe(
      "© 2026 Loopa. All rights reserved.",
    );
    const date = screen.getByTestId("footer-date");
    expect(date.tagName).toBe("TIME");
    expect(date.getAttribute("datetime")).toBe("2026-11-05");
    expect(date.textContent).toBe(
      `Today is ${formatFooterDate(new Date(2026, 10, 5), "en")}`,
    );
  });

  it("is not hardcoded: reflects the year of the current clock", () => {
    vi.setSystemTime(new Date(2031, 5, 15, 9, 0));
    renderFooter();
    expect(screen.getByTestId("footer-copyright").textContent).toBe(
      "© 2031 Loopa. All rights reserved.",
    );
    expect(
      screen.getByTestId("footer-date").getAttribute("datetime"),
    ).toBe("2031-06-15");
  });

  it("rolls over to the new year at midnight without a reload", () => {
    vi.setSystemTime(new Date(2026, 11, 31, 23, 59, 0));
    renderFooter();
    expect(screen.getByTestId("footer-copyright").textContent).toContain(
      "2026",
    );

    act(() => {
      vi.advanceTimersByTime(60 * 1000);
    });

    expect(screen.getByTestId("footer-copyright").textContent).toBe(
      "© 2027 Loopa. All rights reserved.",
    );
    expect(
      screen.getByTestId("footer-date").getAttribute("datetime"),
    ).toBe("2027-01-01");
  });

  it("updates the date at every local midnight", () => {
    renderFooter();
    act(() => {
      vi.advanceTimersByTime(24 * 60 * 60 * 1000);
    });
    expect(
      screen.getByTestId("footer-date").getAttribute("datetime"),
    ).toBe("2026-11-06");
  });

  it("clears its midnight timer on unmount", () => {
    const { unmount } = renderFooter();
    expect(vi.getTimerCount()).toBeGreaterThan(0);
    unmount();
    expect(vi.getTimerCount()).toBe(0);
  });

  it("renders no date on the server to avoid hydration mismatches", () => {
    const html = renderToString(
      <LanguageProvider>
        <Footer />
      </LanguageProvider>,
    );
    expect(html).toContain("<footer");
    expect(html).not.toContain("2026");
    expect(html).not.toContain('data-testid="footer-date"');
  });
});

describe("Footer — language switcher", () => {
  it("offers a button for every supported language", () => {
    renderFooter();
    const buttons = within(switcher()).getAllByRole("button");
    expect(buttons.map((b) => b.getAttribute("lang"))).toEqual(
      SUPPORTED_LANGUAGES,
    );
    for (const button of buttons) {
      const code = button.getAttribute("lang") as Language;
      expect(button.textContent).toBe(DICTIONARIES.en.footer.languages[code]);
      expect(button.getAttribute("type")).toBe("button");
    }
  });

  it("marks the current language as pressed", () => {
    renderFooter();
    for (const button of within(switcher()).getAllByRole("button")) {
      expect(button.getAttribute("aria-pressed")).toBe(
        String(button.getAttribute("lang") === "en"),
      );
    }
  });

  it.each<Language>(["uk", "de", "en"])(
    "switches the site language to %s on click",
    (code) => {
      window.localStorage.setItem(
        LANGUAGE_STORAGE_KEY,
        code === "en" ? "uk" : "en",
      );
      renderFooter();

      const button = screen.getByRole("button", {
        name: DICTIONARIES[code].footer.languages[code],
      });
      act(() => button.click());

      const { footer } = DICTIONARIES[code];
      expect(button.getAttribute("aria-pressed")).toBe("true");
      expect(window.localStorage.getItem(LANGUAGE_STORAGE_KEY)).toBe(code);
      expect(document.documentElement.lang).toBe(code);
      expect(
        screen.getByRole("group", { name: footer.languageSwitcherLabel }),
      ).toBeTruthy();
      expect(screen.getByTestId("footer-copyright").textContent).toBe(
        footer.copyright.replace("{year}", "2026"),
      );
      expect(screen.getByTestId("footer-date").textContent).toBe(
        footer.currentDate.replace(
          "{date}",
          formatFooterDate(new Date(2026, 10, 5), code),
        ),
      );
    },
  );

  it("restores the previously chosen language", () => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, "uk");
    renderFooter();
    expect(screen.getByTestId("footer-copyright").textContent).toBe(
      "© 2026 Loopa. Усі права захищено.",
    );
    expect(
      screen
        .getByRole("button", { name: "Українська" })
        .getAttribute("aria-pressed"),
    ).toBe("true");
  });

  it("is placed on the right side of the footer", () => {
    renderFooter();
    const group = switcher();
    expect(group.className).toContain("ml-auto");
    // The switcher is the last item of a space-between flex row.
    const row = group.parentElement!;
    expect(row.className).toContain("flex");
    expect(row.className).toContain("justify-between");
    expect(row.lastElementChild).toBe(group);
  });

  it("buttons are interactive and keyboard-focusable", () => {
    renderFooter();
    for (const button of within(switcher()).getAllByRole("button")) {
      expect((button as HTMLButtonElement).disabled).toBe(false);
      expect(button.className).toContain("cursor-pointer");
      button.focus();
      expect(document.activeElement).toBe(button);
    }
  });
});
