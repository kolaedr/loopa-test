"use client";

import { useContext } from "react";
import { LanguageContext } from "../../app/context/LanguageContext";
import uk from "../locales/uk.json";

export const AUTUMN_CARDS_DEFAULTS = uk.autumnCards;

export function AutumnCards() {
  const context = useContext(LanguageContext);
  const cards = context?.dictionary.autumnCards ?? AUTUMN_CARDS_DEFAULTS;

  const cardData = [
    {
      title: cards.card1Title,
      description: cards.card1Description,
      icon: "🍂",
    },
    {
      title: cards.card2Title,
      description: cards.card2Description,
      icon: "🌾",
    },
    {
      title: cards.card3Title,
      description: cards.card3Description,
      icon: "☕",
    },
  ];

  return (
    <section
      className="w-full bg-white px-6 py-16 sm:py-24"
      data-testid="autumn-cards-section"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 md:grid-cols-3">
          {cardData.map((card, index) => (
            <div
              key={index}
              className="flex flex-col items-center rounded-lg border border-gray-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
              data-testid={`autumn-card-${index + 1}`}
            >
              <div
                className="mb-4 text-5xl"
                aria-hidden="true"
              >
                {card.icon}
              </div>
              <h3 className="mb-3 text-center text-xl font-semibold text-gray-800">
                {card.title}
              </h3>
              <p className="text-center text-gray-600 leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AutumnCards;
