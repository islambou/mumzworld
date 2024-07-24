import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Octicons } from "@expo/vector-icons";
import { useTheme } from "../theme/ThemeProvider";

type Props = {
  value: boolean;
  onValueChange: (value: boolean) => void;
};
function MyCheckbox(props: Props) {
  const { colorPalette } = useTheme();
  return (
    <Pressable style={[styles.checkboxBase, props.value && styles.checkboxChecked]} onPress={() => props.onValueChange(!props.value)}>
      {props.value && <Octicons name="check" size={16} color={colorPalette.text} />}
    </Pressable>
  );
}
export default MyCheckbox;
const styles = StyleSheet.create({
  checkboxBase: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderWidth: 1.5,
    backgroundColor: "transparent",
  },
  checkboxChecked: {},
});
