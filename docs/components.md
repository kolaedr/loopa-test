# Components

## HeroSection

Hero banner with an indigo & turquoise colour scheme (task #216).

- Component: `src/components/HeroSection.jsx`
- Styles: `src/styles/HeroSection.module.css` (CSS module)
- Tests: `src/components/__tests__/HeroSection.test.jsx`

### Usage

```jsx
import { HeroSection } from "@/src/components/HeroSection"; // or a relative path

<HeroSection title="Loopa">
  <a href="/start">Почати</a>
</HeroSection>
```

### Props

| Prop       | Type        | Required | Default                       | Description                                         |
| ---------- | ----------- | -------- | ----------------------------- | --------------------------------------------------- |
| `title`    | `ReactNode` | yes      | —                             | Main heading, rendered as `<h1>`.                   |
| `subtitle` | `ReactNode` | no       | `hero.motivation` (uk)        | Supporting text in turquoise. Pass a falsy value to hide it. |
| `children` | `ReactNode` | no       | —                             | Optional actions (e.g. CTA buttons), placed below the subtitle. |

The module also exports `HERO_MOTIVATION_TEXT`, the default subtitle
(`uk.hero.motivation` = «мотивація працювати руками і частіше гуляти»).

### Localisation

The motivational copy lives under the `hero.motivation` key in every language
dictionary:

| File                  | Value                                                                  |
| --------------------- | ---------------------------------------------------------------------- |
| `src/locales/uk.json` | мотивація працювати руками і частіше гуляти                            |
| `src/locales/en.json` | motivation to work with your hands and go for walks more often         |
| `src/locales/de.json` | Motivation, mit den Händen zu arbeiten und öfter spazieren zu gehen    |

The component defaults to the Ukrainian string. For other languages pass the
dictionary value as `subtitle`, e.g. `<HeroSection title="…" subtitle={en.hero.motivation} />`.
When adding a new language, add `hero.motivation` to its dictionary and add the
dictionary to the "every language dictionary" test in `HeroSection.test.jsx`,
which checks a fixed list (`uk`, `en`, `de`).

### Colour scheme

Palette values are CSS custom properties declared on `.hero`, so they can be
changed in one place:

| Custom property         | Value     | Used for                                  |
| ----------------------- | --------- | ----------------------------------------- |
| `--hero-indigo`         | `#4b0082` | Background base, gradient start           |
| `--hero-indigo-light`   | `#4f46e5` | Gradient middle stop                      |
| `--hero-turquoise-dark` | `#0d9488` | Gradient stop                             |
| `--hero-turquoise`      | `#40e0d0` | Gradient end, accent bar, subtitle text   |
| `--hero-text`           | `#ffffff` | Heading text                              |

The background is a 135° linear gradient from indigo to turquoise. These hex
values are placeholders until design confirms the exact colours. If you change
them, keep them within the indigo/turquoise ranges the tests accept (see
`INDIGO` / `TURQUOISE` in the test file), or update the tests too.

### Accessibility

- Rendered as a `<section>` labelled by its heading (`aria-labelledby="hero-section-title"`).
- The decorative accent bar is `aria-hidden`.
- `data-testid="hero-section"` is available for tests.
- Only render one `HeroSection` per page: it uses a fixed heading `id`.
