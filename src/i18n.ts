import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const supportedLanguages = ['en', 'es', 'fr', 'de'];
const userLanguage = navigator.language || navigator.languages?.[0] || 'en';
const normalizedLanguage = userLanguage.split('-')[0];
const initialLanguage = supportedLanguages.includes(normalizedLanguage)
  ? normalizedLanguage
  : 'en';


const resources = {
  en: {
    translation: {
      story: {
        helpText: 'Click text below to show translation',
        previous: 'Previous',
        next: 'Next',
        closeTranslation: 'Close translation',
      },
      modal: {
        chooseBook: 'Choose Book',
        bookText: 'Book Text',
        translatedText: 'Translated Text',
        currentPage: 'Current Page',
      },
      app: {
        selectBookAndLanguages: 'Select book and languages',
        changeBookOrLanguages: 'Change book or languages',
      },
    },
  },
  es: {
    translation: {
      story: {
        helpText: 'Haz clic en el texto de abajo para mostrar la traducción',
        previous: 'Anterior',
        next: 'Siguiente',
        closeTranslation: 'Cerrar traducción',
      },
      modal: {
        chooseBook: 'Elegir libro',
        bookText: 'Texto del libro',
        translatedText: 'Texto traducido',
        currentPage: 'Página actual',
      },
      app: {
        selectBookAndLanguages: 'Selecciona un libro y los idiomas',
        changeBookOrLanguages: 'Cambiar libro o idiomas',
      },
    },
  },
  fr: {
    translation: {
      story: {
        helpText: 'Cliquez sur le texte ci-dessous pour afficher la traduction',
        previous: 'Précédent',
        next: 'Suivant',
        closeTranslation: 'Fermer la traduction',
      },
      modal: {
        chooseBook: 'Choisir un livre',
        bookText: 'Texte du livre',
        translatedText: 'Texte traduit',
        currentPage: 'Page actuelle',
      },
      app: {
        selectBookAndLanguages: 'Sélectionnez un livre et les langues',
        changeBookOrLanguages: 'Changer de livre ou de langues',
      },
    },
  },
  de: {
    translation: {
      story: {
        helpText: 'Klicken Sie auf den Text unten, um die Übersetzung anzuzeigen',
        previous: 'Zurück',
        next: 'Weiter',
        closeTranslation: 'Übersetzung schließen',
      },
      modal: {
        chooseBook: 'Buch auswählen',
        bookText: 'Buchtext',
        translatedText: 'Übersetzter Text',
        currentPage: 'Aktuelle Seite',
      },
      app: {
        selectBookAndLanguages: 'Buch und Sprachen auswählen',
        changeBookOrLanguages: 'Buch oder Sprachen ändern',
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: initialLanguage,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
