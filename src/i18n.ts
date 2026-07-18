import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const supportedLanguages = ['en', 'es', 'fr', 'de'];
const userLanguage = navigator.language || navigator.languages?.[0] || 'en';
const normalizedLanguage = userLanguage.split('-')[0];
// const initialLanguage = supportedLanguages.includes(normalizedLanguage)
//   ? normalizedLanguage
//   : 'en';
const initialLanguage = 'es'


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
      languages: {
        english: 'English',
        spanish: 'Spanish',
        french: 'French',
        german: 'German',
      },
      books: {
        aliceInWonderland: 'Alice in Wonderland',
        theCantervilleGhost: 'The Canterville Ghost',
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
      languages: {
        english: 'Inglés',
        spanish: 'Español',
        french: 'Francés',
        german: 'Alemán',
      },
      books: {
        aliceInWonderland: 'Alicia en el país de las maravillas',
        theCantervilleGhost: 'El Fantasma de Canterville',
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
      languages: {
        english: 'Anglais',
        spanish: 'Espagnol',
        french: 'Français',
        german: 'Allemand',
      },
      books: {
        aliceInWonderland: 'Les Aventures d\'Alice au pays des merveilles',
        theCantervilleGhost: 'Le Fantôme de Canterville',
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
      languages: {
        english: 'Englisch',
        spanish: 'Spanisch',
        french: 'Französisch',
        german: 'Deutsch',
      },
      books: {
        aliceInWonderland: 'Alice\'s Abenteuer im Wunderland',
        theCantervilleGhost: 'Das Gespenst von Canterville',
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
