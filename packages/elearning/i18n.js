import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            pt: {
                translation: require('./locales/pt.json'),
            },
            es: {
                translation: require('./locales/es.json'),
            },
            en: {
                translation: require('./locales/en.json'),
            },
        },
        fallbackLng: 'en', // si no se encuentra el idioma del navegador, utilizará portugués como idioma por defecto
        debug: true,
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;