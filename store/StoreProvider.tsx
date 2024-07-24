import { createContext, useContext, useEffect, useReducer } from "react";
import { StoreState, StoreAction, defaultStore } from "./store";
import { I18nManager, Platform } from "react-native";
import I18nConf from "../i18n/config";
import { Language } from "../types/misc";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Updates from "expo-updates";

type StoreContextType = {
  state: StoreState;
  dispatch: React.Dispatch<StoreAction>;
};
function shouldBeRTLChecker(language: Language) {
  return language === Language.AR ? true : false;
}
export function applyRTL(lang: Language) {
  const shouldBeRTL = shouldBeRTLChecker(lang);

  if (shouldBeRTL && !I18nManager.isRTL && Platform.OS !== "web") {
    I18nManager.allowRTL(shouldBeRTL);
    I18nManager.forceRTL(shouldBeRTL);
    // since sdk50 an issue was introduced that causes the app expo go to not store the isRTL flag
    // which will always return false and we enter in a loop of setting the isRTL flag and reloading the app
    // the only way to see the app in RTL layout is by setting the phone language to Arabic
    // https://github.com/expo/expo/issues/26532
    //Updates.reloadAsync();
  }
}
const STORAGE_KEY = "mumzWorldAppState";

const StoreContext = createContext<StoreContextType | undefined>(undefined);

function storeReducer(state: StoreState, action: StoreAction): StoreState {
  switch (action.type) {
    case "SET_LANGUAGE":
      I18nConf.locale = action.payload;
      return { ...state, currentLanguage: action.payload, isLanguageSet: true };
    case "SET_LOCATION":
      return { ...state, currentLocation: action.payload, isLocationSet: true };
    case "ADD_TO_WISHLIST":
      return { ...state, wishList: [...state.wishList, action.payload] };
    case "REMOVE_FROM_WISHLIST":
      return { ...state, wishList: state.wishList.filter((id) => id !== action.payload) };
    case "HYDRATE":
      return { ...state, ...action.payload, isLoaded: true };
    default:
      throw new Error("Unknown action type");
  }
}
const StoreProvider: React.FC<{
  children: React.ReactNode;
}> = (props) => {
  const [store, dispatch] = useReducer(storeReducer, defaultStore);
  useEffect(() => {
    applyRTL(store.currentLanguage);
  }, [store.currentLanguage]);

  // Load state from AsyncStorage on app start
  useEffect(() => {
    const loadState = async () => {
      try {
        const storedState = await AsyncStorage.getItem(STORAGE_KEY);
        if (!storedState) {
          dispatch({ type: "HYDRATE", payload: defaultStore });
          return;
        }
        const loadedState: Partial<StoreState> = JSON.parse(storedState);
        dispatch({ type: "HYDRATE", payload: loadedState });

        if (storedState) {
          if (loadedState.currentLanguage) {
            I18nConf.locale = loadedState.currentLanguage;
            applyRTL(store.currentLanguage);
          }
        }
      } catch (error) {
        console.error("Failed to load state from AsyncStorage", error);
      }
    };

    loadState();
  }, []);

  // Save state to AsyncStorage whenever it changes
  useEffect(() => {
    const saveState = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(store));
      } catch (error) {
        console.error("Failed to save state to AsyncStorage", error);
      }
    };

    saveState();
  }, [store]);

  return <StoreContext.Provider value={{ state: store, dispatch }}>{props.children}</StoreContext.Provider>;
};

export default StoreProvider;

export const useStore = () => {
  const context = useContext(StoreContext);

  if (!context) throw new Error("store is not found");
  return context;
};
