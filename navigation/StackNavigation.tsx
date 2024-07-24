import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductDetailsScreen from "../screens/product-details/ProductDetailsScreen";
import { RootStackParamList } from "./types";
import BottomTabNavigator from "./TabNavigation";
import { useStore } from "../store/StoreProvider";
import OnBoardingScreen from "../screens/onboarding/OnBoardingScreen";
import translate from "../i18n/translate";
import { useTheme } from "../theme/ThemeProvider";
import SettingsScreen from "../screens/settings/SettingsScreen";
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation() {
  const { state } = useStore();
  const { colorPalette } = useTheme();
  const userOnboarded = state.isLanguageSet && state.isLocationSet;

  const screensToHideHeader: (keyof RootStackParamList)[] = ["MainNavigation", "OnBoarding"];
  const transparentHeaderScreens: (keyof RootStackParamList)[] = ["ProductDetails"];
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={(props) => {
          return {
            headerShown: !screensToHideHeader.includes(props.route.name),
            headerTitle: translate(props.route.name),
            contentStyle: { backgroundColor: colorPalette.white },
            headerTransparent: transparentHeaderScreens.includes(props.route.name),
          };
        }}
      >
        {!userOnboarded ? (
          <>
            <Stack.Screen name="OnBoarding" component={OnBoardingScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="MainNavigation" component={BottomTabNavigator} />
            <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
