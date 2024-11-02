import { useState } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Popover from "@mui/material/Popover";
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
import { Books } from "./constants";
import "./App.css";
import SelectorModal from "./SelectorModal";

const App = () => {
  const [bookJson, setBookJson] = useState<Paragraph[]>(
    Books[getSelectedBookCookie()] || []
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

  const closeModal = () => setIsModalOpen(false);

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

      <SelectorModal
        isModalOpen={isModalOpen}
        handleClose={closeModal}
        bookJson={bookJson}
        updateBookJson={updateBookJson}
        textLanguage={textLanguage}
        updateTextLanguage={updateTextLanguage}
        popUpLanguage={popUpLanguage}
        updatePopupLanguage={updatePopupLanguage}
        page={page}
        updatePage={updatePage}
      />

      {bookJson && textLanguage && popUpLanguage && (
        <>
          <span
            id="CardContentSpan"
            onClick={() => setShowPopover(!showPopover)}
          >
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
        </>
      )}
    </div>
  );
};

export default App;
