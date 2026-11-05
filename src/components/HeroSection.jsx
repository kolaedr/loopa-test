import uk from "../locales/uk.json";

/** Default motivational copy, taken from the Ukrainian dictionary. */
export const HERO_MOTIVATION_TEXT = uk.hero.motivation;

/**
 * Hero section with the indigo & turquoise colour scheme (task #216).
 *
 * Styled with Tailwind utility classes (like WelcomeBanner) — CSS modules are
 * not supported here, since next.config compiles every .css file as global.
 * `mt-14` pushes the section below the fixed WelcomeBanner so it is never
 * covered by it.
 *
 * User-facing copy is passed in via props so it can be supplied from the
 * language dictionaries rather than hard-coded here. When no subtitle is
 * given, the motivational text from the dictionary is shown.
 *
 * @param {object} props
 * @param {import("react").ReactNode} props.title     Main heading text.
 * @param {import("react").ReactNode} [props.subtitle] Supporting text.
 *   Defaults to the motivational text (`hero.motivation`).
 * @param {import("react").ReactNode} [props.children] Optional actions (e.g. CTA buttons).
 */
export function HeroSection({
  title,
  subtitle = HERO_MOTIVATION_TEXT,
  children,
}) {
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
          {title}
        </h1>
        <span
          className="mx-auto my-6 block h-1 w-16 rounded-full bg-cyan-300"
          aria-hidden="true"
        />
        {subtitle ? (
          <p className="text-lg leading-relaxed text-white sm:text-xl">
            {subtitle}
          </p>
        ) : null}
        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </section>
  );
}

export default HeroSection;
