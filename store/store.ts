import { ID } from "../fetchers/dtos";
import { AppSettings } from "../types/app";
import { Language, Location } from "../types/misc";

export type StoreState = AppSettings & {
  isLoaded: boolean;
  isLanguageSet: boolean;
  isLocationSet: boolean;
  wishList: ID[];
  imageBlurHashMap: Record<string, string>;
};

export type StoreAction =
  | {
      type: "SET_LOADED";
      payload: boolean;
    }
  | {
      type: "SET_LOCATION";
      payload: Location;
    }
  | {
      type: "SET_LANGUAGE";
      payload: Language;
    }
  | {
      type: "ADD_TO_WISHLIST";
      payload: ID;
    }
  | {
      type: "REMOVE_FROM_WISHLIST";
      payload: ID;
    }
  | {
      type: "HYDRATE";
      payload: Partial<StoreState>;
    };

export const defaultStore: StoreState = {
  isLoaded: false,
  isLanguageSet: false,
  isLocationSet: false,
  currentLocation: Location.AE,
  currentLanguage: Language.EN,
  wishList: [],
  imageBlurHashMap: {},
};
