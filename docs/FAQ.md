# FAQ

## Hero section

### What does the hero section show?

A heading (the `title` prop) and, by default, the motivational text
«мотивація працювати руками і частіше гуляти» on an indigo-to-turquoise
gradient. See [components.md](./components.md#herosection) for the full API.

### Where is the motivational text stored?

In the language dictionaries under the `hero.motivation` key:
`src/locales/uk.json`, `src/locales/en.json` and `src/locales/de.json`.
Don't hard-code the copy in the component.

### How do I show the text in English or German?

The component falls back to the Ukrainian string. Pass the dictionary value
for another language explicitly:

```jsx
import en from "../locales/en.json";

<HeroSection title="Loopa" subtitle={en.hero.motivation} />
```

### How do I change the colours?

Edit the Tailwind utility classes on the `<section>` in
`src/components/HeroSection.jsx` (`bg-indigo-600 bg-gradient-to-br
from-indigo-600 to-cyan-500`, plus `bg-cyan-300` on the accent bar). CSS modules
are not used: `next.config` compiles every `.css` file as global, so the hero is
styled with Tailwind like `WelcomeBanner`. The tests check that the palette stays
indigo and turquoise, so update `src/components/__tests__/HeroSection.test.jsx`
if you move to shades outside the accepted list.

### Can I hide the subtitle?

Yes. Pass a falsy value: `<HeroSection title="…" subtitle={null} />`.

### How do I run the hero section tests?

```bash
npm run test
```

### Did the hero section require a database change?

No. It is a presentation-only component with no schema or API changes.

## Footer and language switcher

### What does the footer show?

On the left, a copyright line with the current year and today's date. On the
right, a language switcher (English, Українська, Deutsch). See
[components.md](./components.md#footer) for details.

### Do I need to update the year in the footer every January?

No. The year and date come from the visitor's clock. The footer re-renders at
local midnight, so the year changes on 1 January even if the page stays open.

### Why is the date missing in the page source / for a moment on load?

The date is left empty in the server-rendered HTML and added right after
hydration. This prevents hydration errors when the server and the visitor's
browser have different clocks or time zones.

### How does the language switcher work?

Clicking a language calls `setLanguage` from `LanguageContext`. Every
component that uses `useLanguage()` re-renders with the new dictionary, and
`<html lang>` is updated.

### Is the chosen language remembered?

Yes. It's saved in `localStorage` under `loopa.language` and restored on the
next visit. It's also synced across open tabs. If `localStorage` is blocked,
switching still works but resets to English after a reload.

### What is the default language?

English (`en`). The server always renders English. A saved choice is applied
right after the page loads.

### How do I translate my own component?

Make it a Client Component and read the dictionary from the context:

```tsx
"use client";

import { useLanguage } from "@/app/context/LanguageContext";

export function Greeting() {
  const { dictionary } = useLanguage();
  return <p>{dictionary.hero.motivation}</p>;
}
```

Add the new strings to every dictionary in `src/locales/`.

### Where are the footer strings?

Under the `footer` key in `src/locales/en.json`, `uk.json` and `de.json`.
`{year}` and `{date}` are placeholders filled in by the component.

### How do I add a new language?

Add a dictionary file, add its name under `footer.languages` in every
dictionary, and register it in `DICTIONARIES` in
`app/context/LanguageContext.tsx`. See
[components.md](./components.md#adding-a-language).

### How do I run the footer tests?

```bash
npm run test
```

### Did the footer require a database change?

No. The language choice is stored only in the browser; there are no schema or
API changes.
