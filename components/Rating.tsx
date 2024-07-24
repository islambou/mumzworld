import { Image } from "expo-image";
import React from "react";
import { StyleProp, Text, View, ViewStyle } from "react-native";

interface RatingProps {
  value: number;
  size?: number;
  style?: StyleProp<ViewStyle>;
}

const Rating: React.FC<RatingProps> = ({ value, size = 16, style }) => {
  const numStarts = 5;
  return (
    <View style={[{ flexDirection: "row" }, style]}>
      {Array.from({ length: numStarts }, (_, index) => {
        if (index <= value) {
          return <Image key={index} source={require("../assets/images/star.png")} style={{ width: size, height: size }} />;
        } else {
          return <Image key={index} source={require("../assets/images/star.png")} style={{ width: size, height: size, opacity: 0.5 }} />;
        }
      })}
    </View>
  );
};

export default Rating;
