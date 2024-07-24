import { View, Text } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { useTheme } from "../../theme/ThemeProvider";

type Props = {
  imageUri: string;
  aspectRatio: number;
};
const Banner = ({ imageUri, aspectRatio }: Props) => {
  const { commonStyles } = useTheme();
  return (
    <View style={commonStyles.br}>
      <Image source={{ uri: imageUri }} style={{ width: "100%", height: "auto", aspectRatio: aspectRatio }} contentFit="cover" />
    </View>
  );
};

export default Banner;
