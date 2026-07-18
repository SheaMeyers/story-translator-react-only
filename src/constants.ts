import aliceInWonderland from "./bookTranslations/aliceInWonderland.json";
import theCantervilleGhost from "./bookTranslations/theCantervilleGhost.json";

export const LanguageKeys = ["English", "Spanish", "French", "German"] as const;

export const Books = {
  "Alice in Wonderland": aliceInWonderland,
  "The Canterville Ghost": theCantervilleGhost,
};

export const getTranslatedLanguages = (t: (key: string) => string) => [
  { value: "English" as const, label: t("languages.english") },
  { value: "Spanish" as const, label: t("languages.spanish") },
  { value: "French" as const, label: t("languages.french") },
  { value: "German" as const, label: t("languages.german") },
];

export const getTranslatedBooks = (t: (key: string) => string) => [
  { value: "Alice in Wonderland" as const, label: t("books.aliceInWonderland") },
  { value: "The Canterville Ghost" as const, label: t("books.theCantervilleGhost") },
];