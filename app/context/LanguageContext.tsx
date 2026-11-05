"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import de from "@/src/locales/de.json";
import en from "@/src/locales/en.json";
import uk from "@/src/locales/uk.json";

/**
 * Site language state (task #226).
 *
 * The selected language is persisted in `localStorage` under
 * `LANGUAGE_STORAGE_KEY`. It is read through `useSyncExternalStore`, so the
 * server render (and the first client render during hydration) always uses
 * `DEFAULT_LANGUAGE`, and the stored choice is applied right after hydration
 * without a hydration mismatch. Changes are also synced across browser tabs.
 */

export const DICTIONARIES = { en, uk, de } as const;

export type Language = keyof typeof DICTIONARIES;
export type Dictionary = (typeof DICTIONARIES)[Language];

export const SUPPORTED_LANGUAGES = Object.keys(DICTIONARIES) as Language[];
export const DEFAULT_LANGUAGE: Language = "en";
export const LANGUAGE_STORAGE_KEY = "loopa.language";

export function isLanguage(value: unknown): value is Language {
  return (
    typeof value === "string" &&
    (SUPPORTED_LANGUAGES as string[]).includes(value)
  );
}

// --- localStorage-backed external store ------------------------------------

const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key === null || event.key === LANGUAGE_STORAGE_KEY) listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function readStoredLanguage(): Language | null {
  try {
    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return isLanguage(stored) ? stored : null;
  } catch {
    // localStorage may be unavailable (privacy mode, disabled storage).
    return null;
  }
}

function writeStoredLanguage(language: Language) {
  try {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch {
    // Ignore: the choice just won't survive a reload.
  }
}

// --- Context ---------------------------------------------------------------

export interface LanguageContextValue {
  /** Currently selected language code. */
  language: Language;
  /** Switch the site language; the choice is persisted in localStorage. */
  setLanguage: (language: Language) => void;
  /** Dictionary for the current language. */
  dictionary: Dictionary;
  /** All languages the user can switch to. */
  languages: readonly Language[];
}

export const LanguageContext = createContext<LanguageContextValue | null>(
  null,
);

export interface LanguageProviderProps {
  children: ReactNode;
  /** Language used on the server and before a stored choice is read. */
  defaultLanguage?: Language;
}

export function LanguageProvider({
  children,
  defaultLanguage = DEFAULT_LANGUAGE,
}: LanguageProviderProps) {
  const language = useSyncExternalStore(
    subscribe,
    () => readStoredLanguage() ?? defaultLanguage,
    () => defaultLanguage,
  );

  const setLanguage = useCallback((next: Language) => {
    if (!isLanguage(next)) return;
    writeStoredLanguage(next);
    notify();
  }, []);

  // Keep <html lang> in sync for accessibility and SEO.
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
      dictionary: DICTIONARIES[language],
      languages: SUPPORTED_LANGUAGES,
    }),
    [language, setLanguage],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

/** Read the language state. Must be used inside `<LanguageProvider>`. */
export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
