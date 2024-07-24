import { View, Text, Pressable, PressableProps, StyleProp, ViewStyle } from "react-native";
import React from "react";
import { TranslatedText } from "../../i18n/types";
import translate from "../../i18n/translate";
import { ThemePalette } from "../../theme/theme";
import { useTheme } from "../../theme/ThemeProvider";
import Octicons from "@expo/vector-icons/Octicons";

type Props = PressableProps & {
  title?: TranslatedText;
  icon?: keyof (typeof Octicons)["glyphMap"];
  color?: keyof ThemePalette;
  iconColor?: keyof ThemePalette;
  accent?: boolean;
  disabled?: boolean;
  small?: boolean;
};
const Button = (props: Props) => {
  const { colorPalette, commonStyles, size } = useTheme();
  const bgColor = props.accent ? colorPalette.accent : props.color ? colorPalette[props.color] : colorPalette.border;
  const textColor = props.accent ? colorPalette.textInvert : colorPalette.text;
  return (
    <Pressable
      testID="button"
      {...props}
      accessibilityRole="button"
      style={[
        { minWidth: size.input },
        commonStyles.buttonBase,
        props.small && commonStyles.buttonSmall,
        { backgroundColor: bgColor },

        commonStyles.center.horizontal,
        commonStyles.center.vertical,
        { opacity: props.disabled ? 0.5 : 1 },
        props.style as StyleProp<ViewStyle>,
      ]}
    >
      {!!props.title && <Text style={[commonStyles.text.bold, { color: textColor }]}>{translate(props.title)}</Text>}
      {!!props.icon && <Octicons testID="buttonIcon" name={props.icon} size={size.icon1} color={props.iconColor ? colorPalette[props.iconColor] : undefined} />}
    </Pressable>
  );
};

export default Button;
