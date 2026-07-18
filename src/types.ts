import { LanguageKeys } from "./constants";

export type BookTitles = "Alice in Wonderland" | "The Canterville Ghost";

export type Language = (typeof LanguageKeys)[number];

export type Paragraph = {
  English: string;
  Spanish: string;
  French: string;
  German: string;
};
