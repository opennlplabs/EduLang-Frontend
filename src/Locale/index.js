import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

const resources = {
  en: {
    translation: require('./en.json'),
  },
  ps: {
    translation: require('./ps.json'),
  },
};

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources,
  lng: 'en',
  fallbackLng: ['es', 'ps'],
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
