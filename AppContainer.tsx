import { View, Text } from "react-native";
import React from "react";
import { useTheme } from "./theme/ThemeProvider";
import { useStore } from "./store/StoreProvider";
import SplashScreen from "./screens/splash/SplashScreen";

const AppContainer = (props: { children: React.ReactNode }) => {
  const { commonStyles } = useTheme();
  const { state } = useStore();
  const appIsReady = state.isLoaded;
  if (!appIsReady) {
    return <SplashScreen />;
  }

  return <View style={commonStyles.flex}>{props.children}</View>;
};

export default AppContainer;
