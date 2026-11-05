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
