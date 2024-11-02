import { Languages } from "./constants";

export type BookTitles = "Alice in Wonderland" | "The Canterville Ghost";

export type Language = (typeof Languages)[number];

export type Paragraph = {
  English: string;
  Spanish: string;
  French: string;
  German: string;
};
