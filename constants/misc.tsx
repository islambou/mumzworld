import { Language, Location } from "../types/misc";

export const LANGUAGE_FLAGS: Record<Language, string> = {
  [Language.AR]: "🇸🇦",
  [Language.EN]: "🇺🇸",
};

export const LOCATION_FLAGS: Record<Location, string> = {
  [Location.AE]: "🇦🇪",
  [Location.KSA]: "🇸🇦",
};

export const ANIMATION_DURATION = 300;
