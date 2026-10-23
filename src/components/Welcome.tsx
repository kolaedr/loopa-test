import React from 'react';
import { useLanguage } from '../LanguageProvider';

const Welcome: React.FC = () => {
  const { language } = useLanguage();

  return (
    <p>{language === 'en' ? 'Welcome to our app!' : 'Добро пожаловать в наш приложение!'}</p>
  );
};

export default Welcome;
