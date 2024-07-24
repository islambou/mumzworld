import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProductsListScreen from "../screens/products-list/ProductsListScreen";
import WishListScreen from "../screens/wish-list/WishListScreen";
import { RootBottomTabParamList } from "./types";
import Octicons from "@expo/vector-icons/Octicons";
import { SIZE_UNIT } from "../theme/theme";
import { useTheme } from "../theme/ThemeProvider";
import ProfileScreen from "../screens/profile-screen/ProfileScreen";
import translate from "../i18n/translate";
import Spinner from "../components/Spinner";
import { useStore } from "../store/StoreProvider";

const Tab = createBottomTabNavigator<RootBottomTabParamList>();

export default function BottomTabNavigator() {
  const { colorPalette } = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => TabBarIcon({ name: route.name as keyof RootBottomTabParamList, color }),
        tabBarActiveTintColor: colorPalette.accent,
        tabBarInactiveTintColor: colorPalette.textWeak,
        title: translate(route.name),
      })}
    >
      <Tab.Screen name="ProductsList" component={ProductsListScreen} />
      <Tab.Screen name="WishList" component={WishListScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const tabIcons: Record<keyof RootBottomTabParamList, keyof (typeof Octicons)["glyphMap"]> = {
  ProductsList: "home",
  WishList: "heart",
  Profile: "person",
};

function TabBarIcon(props: { name: keyof RootBottomTabParamList; color: string }) {
  const { state } = useStore();
  if (props.name === "WishList") {
    return (
      <Spinner disableAnimation={!state.wishList.length} key={state.wishList.length}>
        <Octicons size={SIZE_UNIT * 7} style={{ marginBottom: -3 }} {...props} name={tabIcons[props.name]} />
      </Spinner>
    );
  }
  return <Octicons size={SIZE_UNIT * 7} style={{ marginBottom: -3 }} {...props} name={tabIcons[props.name]} />;
}
