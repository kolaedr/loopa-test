"use client";

import { useContext } from "react";
import { LanguageContext } from "@/app/context/LanguageContext";

/** Fallback text, used when rendered outside `<LanguageProvider>`. */
export const WELCOME_BANNER_TEXT = "Welcome to Work";

/**
 * Fixed welcome banner. The text follows the site language from
 * `LanguageContext` (`welcomeBanner.text`); outside a provider it falls back
 * to `WELCOME_BANNER_TEXT`.
 */
export function WelcomeBanner() {
  const context = useContext(LanguageContext);
  const text = context?.dictionary.welcomeBanner.text ?? WELCOME_BANNER_TEXT;

  return (
    <div
      role="banner"
      className="fixed inset-x-0 top-0 z-[9999] bg-blue-900 px-4 py-3 text-center text-lg font-semibold tracking-tight text-white shadow-md backdrop-blur"
    >
      {text}
    </div>
  );
}
