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

Edit the custom properties (`--hero-indigo`, `--hero-indigo-light`,
`--hero-turquoise`, `--hero-turquoise-dark`) at the top of the `.hero` rule in
`src/styles/HeroSection.module.css`. The tests check that the palette stays
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
