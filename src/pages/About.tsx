import React from 'react';
import { useLanguage } from '../LanguageProvider';
import AboutTeam from './AboutTeam';

const About = () => {
  const { language } = useLanguage();

  const titles = {
    en: 'About Us',
    uk: 'Про нас',
    ru: 'О нас'
  };

  const teamLabel = {
    en: 'Team',
    uk: 'Команда',
    ru: 'Команда'
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {titles[language as keyof typeof titles] || titles.en}
        </h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-8">
          {teamLabel[language as keyof typeof teamLabel] || teamLabel.en}
        </h2>
        <AboutTeam />
      </div>
    </div>
  );
};

export default About;