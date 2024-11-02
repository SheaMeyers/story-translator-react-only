import aliceInWonderland from "./translations/aliceInWonderland.json";
import theCantervilleGhost from "./translations/theCantervilleGhost.json";

export const Languages = ["English", "Spanish", "French", "German"] as const;

export const Books = {
    "Alice in Wonderland": aliceInWonderland,
    "The Canterville Ghost": theCantervilleGhost,
  };