import React, { createContext, useContext, useState } from 'react';
import en from '../locales/en.json';
import ru from '../locales/ru.json';

const LanguageContext = createContext<{ language: string; setLanguage: (lang: string) => void }>({ language: 'en', setLanguage: () => {} });

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const value = { language, setLanguage };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
