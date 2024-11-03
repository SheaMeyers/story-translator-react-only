import { useState } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { Language, Paragraph } from "./types";
import "./StoryDisplay.css";

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

    return (
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
    )
}

export default StoryDisplay;
