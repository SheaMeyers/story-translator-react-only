import { useState } from "react";
import Button from "@mui/material/Button";
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
import SelectorModal from "./SelectorModal";
import StoryDisplay from "./StoryDisplay";
import "./App.css";

const App = () => {
  const [bookJson, setBookJson] = useState<Paragraph[]>(
    Books[getSelectedBookCookie()] || []
  );
  const [page, setPage] = useState<number>(getSelectedPageCookie() || 0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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
        <StoryDisplay
          bookJson={bookJson}
          textLanguage={textLanguage}
          popUpLanguage={popUpLanguage}
          page={page}
          updatePage={updatePage}
        />
      )}
    </div>
  );
};

export default App;
