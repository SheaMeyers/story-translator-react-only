import { useState } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import { Language, Paragraph } from "./types";
import "./StoryDisplay.css";
import { setHideHelpTextCookie, getHideHelpTextCookie } from "./cookies";

type StoryDisplayProps = {
  bookJson: Paragraph[];
  textLanguage: Language;
  popUpLanguage: Language;
  page: number;
  updatePage: (value: number) => void;
};

const StoryDisplay = ({
  bookJson,
  textLanguage,
  popUpLanguage,
  page,
  updatePage,
}: StoryDisplayProps) => {
  const [showTranslation, setShowTranslation] = useState<boolean>(false);
  const [hideHelpText, setHideHelpText] = useState<boolean>(getHideHelpTextCookie());

  const updateHideHelpText = (shouldShowHelpText: boolean) => {
    setHideHelpText(shouldShowHelpText);
    setHideHelpTextCookie(shouldShowHelpText);
  };

  return (
    <>
      <span>
        {!hideHelpText &&
            <InputLabel id="TranslationHelpText">
                Click text below to show translation
            </InputLabel>
        }
        <span id="CardContentSpan" onClick={() => {
            if (!hideHelpText) updateHideHelpText(true)

            setShowTranslation((current) => !current)
        }}>
          <div className="StoryDisplay__Layout">
            <Card className="StoryDisplay__TextCard">
              <CardContent>
                <Typography variant="body2">
                  {bookJson[page][textLanguage]}
                </Typography>
              </CardContent>
            </Card>
            {showTranslation && (
              <Card className="StoryDisplay__TranslationCard">
                <button
                  type="button"
                  className="StoryDisplay__CloseButton"
                  aria-label="Close translation"
                  onClick={(event) => {
                    event.stopPropagation();
                    setShowTranslation(false);
                  }}
                >
                  ×
                </button>
                <CardContent>
                  <Typography variant="body2">
                    {bookJson[page][popUpLanguage]}
                  </Typography>
                </CardContent>
              </Card>
            )}
          </div>
        </span>
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
  );
};

export default StoryDisplay;
