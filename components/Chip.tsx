import { View, Text, Pressable } from "react-native";
import React from "react";
import { useTheme } from "../theme/ThemeProvider";
import * as Haptics from "expo-haptics";

type Props = {
  label: string;
  onPress?: () => void;
  active?: boolean;
};
const Chip = (props: Props) => {
  const { commonStyles, colorPalette } = useTheme();
  return (
    <Pressable
      onPress={() => {
        // sometimes it may take time to render the new state when one of these chips are pressed (in filtering scenarios for example)
        // so we give a feedback to the user that the press is registered
        props.onPress && Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

        props.onPress?.();
      }}
      focusable
      style={[commonStyles.bordered, commonStyles.br, commonStyles.p2, props.active && { backgroundColor: colorPalette.lightGray }]}
    >
      <Text style={[props.active && commonStyles.text.bold]}>{props.label}</Text>
    </Pressable>
  );
};

export default Chip;
