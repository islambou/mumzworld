import { View, Text, Pressable, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useTheme } from "../../theme/ThemeProvider";
import translate from "../../i18n/translate";
import { Language, Location } from "../../types/misc";
import { LANGUAGE_FLAGS, LOCATION_FLAGS } from "../../constants/misc";
import { TranslatedText } from "../../i18n/types";
import { SIZE_UNIT } from "../../theme/theme";
import Octicons from "@expo/vector-icons/Octicons";
import Button from "../../components/button/Button";
import { useStore } from "../../store/StoreProvider";
import { AppSettings } from "../../types/app";

type Props = {
  hideSaveButton?: boolean; // in case the form is used in a stack screen (we use the header right button)
  onChange?: (data: AppSettings) => void;
};
const SettingsForm = (props: Props) => {
  const { state, dispatch } = useStore();
  const { commonStyles, size } = useTheme();
  const [settings, setSettings] = useState<AppSettings>({ currentLanguage: state.currentLanguage, currentLocation: state.currentLocation });

  const languageOptions = Object.values(Language);
  const locationOptions = Object.values(Location);

  const issubmitDisabled = !settings.currentLanguage || !settings.currentLocation;

  const onSave = () => {
    dispatch({ type: "SET_LANGUAGE", payload: settings.currentLanguage });
    dispatch({ type: "SET_LOCATION", payload: settings.currentLocation });
  };
  const onChange = (data: AppSettings) => {
    const newSettings: AppSettings = { ...settings, ...data };
    setSettings(newSettings);
    props.onChange?.(newSettings);
  };
  return (
    <View style={[commonStyles.flex, commonStyles.ph3, { gap: size.unit * 10 }]}>
      <View style={[commonStyles.flex]}>
        <View>
          <Text style={[commonStyles.text.h3, styles.sectionHeader]}>{translate("select_language")}</Text>
          {languageOptions.map((language) => (
            <SettingsItem
              key={language}
              onPress={() => onChange({ ...settings, currentLanguage: language })}
              title={language}
              image={LANGUAGE_FLAGS[language]}
              isSelected={settings.currentLanguage === language}
            />
          ))}
        </View>
        <View>
          <Text style={[commonStyles.text.h3, styles.sectionHeader]}>{translate("select_delivery_location")}</Text>
          {locationOptions.map((location) => (
            <SettingsItem
              key={location}
              onPress={() => onChange({ ...settings, currentLocation: location })}
              title={location}
              image={LOCATION_FLAGS[location]}
              isSelected={settings.currentLocation === location}
            />
          ))}
        </View>
      </View>
      {!props.hideSaveButton && <Button accent title={"save"} onPress={onSave} disabled={issubmitDisabled} />}
    </View>
  );
};

type SettingsItemProps = {
  title: TranslatedText;
  image?: string;
  isSelected?: boolean;
  onPress: () => void;
};
const SettingsItem = ({ image, title, isSelected, onPress }: SettingsItemProps) => {
  const { commonStyles, colorPalette } = useTheme();
  return (
    <Pressable style={[commonStyles.row, commonStyles.center.horizontal, styles.settingsItem]} onPress={onPress}>
      <Text style={[commonStyles.text.body1, isSelected && commonStyles.text.bold, commonStyles.flex]}>
        {image}
        {translate(title)}
      </Text>
      {isSelected && <Octicons name={"check"} size={SIZE_UNIT * 4} color={colorPalette.accent} />}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    textAlign: "center",
    marginBottom: SIZE_UNIT * 2,
  },
  settingsItem: {
    paddingVertical: SIZE_UNIT * 2,
  },
});

export default SettingsForm;
