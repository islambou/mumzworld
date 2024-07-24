import React, { createContext, useContext, useState } from "react";
import { Theme, lightTheme } from "./theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ThemeContext = createContext<Theme | undefined>(undefined);

const ThemeProvider: React.FC<{
  children: React.ReactNode;
}> = (props) => {
  // Set the initial theme state
  const [theme, setTheme] = useState<Theme>(lightTheme);
  const insets = useSafeAreaInsets();
  theme.commonStyles.screen = {
    ...theme.commonStyles.screen,
    /* paddingTop: insets.top,
    paddingBottom: insets.bottom,
    paddingLeft: insets.left,
    paddingRight: insets.right,*/
  };

  return <ThemeContext.Provider value={{ ...theme }}>{props.children}</ThemeContext.Provider>;
};

export default ThemeProvider;

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) throw new Error("theme is not initialized");
  return context;
};
