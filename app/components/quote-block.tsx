"use client";

import { useContext } from "react";
import { DICTIONARIES, DEFAULT_LANGUAGE, LanguageContext } from "@/app/context/LanguageContext";

/**
 * Quote block component displayed below AutumnCards on the home page.
 * Shows a Latin quote with localized translation below it.
 */
export function QuoteBlock() {
  const { quoteBlock } =
    useContext(LanguageContext)?.dictionary ?? DICTIONARIES[DEFAULT_LANGUAGE];

  return (
    <section
      className="w-full bg-gradient-to-b from-blue-900 to-blue-600 px-6 py-16 sm:py-20"
      data-testid="quote-block-section"
    >
      <div className="mx-auto max-w-2xl">
        <blockquote className="text-center">
          <p
            className="mb-4 text-lg font-semibold italic text-blue-50"
            data-testid="quote-latin"
          >
            &ldquo;{quoteBlock.latin}&rdquo;
          </p>
          <p
            className="text-base text-blue-100"
            data-testid="quote-translation"
          >
            {quoteBlock.translation}
          </p>
        </blockquote>
      </div>
    </section>
  );
}

export default QuoteBlock;
