import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ID } from "../fetchers/dtos";

export type RootStackParamList = {
  MainNavigation: RootBottomTabParamList;
  ProductDetails: { productId: ID };
  Settings: undefined;
  OnBoarding: undefined;
};
export type RootBottomTabParamList = {
  ProductsList: undefined;
  WishList: undefined;
  Profile: undefined;
};
