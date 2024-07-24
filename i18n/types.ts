import { Currency } from "../fetchers/dtos";
import { RootBottomTabParamList, RootStackParamList } from "../navigation/types";
import { Language, Location } from "../types/misc";

type VariableTextOptions =
  | {
      price: { amout: number | string; symbol: string };
    }
  | {
      showed_items: { count: number };
    };

type RowObject<T> = {
  [K in keyof T]: T[K];
};
export type VariableTextId = "price" | "showed_items";

export type TranslatedText =
  | VariableTextId
  | RowObject<VariableTextOptions>
  | "ProductDetails"
  | "ProductsList"
  | "Settings"
  | "WishList"
  | "welcome"
  | "select_language"
  | "select_delivery_location"
  | "save"
  | "search"
  | "filter"
  | "reset"
  | "price_range"
  | "category"
  | "yalla_delivery"
  | "brand"
  | "yalla_delivery_description"
  | "apply"
  | "we_couldnt_find_any_product"
  | "try_with_other_criteria"
  | "description"
  | "add_to_cart"
  | "view_more"
  | "continue"
  | Location
  | Currency
  | Language
  | keyof RootStackParamList
  | keyof RootBottomTabParamList;
//@ts-ignore (this has been battle tested :=) )
export type TranslatedLanguage = Record<TranslatedText, string>;
