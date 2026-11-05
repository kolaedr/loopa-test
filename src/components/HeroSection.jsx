import styles from "../styles/HeroSection.module.css";

/**
 * Hero section with the indigo & turquoise colour scheme (task #216).
 *
 * User-facing copy is passed in via props so it can be supplied from the
 * language dictionaries rather than hard-coded here.
 *
 * @param {object} props
 * @param {import("react").ReactNode} props.title     Main heading text.
 * @param {import("react").ReactNode} [props.subtitle] Supporting text, rendered in turquoise.
 * @param {import("react").ReactNode} [props.children] Optional actions (e.g. CTA buttons).
 */
export function HeroSection({ title, subtitle, children }) {
  return (
    <section
      className={styles.hero}
      aria-labelledby="hero-section-title"
      data-testid="hero-section"
    >
      <div className={styles.content}>
        <h1 id="hero-section-title" className={styles.title}>
          {title}
        </h1>
        <span className={styles.accent} aria-hidden="true" />
        {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
        {children ? <div className={styles.actions}>{children}</div> : null}
      </div>
    </section>
  );
}

export default HeroSection;
