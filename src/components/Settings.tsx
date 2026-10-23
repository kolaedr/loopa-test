import React from 'react';
import { useLanguage } from '../LanguageProvider';

const Settings: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div>
      <h2>{language === 'en' ? 'Settings' : 'Настройки'}</h2>
      <p>{language === 'en' ? 'Here you can change your settings.' : 'Здесь вы можете изменить настройки.'}</p>
    </div>
  );
};

export default Settings;
