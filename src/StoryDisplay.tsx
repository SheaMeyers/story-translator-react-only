import { useState } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import InputLabel from "@mui/material/InputLabel";
import Popover from "@mui/material/Popover";
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
  const [showPopover, setShowPopover] = useState<boolean>(false);
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

            setShowPopover(!showPopover)
        }}>
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
