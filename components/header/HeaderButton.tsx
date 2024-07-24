import { Pressable } from "react-native";
import React from "react";
import { useTheme } from "../../theme/ThemeProvider";
import Octicons from "@expo/vector-icons/Octicons";
import { SIZE_UNIT } from "../../theme/theme";

type Props = {
  onPress?: () => void;
  icon: keyof (typeof Octicons)["glyphMap"];
};
export const HEADER_BUTTON_SIZE = SIZE_UNIT * 12;
const HeaderButton = (props: Props) => {
  const { colorPalette, commonStyles, size } = useTheme();
  const buttonSize = HEADER_BUTTON_SIZE;
  return (
    <Pressable
      onPress={props.onPress}
      style={[
        {
          width: buttonSize,
          height: buttonSize,
          borderRadius: buttonSize,
          backgroundColor: colorPalette.white,
        },
        commonStyles.center.horizontal,
        commonStyles.center.vertical,
        commonStyles.shadow,
      ]}
    >
      <Octicons name={props.icon} size={size.unit * 4} />
    </Pressable>
  );
};

export default HeaderButton;
