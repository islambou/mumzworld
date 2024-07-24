import { View, Text, PressableProps, Pressable, Platform, Button, ButtonProps } from "react-native";
import React from "react";
import { TranslatedText } from "../../i18n/types";
import translate from "../../i18n/translate";
import { useTheme } from "../../theme/ThemeProvider";

type Props = ButtonProps & {
  title: TranslatedText;
};
const NavigationButton = (props: Props) => {
  const { commonStyles } = useTheme();
  if (Platform.OS === "ios") {
    return <Button onPress={props.onPress} title={translate(props.title)} />;
  }
  return (
    <Pressable onPress={props.onPress}>
      <Text style={[commonStyles.text.bold, commonStyles.text.body2]}>{translate(props.title)}</Text>
    </Pressable>
  );
};

export default NavigationButton;
