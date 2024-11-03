import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import InputLabel from "@mui/material/InputLabel";
import Modal from "@mui/material/Modal";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { BookTitles, Language, Paragraph } from "./types";
import { Books, Languages } from "./constants";
import "./SelectorModal.css";

type SelectorModalProps = {
  isModalOpen: boolean;
  handleClose: () => void;
  bookJson: Paragraph[];
  updateBookJson: (value: BookTitles) => void;
  textLanguage: Language | null;
  updateTextLanguage: (value: Language) => void;
  popUpLanguage: Language | null;
  updatePopupLanguage: (value: Language) => void;
  page: number;
  updatePage: (value: number) => void;
};

const SelectorModal = ({
  isModalOpen,
  handleClose,
  bookJson,
  updateBookJson,
  textLanguage,
  updateTextLanguage,
  popUpLanguage,
  updatePopupLanguage,
  page,
  updatePage,
}: SelectorModalProps) => (
  <Modal
    open={isModalOpen}
    onClose={handleClose}
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
              <MenuItem key={book} value={book}>{book}</MenuItem>
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
              <MenuItem key={`${language}-book`} value={language}>{language}</MenuItem>
            ))}
          </Select>
        </div>
        <div className="Modal__Chooser">
          <InputLabel id="popup-language-select-label">Popup Text</InputLabel>
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
              <MenuItem key={`${language}-pop`} value={language}>{language}</MenuItem>
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
                  updatePage(newPage);
              }}
            />
          </div>
        )}
      </CardContent>
    </Card>
  </Modal>
);

export default SelectorModal;
