import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import { Language, Paragraph } from "./types";
import "./StoryDisplay.css";
import { setHideHelpTextCookie, getHideHelpTextCookie } from "./cookies";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const [showTranslation, setShowTranslation] = useState<boolean>(false);
  const [hideHelpText, setHideHelpText] = useState<boolean>(getHideHelpTextCookie());

  const updateHideHelpText = (shouldShowHelpText: boolean) => {
    setHideHelpText(shouldShowHelpText);
    setHideHelpTextCookie(shouldShowHelpText);
  };

  const goToPage = (nextPage: number) => {
    setShowTranslation(false);
    updatePage(nextPage);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft" && page > 0) {
        event.preventDefault();
        goToPage(page - 1);
      }

      if (event.key === "ArrowRight" && bookJson.length > page) {
        event.preventDefault();
        goToPage(page + 1);
      }

      if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        event.preventDefault();
        setShowTranslation((current) => !current);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [bookJson.length, page, updatePage]);

  return (
    <>
      <span>
        {!hideHelpText &&
            <InputLabel id="TranslationHelpText">
                {t('story.helpText')}
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
          onClick={() => goToPage(page - 1)}
          disabled={page === 0}
        >
          {t('story.previous')}
        </Button>
        <Button
          variant="contained"
          onClick={() => goToPage(page + 1)}
          disabled={!bookJson || bookJson.length === page}
        >
          {t('story.next')}
        </Button>
      </div>
    </>
  );
};

export default StoryDisplay;
