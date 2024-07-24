import { View, Text, Pressable } from "react-native";
import React from "react";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { useTheme } from "../../theme/ThemeProvider";
import Octicons from "@expo/vector-icons/Octicons";
import { SIZE_UNIT } from "../../theme/theme";
import translate from "../../i18n/translate";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootBottomTabParamList, RootStackParamList } from "../../navigation/types";

type Props = CompositeScreenProps<BottomTabScreenProps<RootBottomTabParamList, "Profile">, NativeStackScreenProps<RootStackParamList, "MainNavigation">>;

const ProfileScreen = (props: Props) => {
  const { commonStyles } = useTheme();
  return (
    <View style={[commonStyles.screen, commonStyles.p2]}>
      <Pressable
        style={[commonStyles.row]}
        onPress={() => {
          props.navigation.navigate("Settings");
        }}
      >
        <Octicons size={SIZE_UNIT * 7} style={{ marginBottom: -3 }} {...props} name={"gear"} />
        <Text style={commonStyles.text.bold}>{translate("Settings")}</Text>
      </Pressable>
    </View>
  );
};

export default ProfileScreen;
