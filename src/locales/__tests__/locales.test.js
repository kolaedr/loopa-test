import { describe, expect, it } from "vitest";
import uk from "../uk.json";
import en from "../en.json";
import de from "../de.json";

const DICTIONARIES = { en, uk, de };

/** Flatten a nested dictionary into `{ "a.b.c": value }`. */
function flatten(object, prefix = "") {
  return Object.entries(object).reduce((acc, [key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === "object") {
      Object.assign(acc, flatten(value, path));
    } else {
      acc[path] = value;
    }
    return acc;
  }, {});
}

const flat = Object.fromEntries(
  Object.entries(DICTIONARIES).map(([lang, dict]) => [lang, flatten(dict)]),
);
const referenceKeys = Object.keys(flat.en).sort();

describe("locale dictionaries", () => {
  it.each(Object.keys(DICTIONARIES))(
    "%s has exactly the same keys as en",
    (lang) => {
      expect(Object.keys(flat[lang]).sort()).toEqual(referenceKeys);
    },
  );

  it.each(Object.keys(DICTIONARIES))(
    "%s has only non-empty string values",
    (lang) => {
      for (const [key, value] of Object.entries(flat[lang])) {
        expect(typeof value, key).toBe("string");
        expect(value.trim(), key).not.toBe("");
      }
    },
  );

  it.each(["welcomeBanner.text", "hero.title", "home.title", "home.description"])(
    "provides %s in every language",
    (key) => {
      for (const lang of Object.keys(DICTIONARIES)) {
        expect(flat[lang][key], `${lang}:${key}`).toBeTruthy();
      }
    },
  );

  it("translates the page copy (not just copies English)", () => {
    for (const key of ["welcomeBanner.text", "home.description"]) {
      expect(flat.uk[key]).not.toBe(flat.en[key]);
      expect(flat.de[key]).not.toBe(flat.en[key]);
    }
  });

  it("keeps the {year} and {date} placeholders in every language", () => {
    for (const lang of Object.keys(DICTIONARIES)) {
      expect(flat[lang]["footer.copyright"]).toContain("{year}");
      expect(flat[lang]["footer.currentDate"]).toContain("{date}");
    }
  });
});
