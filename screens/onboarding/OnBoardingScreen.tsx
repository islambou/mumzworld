import React from "react";

import SettingsForm from "../../sections/settings-form/SettingsForm";
import { Image } from "expo-image";
import { useTheme } from "../../theme/ThemeProvider";
import { SafeAreaView, View } from "react-native";

const OnBoardingScreen = () => {
  const { commonStyles, size } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={[commonStyles.screen, { gap: size.unit * 10 }, commonStyles.p3, { paddingTop: 50 }]}>
        <Image source={require("../../assets/images/logo_large.svg")} style={{ height: 50, width: "80%", alignSelf: "center" }} contentFit="contain" />
        <SettingsForm />
      </View>
    </SafeAreaView>
  );
};

export default OnBoardingScreen;
