import { useState } from "react";
import aliceInWonderland from "./translations/aliceInWonderland.json";
import theCantervilleGhost from "./translations/theCantervilleGhost.json";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import InputLabel from "@mui/material/InputLabel";
import Modal from "@mui/material/Modal";
import MenuItem from "@mui/material/MenuItem";
import Popover from "@mui/material/Popover";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {
  getSelectedBookCookie,
  getSelectedPageCookie,
  getSelectedPopupLanguageCookie,
  getSelectedTextLanguageCookie,
  setSelectedBookCookie,
  setSelectedPageCookie,
  setSelectedPopupLanguageCookie,
  setSelectedTextLanguageCookie,
} from "./cookies";
import { BookTitles, Language, Paragraph } from "./types";
import { Languages } from "./constants";
import "./App.css";


const Books = {
  "Alice in Wonderland": aliceInWonderland,
  "The Canterville Ghost": theCantervilleGhost,
};

const App = () => {
  const [bookJson, setBookJson] = useState<Paragraph[] | null>(
    Books[getSelectedBookCookie()] || null
  );
  const [page, setPage] = useState<number>(getSelectedPageCookie() || 0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [showPopover, setShowPopover] = useState<boolean>(false);
  const [textLanguage, setTextLanguage] = useState<Language | null>(
    getSelectedTextLanguageCookie() || null
  );
  const [popUpLanguage, setPopupLanguage] = useState<Language | null>(
    getSelectedPopupLanguageCookie() || null
  );

  const updateBookJson = (bookTitle: BookTitles) => {
    setBookJson(Books[bookTitle]);
    setSelectedBookCookie(bookTitle);
  };

  const updateTextLanguage = (language: Language) => {
    setTextLanguage(language);
    setSelectedTextLanguageCookie(language);
  };

  const updatePopupLanguage = (language: Language) => {
    setPopupLanguage(language);
    setSelectedPopupLanguageCookie(language);
  };

  const updatePage = (page: number) => {
    setPage(page);
    setSelectedPageCookie(page);
  };

  return (
    <div className="App">
      <Button
        variant="contained"
        className="ModalButton"
        onClick={() => setIsModalOpen(true)}
      >
        {!bookJson || !textLanguage || !popUpLanguage ? (
          <span>Select book and languages</span>
        ) : (
          <span>Change book or languages</span>
        )}
      </Button>
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="book-language-selector"
        aria-describedby="choose-language-and-books"
      >
        <Card>
          <CardContent>
            <div className="Modal__Chooser">
              <InputLabel id="book-select-label">Choose Book</InputLabel>
              <Select
                labelId="book-select-label"
                id="book-select"
                value={Object.keys(Books).find(
                  (key) => Books[key as BookTitles] === bookJson
                )}
                label="Age"
                onChange={(event: SelectChangeEvent) =>
                  updateBookJson(event.target.value as BookTitles)
                }
              >
                {Object.keys(Books).map((book) => (
                  <MenuItem value={book}>{book}</MenuItem>
                ))}
              </Select>
            </div>
            <div className="Modal__Chooser">
              <InputLabel id="book-language-select-label">Book Text</InputLabel>
              <Select
                labelId="book-language-select-label"
                id="book-language-select"
                value={textLanguage?.toString()}
                label="Age"
                onChange={(event: SelectChangeEvent) =>
                  updateTextLanguage(event.target.value as Language)
                }
              >
                {Languages.map((language) => (
                  <MenuItem value={language}>{language}</MenuItem>
                ))}
              </Select>
            </div>
            <div className="Modal__Chooser">
              <InputLabel id="popup-language-select-label">
                Popup Text
              </InputLabel>
              <Select
                labelId="popup-language-select-label"
                id="popup-language-select"
                value={popUpLanguage?.toString()}
                label="Age"
                onChange={(event: SelectChangeEvent) =>
                  updatePopupLanguage(event.target.value as Language)
                }
              >
                {Languages.map((language) => (
                  <MenuItem value={language}>{language}</MenuItem>
                ))}
              </Select>
            </div>

            {bookJson && (
              <div className="Modal__Chooser">
                <InputLabel id="current-page-label">Current Page</InputLabel>
                <TextField
                  id="current-page-input"
                  variant="outlined"
                  type="number"
                  value={page + 1}
                  onChange={(e) => {
                    const newPage = parseInt(e.target.value) - 1;
                    if (newPage > -1 && newPage <= bookJson.length)
                      setPage(newPage);
                  }}
                />
              </div>
            )}
          </CardContent>
        </Card>
      </Modal>

      {bookJson && textLanguage && popUpLanguage && (
        <span id="CardContentSpan" onClick={() => setShowPopover(!showPopover)}>
          <Card>
            <CardContent>
              <Typography variant="body2">
                {bookJson[page][textLanguage]}
              </Typography>
              <Popover
                id="translation-popover"
                open={showPopover}
                anchorEl={document.getElementById("CardContentSpan")}
                onClose={() => setShowPopover(false)}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                {bookJson[page][popUpLanguage]}
              </Popover>
            </CardContent>
          </Card>
        </span>
      )}

      {bookJson && textLanguage && popUpLanguage && (
        <div className="ButtonContainer">
          <Button
            variant="contained"
            onClick={() => updatePage(page - 1)}
            disabled={page === 0}
          >
            Previous Page
          </Button>
          <Button
            variant="contained"
            onClick={() => updatePage(page + 1)}
            disabled={!bookJson || bookJson.length === page}
          >
            Next Page
          </Button>
        </div>
      )}
    </div>
  );
};

export default App;
