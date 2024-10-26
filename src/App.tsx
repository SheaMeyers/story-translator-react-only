import { useState } from 'react'
import aliceInWonderland from './translations/aliceInWonderland.json'
import theCantervilleGhost from './translations/theCantervilleGhost.json'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import InputLabel from '@mui/material/InputLabel'
import Modal from '@mui/material/Modal'
import MenuItem from '@mui/material/MenuItem'
import Popover from "@mui/material/Popover"
import Select, { SelectChangeEvent } from '@mui/material/Select'
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography'
import { 
  getSelectedBookCookie, 
  getSelectedPageCookie, 
  getSelectedPopupLanguageCookie, 
  getSelectedTextLanguageCookie, 
  setSelectedBookCookie, 
  setSelectedPageCookie, 
  setSelectedPopupLanguageCookie, 
  setSelectedTextLanguageCookie 
} from './cookies'
import './App.css';

type BookTitles = 'Alice in Wonderland' | 'The Canterville Ghost'

const Books = {
  'Alice in Wonderland': aliceInWonderland,
  'The Canterville Ghost': theCantervilleGhost
}

type Language = 'English' | 'Spanish' | 'French' | 'German'

type Paragraph = {
  English: string
  Spanish: string
  French: string
  German: string
}


const App = () => {
  const [bookJson, setBookJson] = useState<Paragraph[] | null>(Books[getSelectedBookCookie() as BookTitles] || null)
  const [page, setPage] = useState<number>(getSelectedPageCookie() || 0)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [showPopover, setShowPopover] = useState<boolean>(false)
  const [textLanguage, setTextLanguage] = useState<Language | null>(getSelectedTextLanguageCookie() as Language || null)
  const [popUpLanguage, setPopupLanguage] = useState<Language | null>(getSelectedPopupLanguageCookie() as Language || null)

  const updateBookJson = (bookTitle: BookTitles) => {
    setBookJson(Books[bookTitle])
    setSelectedBookCookie(bookTitle)
  }

  const updateTextLanguage = (language: Language) => {
    setTextLanguage(language)
    setSelectedTextLanguageCookie(language)
  }

  const updatePopupLanguage = (language: Language) => {
    setPopupLanguage(language)
    setSelectedPopupLanguageCookie(language)
  }

  const updatePage = (page: number) => {
    setPage(page)
    setSelectedPageCookie(page)
  }

  return (
    <div className="App">
      <h1>Story translator</h1>

      <Button variant="contained" onClick={() => setIsModalOpen(true)}>Open modal</Button>
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Card>
          <CardContent>
            <InputLabel id="book-select-label">Choose Book</InputLabel>
            <Select
              labelId="book-select-label"
              id="book-select"
              value={Object.keys(Books).find(key => Books[key as BookTitles] === bookJson)}
              label="Age"
              onChange={(event: SelectChangeEvent) => updateBookJson(event.target.value as BookTitles)}
            >
              {Object.keys(Books).map(book => <MenuItem value={book}>{book}</MenuItem>)}
            </Select>
            <InputLabel id="book-language-select-label">Book Text</InputLabel>
            <Select
              labelId="book-language-select-label"
              id="book-language-select"
              value={textLanguage?.toString()}
              label="Age"
              onChange={(event: SelectChangeEvent) => updateTextLanguage(event.target.value as Language)}
            >
              <MenuItem value='English'>English</MenuItem>
              <MenuItem value='Spanish'>Spanish</MenuItem>
              <MenuItem value='French'>French</MenuItem>
              <MenuItem value='German'>German</MenuItem>
            </Select>
            <InputLabel id="popup-language-select-label">Popup Text</InputLabel>
            <Select
              labelId="popup-language-select-label"
              id="popup-language-select"
              value={popUpLanguage?.toString()}
              label="Age"
              onChange={(event: SelectChangeEvent) => updatePopupLanguage(event.target.value as Language)}
            >
              <MenuItem value='English'>English</MenuItem>
              <MenuItem value='Spanish'>Spanish</MenuItem>
              <MenuItem value='French'>French</MenuItem>
              <MenuItem value='German'>German</MenuItem>
            </Select>

            {bookJson &&
              <>
                <InputLabel id="current-page-label">Current Page</InputLabel>
                <TextField 
                  id="current-page-input" 
                  label="Outlined" 
                  variant="outlined" 
                  type='number'
                  value={page+1}
                  onChange={(e) => {
                    const newPage = parseInt(e.target.value)-1
                    if (newPage > -1 && newPage <= bookJson.length)
                      setPage(newPage)
                  }}
                />
              </>
            }

          </CardContent>
        </Card>
      </Modal>

      {bookJson && textLanguage && popUpLanguage && 
      <>
        <Card>
          <CardContent>
            <span 
              id='card-content-span'
              onClick={() => setShowPopover(!showPopover)}
            >
              <Typography variant="body2">
                {bookJson[page][textLanguage]}
              </Typography>
              <Popover
                id='translation-popover'
                open={showPopover}
                anchorEl={document.getElementById('card-content-span')}
                onClose={() => setShowPopover(false)}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                {bookJson[page][popUpLanguage]}
              </Popover>
            </span>
          </CardContent>
        </Card>
      </>
      }
      <Button 
        variant="contained" 
        onClick={() => updatePage(page-1)}
        disabled={page === 0}
      >Previous Page</Button>
      <Button 
        variant="contained" 
        onClick={() => updatePage(page+1)}
        disabled={!bookJson || bookJson.length === page}
      >Next Page</Button>
    </div>
  );
}

export default App;
