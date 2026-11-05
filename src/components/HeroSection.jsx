"use client";

import { useContext } from "react";
import { LanguageContext } from "../../app/context/LanguageContext";
import uk from "../locales/uk.json";

/**
 * Default motivational copy, taken from the Ukrainian dictionary. Used only
 * when the section is rendered outside `<LanguageProvider>`.
 */
export const HERO_MOTIVATION_TEXT = uk.hero.motivation;

/** Default heading, used outside `<LanguageProvider>`. */
export const HERO_TITLE_TEXT = uk.hero.title;

/**
 * Hero section with the indigo & turquoise colour scheme (task #216).
 *
 * Styled with Tailwind utility classes (like WelcomeBanner) — CSS modules are
 * not supported here, since next.config compiles every .css file as global.
 * `mt-14` pushes the section below the fixed WelcomeBanner so it is never
 * covered by it.
 *
 * User-facing copy comes from the language dictionaries (task #226): when a
 * prop is not given, the text is read from the current language in
 * `LanguageContext` (`hero.title` / `hero.motivation`), so it changes with
 * the footer language switcher. Outside a provider the Ukrainian defaults
 * are used. Explicit props always win.
 *
 * @param {object} props
 * @param {import("react").ReactNode} [props.title]    Main heading text.
 *   Defaults to `hero.title` of the current language.
 * @param {import("react").ReactNode} [props.subtitle] Supporting text.
 *   Defaults to the motivational text (`hero.motivation`).
 * @param {import("react").ReactNode} [props.children] Optional actions (e.g. CTA buttons).
 */
export function HeroSection({ title, subtitle, children }) {
  const hero = useContext(LanguageContext)?.dictionary.hero;
  const heading = title === undefined ? (hero?.title ?? HERO_TITLE_TEXT) : title;
  const text =
    subtitle === undefined
      ? (hero?.motivation ?? HERO_MOTIVATION_TEXT)
      : subtitle;

  return (
    <section
      className="mt-14 flex min-h-[60vh] w-full items-center justify-center bg-indigo-600 bg-gradient-to-br from-indigo-600 to-cyan-500 px-6 py-24 text-center text-white"
      aria-labelledby="hero-section-title"
      data-testid="hero-section"
    >
      <div className="max-w-3xl">
        <h1
          id="hero-section-title"
          className="text-4xl font-bold tracking-tight sm:text-5xl"
        >
          {heading}
        </h1>
        <span
          className="mx-auto my-6 block h-1 w-16 rounded-full bg-cyan-300"
          aria-hidden="true"
        />
        {text ? (
          <p className="text-lg leading-relaxed text-white sm:text-xl">
            {text}
          </p>
        ) : null}
        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </section>
  );
}

export default HeroSection;
