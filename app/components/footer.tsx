"use client";

import { useSyncExternalStore } from "react";
import {
  useLanguage,
  type Language,
} from "@/app/context/LanguageContext";

/**
 * Site footer (task #226).
 *
 * - Left: copyright with the current year and today's date. Both are derived
 *   from the client clock, so they roll over automatically (the date at local
 *   midnight, the year on January 1st) without a reload.
 * - Right: language switcher that changes the site language through
 *   `LanguageContext`.
 *
 * The date is read through `useSyncExternalStore` with a `null` server
 * snapshot: the server and the hydration render output no date, and the
 * client fills it in right after hydration, so the server/client clocks or
 * time zones can never cause a hydration mismatch.
 */

/** Local calendar day as `YYYY-MM-DD` — a stable, comparable snapshot. */
export function getTodayKey(now: Date = new Date()): string {
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseDayKey(key: string): Date {
  const [year, month, day] = key.split("-").map(Number);
  return new Date(year, month - 1, day);
}

/** Notify subscribers at every local midnight so the date/year re-render. */
function subscribeToDay(onChange: () => void) {
  let timer: ReturnType<typeof setTimeout>;
  const schedule = () => {
    const now = new Date();
    const nextMidnight = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
    );
    timer = setTimeout(() => {
      onChange();
      schedule();
    }, nextMidnight.getTime() - now.getTime());
  };
  schedule();
  return () => clearTimeout(timer);
}

function useTodayKey(): string | null {
  return useSyncExternalStore(
    subscribeToDay,
    () => getTodayKey(),
    () => null,
  );
}

/** Replace `{name}` placeholders in a dictionary string. */
function interpolate(template: string, values: Record<string, string>) {
  return template.replace(/\{(\w+)\}/g, (match, name: string) =>
    name in values ? values[name] : match,
  );
}

export function formatFooterDate(date: Date, language: Language): string {
  return new Intl.DateTimeFormat(language, { dateStyle: "long" }).format(date);
}

export function Footer() {
  const { language, setLanguage, dictionary, languages } = useLanguage();
  const { footer } = dictionary;
  const todayKey = useTodayKey();
  const today = todayKey ? parseDayKey(todayKey) : null;

  return (
    <footer className="mt-auto w-full border-t border-zinc-200 bg-white px-4 py-4 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-black dark:text-zinc-400">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <p data-testid="footer-copyright">
            {today
              ? interpolate(footer.copyright, {
                  year: String(today.getFullYear()),
                })
              : null}
          </p>
          <p>
            {today && todayKey ? (
              <time dateTime={todayKey} data-testid="footer-date">
                {interpolate(footer.currentDate, {
                  date: formatFooterDate(today, language),
                })}
              </time>
            ) : null}
          </p>
        </div>

        <div
          role="group"
          aria-label={footer.languageSwitcherLabel}
          className="ml-auto flex items-center gap-1"
          data-testid="language-switcher"
        >
          {languages.map((code) => {
            const active = code === language;
            return (
              <button
                key={code}
                type="button"
                lang={code}
                aria-pressed={active}
                onClick={() => setLanguage(code)}
                className={`cursor-pointer rounded-md px-3 py-1.5 font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 ${
                  active
                    ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                    : "hover:bg-zinc-100 dark:hover:bg-zinc-900"
                }`}
              >
                {footer.languages[code]}
              </button>
            );
          })}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
