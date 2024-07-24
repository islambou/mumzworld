import { View, Text, ViewProps, Modal, ScrollView, Pressable, Platform, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { TranslatedText } from "../../i18n/types";
import translate from "../../i18n/translate";
import { useTheme } from "../../theme/ThemeProvider";
import Button from "../button/Button";
import { BlurView } from "expo-blur";
import { SIZE_UNIT } from "../../theme/theme";

type Props = ViewProps & {
  title: TranslatedText;
};
const blurIntensity = Platform.OS === "ios" ? 10 : 10;
const AsModal = (props: Props) => {
  const { commonStyles, colorPalette } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  if (!isVisible)
    return (
      <View style={{ position: "relative" }}>
        <View {...props} style={[{ height: 160, overflow: "hidden" }, commonStyles.screen, props.style]}>
          {props.children}
          <BlurView
            intensity={blurIntensity}
            tint="extraLight"
            style={{ position: "absolute", bottom: 0, right: 0, left: 0 }}
            experimentalBlurMethod="dimezisBlurView"
          >
            <View style={[commonStyles.p2, commonStyles.center.vertical, commonStyles.row]}>
              <Button
                small
                title={"view_more"}
                onPress={() => {
                  setIsVisible(true);
                }}
                style={{ height: undefined, padding: SIZE_UNIT * 2 }}
              />
            </View>
          </BlurView>
        </View>
      </View>
    );
  return (
    <Modal visible={!!isVisible} animationType="fade">
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={[commonStyles.p2, props.style]}>
          <Text style={commonStyles.text.h3}>{translate(props.title)}</Text>
          {props.children}
        </ScrollView>
        <View style={commonStyles.p3}>
          <Button
            title={"continue"}
            accent
            onPress={() => {
              setIsVisible(false);
            }}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default AsModal;
