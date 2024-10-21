import { useState } from 'react';
import aliceInWonderland from './translations/aliceInWonderland.json';
import theCantervilleGhost from './translations/theCantervilleGhost.json';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
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
        <Card>
          <CardContent>
            <Typography variant="body2">
              {bookJson[page][textLanguage]}
            </Typography>
          </CardContent>
        </Card>
        {/* <p>Text Language: {bookJson[page][textLanguage]}</p>
        <p>Popup Language: {bookJson[page][popUpLanguage]}</p> */}
      </>
      }
      <Button 
        variant="contained" 
        onClick={() => setPage(page-1)}
        disabled={page === 0}
      >Previous Page</Button>
      <Button 
        variant="contained" 
        onClick={() => setPage(page+1)}
        disabled={bookJson.length === page}
      >Next Page</Button>
    </div>
  );
}

export default App;
