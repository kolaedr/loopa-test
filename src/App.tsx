import React from 'react';
import { LanguageProvider, useLanguage } from './LanguageProvider';
import { Welcome, Settings } from './components';

const App: React.FC = () => {
  const { language } = useLanguage();

  return (
    <LanguageProvider>
      <div style={{ fontFamily: 'Arial, sans-serif' }}>
        <h1>{language === 'en' ? 'Welcome' : 'Добро пожаловать'}</h1>
        <button onClick={() => setLanguage(language === 'en' ? 'ru' : 'en')}>{language === 'en' ? 'Switch to Russian' : 'Перейти на английский'}</button>
        <Welcome />
        <Settings />
      </div>
    </LanguageProvider>
  );
};

export default App;
