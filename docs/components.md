# Components

## HeroSection

Hero banner with an indigo & turquoise colour scheme (task #216).

- Component: `src/components/HeroSection.jsx`
- Styles: Tailwind utility classes in the component (no CSS module — `next.config`
  compiles every `.css` file as global)
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

## Footer

Site footer with the current date and a language switcher (task #226).

- Component: `app/components/footer.tsx` (Client Component)
- Language state: `app/context/LanguageContext.tsx` (`LanguageProvider`, `useLanguage`)
- Providers wrapper: `app/providers.tsx`
- Tests: `app/components/footer.test.tsx`, `app/context/LanguageContext.test.tsx`

### Usage

The footer is already rendered on every page by `RootLayout` (`app/layout.tsx`),
so you don't need to add it to pages:

```tsx
<body className="min-h-full flex flex-col">
  <Providers>
    {children}
    <Footer />
  </Providers>
</body>
```

`Footer` takes no props. It calls `useLanguage()`, so it must be rendered
inside `<LanguageProvider>` (or `<Providers>`). Outside a provider it throws
`useLanguage must be used within a LanguageProvider`.

### Layout

- **Left:** copyright line with the current year and today's date.
- **Right:** language switcher (`ml-auto` inside a `justify-between` flex row).
  On narrow screens the row wraps and the switcher stays right-aligned.
- The `<body>` is a flex column and the footer has `mt-auto`, so it sits at
  the bottom of short pages.

### Current date

- The year and date come from the browser clock, nothing is hard-coded. At
  every local midnight a timer re-renders the footer, so the date changes daily
  and the year changes on 1 January without a reload.
- The date is formatted with `Intl.DateTimeFormat(language, { dateStyle: "long" })`
  in the selected language, and rendered as `<time dateTime="YYYY-MM-DD">`.
- On the server (and during hydration) the year and date are empty. They
  appear right after hydration. This avoids hydration mismatches caused by
  different server/client clocks or time zones.
- Exported helpers: `getTodayKey(date?)` returns the local day as `YYYY-MM-DD`;
  `formatFooterDate(date, language)` returns the localised date string.

### Language switcher

- One button per supported language (`en`, `uk`, `de`), grouped in
  `role="group"` with the localised `footer.languageSwitcherLabel` as its
  accessible name.
- The active language has `aria-pressed="true"`. Each button has a `lang`
  attribute matching the language it switches to.
- Clicking a button calls `setLanguage(code)`. The new language applies to
  every component that uses `useLanguage()`.

### Language state (`LanguageContext`)

`useLanguage()` returns:

| Field         | Type                         | Description                                  |
| ------------- | ---------------------------- | -------------------------------------------- |
| `language`    | `"en" \| "uk" \| "de"`       | Currently selected language.                 |
| `setLanguage` | `(language) => void`         | Switch language; unsupported codes are ignored. |
| `dictionary`  | dictionary object            | The JSON dictionary for `language`.          |
| `languages`   | `readonly Language[]`        | All languages the user can switch to.        |

Behaviour:

- The default language is `en` (`DEFAULT_LANGUAGE`). `LanguageProvider`
  accepts an optional `defaultLanguage` prop to override it.
- The choice is saved in `localStorage` under `loopa.language`
  (`LANGUAGE_STORAGE_KEY`) and restored on the next visit. Invalid stored
  values are ignored. If `localStorage` is unavailable, switching still works
  but isn't remembered after a reload.
- The server always renders the default language; a stored choice is applied
  right after hydration.
- The choice is synced across open browser tabs.
- `<html lang>` is updated to the selected language.

Other exports: `DICTIONARIES`, `SUPPORTED_LANGUAGES`, `isLanguage(value)`,
and the `Language` / `Dictionary` types.

### Localisation

Footer strings live under the `footer` key in every language dictionary
(`src/locales/en.json`, `uk.json`, `de.json`):

| Key                              | en                                    | Placeholders |
| -------------------------------- | ------------------------------------- | ------------ |
| `footer.copyright`               | © {year} Loopa. All rights reserved.  | `{year}`     |
| `footer.currentDate`             | Today is {date}                       | `{date}`     |
| `footer.languageSwitcherLabel`   | Select language                       | —            |
| `footer.languages.{en,uk,de}`    | English / Українська / Deutsch        | —            |

Language names are written in their own language and are the same in every
dictionary.

### Adding a language

1. Create `src/locales/<code>.json` with the same keys as `en.json`,
   including `footer.*`.
2. Add `footer.languages.<code>` to **every** dictionary.
3. Import the dictionary and add it to `DICTIONARIES` in
   `app/context/LanguageContext.tsx`. The switcher picks it up automatically.
4. Run `npm run test`.

### Accessibility

- Rendered as `<footer>` (landmark role `contentinfo`).
- Switcher buttons are native `<button>`s, reachable with the keyboard, with a
  visible focus outline.
- Test ids: `footer-copyright`, `footer-date`, `language-switcher`.
