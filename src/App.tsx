import { useState } from 'react';
import aliceInWonderland from './translations/aliceInWonderland.json';
import theCantervilleGhost from './translations/theCantervilleGhost.json';
import './App.css';

type Book = {
  title: 'Alice in Wonderland',
  file: 'aliceInWonderland'
} | {
  title: 'The Canterville Ghost',
  file: 'theCantervilleGhost'
}


type Language = 'English' | 'Spanish' | 'French' | 'German'

type Paragraph = {
  English: string
  Spanish: string
  French: string
  German: string
}


const App = () => {
  const [bookJson, setBookJson] = useState<Paragraph[]>(aliceInWonderland)
  const [page, setPage] = useState<number>(0)
  const [textLanguage, setTextLanguage] = useState<Language | null>('English')
  const [popUpLanguage, setPopupLanguageLanguage] = useState<Language | null>('French')
  

  return (
    <div className="App">
      <h1>Story translator</h1>
      {textLanguage && popUpLanguage && 
      <>
        <p>Text Language: {bookJson[page][textLanguage]}</p>
        <p>Popup Language: {bookJson[page][popUpLanguage]}</p>
      </>
      }
    </div>
  );
}

export default App;
