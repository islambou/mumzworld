import React, { useEffect, useState } from "react";

import SettingsForm from "../../sections/settings-form/SettingsForm";
import { Button, SafeAreaView, View } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import translate from "../../i18n/translate";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppSettings } from "../../types/app";
import { useStore } from "../../store/StoreProvider";
import { objectCompare } from "../../utils/objectCompare";
import { RootStackParamList } from "../../navigation/types";
import NavigationButton from "../../components/header/NavigationButton";

type Props = NativeStackScreenProps<RootStackParamList, "Settings">;
const SettingsScreen = (props: Props) => {
  const { commonStyles } = useTheme();
  const { state, dispatch } = useStore();
  const appStateSettings: AppSettings = {
    currentLanguage: state.currentLanguage,
    currentLocation: state.currentLocation,
  };
  const [settings, setSettings] = useState<AppSettings>(appStateSettings);

  const isSettingsChanged = !objectCompare(settings, appStateSettings);
  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () =>
        isSettingsChanged ? (
          <View>
            <NavigationButton
              title={"save"}
              onPress={() => {
                dispatch({ type: "SET_LANGUAGE", payload: settings.currentLanguage });
                dispatch({ type: "SET_LOCATION", payload: settings.currentLocation });
              }}
            />
          </View>
        ) : null,
    });
  }, [settings, isSettingsChanged, state.currentLanguage]);

  return (
    <SafeAreaView style={commonStyles.screen}>
      <View style={[commonStyles.screen, commonStyles.p2]}>
        <SettingsForm hideSaveButton onChange={setSettings} />
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;
