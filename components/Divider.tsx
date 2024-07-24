import { View, Text } from "react-native";
import React from "react";
import { useTheme } from "../theme/ThemeProvider";

const Divider = () => {
  const { colorPalette } = useTheme();
  return <View style={{ height: 1, width: "100%", backgroundColor: colorPalette.border }} />;
};

export default Divider;
