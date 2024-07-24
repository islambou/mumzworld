import { I18n } from "i18n-js";
import en from "./en";
import ar from "./ar";
import { Language } from "../types/misc";
import { I18nManager, Platform } from "react-native";

const i18n = new I18n({
  ar: ar,
  en: en,
});

export default i18n;
