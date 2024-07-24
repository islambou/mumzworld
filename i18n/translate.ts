import I18n from "./config";
import { TranslatedText, VariableTextId } from "./types";

export default function translate(text: TranslatedText): string {
  if (typeof text === "object") {
    const id = Object.keys(text)[0] as VariableTextId;
    // @ts-ignore
    const params = text[id];
    return I18n.t(id, params);
  }
  return I18n.t(text);
}
