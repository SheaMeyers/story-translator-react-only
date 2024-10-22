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
import Typography from '@mui/material/Typography'
import './App.css';

type BookTitles = 'Alice in Wonderland' | 'The Canterville Ghost'

const Books = {
  'Alice in Wonderland': aliceInWonderland,
  'The Canterville Ghost': theCantervilleGhost
}

const BookToBookTitle = {
  aliceInWonderland : 'Alice in Wonderland',
  theCantervilleGhost: 'The Canterville Ghost'
}


type Language = 'English' | 'Spanish' | 'French' | 'German'

type Paragraph = {
  English: string
  Spanish: string
  French: string
  German: string
}


const App = () => {
  const [bookJson, setBookJson] = useState<Paragraph[] | null>(null)
  const [page, setPage] = useState<number>(0)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [showPopover, setShowPopover] = useState<boolean>(false)
  const [textLanguage, setTextLanguage] = useState<Language | null>(null)
  const [popUpLanguage, setPopupLanguageLanguage] = useState<Language | null>(null)

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
              value='TODO How to get the book title from this?'
              label="Age"
              onChange={(event: SelectChangeEvent) => setBookJson(Books[event.target.value as BookTitles])}
            >
              {Object.keys(Books).map(book => <MenuItem value={book}>{book}</MenuItem>)}
            </Select>
            <InputLabel id="book-language-select-label">Book Text</InputLabel>
            <Select
              labelId="book-language-select-label"
              id="book-language-select"
              value={textLanguage?.toString()}
              label="Age"
              onChange={(event: SelectChangeEvent) => setTextLanguage(event.target.value as Language)}
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
              onChange={(event: SelectChangeEvent) => setPopupLanguageLanguage(event.target.value as Language)}
            >
              <MenuItem value='English'>English</MenuItem>
              <MenuItem value='Spanish'>Spanish</MenuItem>
              <MenuItem value='French'>French</MenuItem>
              <MenuItem value='German'>German</MenuItem>
            </Select>
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
        onClick={() => setPage(page-1)}
        disabled={page === 0}
      >Previous Page</Button>
      <Button 
        variant="contained" 
        onClick={() => setPage(page+1)}
        disabled={!bookJson || bookJson.length === page}
      >Next Page</Button>
    </div>
  );
}

export default App;
