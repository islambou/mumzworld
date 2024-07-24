import { View, Text } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { SIZE_UNIT } from "../theme/theme";

const YallaLogo = () => {
  return <Image source={require("../assets/images/yalla_delivery.svg")} style={{ width: SIZE_UNIT * 12, height: SIZE_UNIT * 4 }} />;
};

export default YallaLogo;
