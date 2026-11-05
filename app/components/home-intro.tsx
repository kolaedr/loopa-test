"use client";

import { useContext } from "react";
import { DICTIONARIES, DEFAULT_LANGUAGE, LanguageContext } from "@/app/context/LanguageContext";

/**
 * Home page `<main>` content. Texts (`home.title`, `home.description`) follow
 * the site language from `LanguageContext`; outside a provider the default
 * language dictionary is used.
 */
export function HomeIntro() {
  const { home } =
    useContext(LanguageContext)?.dictionary ?? DICTIONARIES[DEFAULT_LANGUAGE];

  return (
    <main className="flex flex-1 items-center justify-center p-8">
      <div className="max-w-lg text-center">
        <h1 className="text-3xl font-semibold tracking-tight">{home.title}</h1>
        <p className="mt-3 text-zinc-600 dark:text-zinc-400">
          {home.description}
        </p>
      </div>
    </main>
  );
}

export default HomeIntro;
