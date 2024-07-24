import { View, Text, Animated } from "react-native";
import React, { useEffect, useRef } from "react";
import { ANIMATION_DURATION as GALERY_ANIMATION_DURATION } from "../../constants/misc";

type DotProps = {
  active?: boolean;
};
const Dot = ({ active }: DotProps) => {
  const width = useRef(new Animated.Value(active ? 24 : 8)).current;

  useEffect(() => {
    Animated.timing(width, {
      toValue: active ? 24 : 8,
      duration: GALERY_ANIMATION_DURATION,
      useNativeDriver: false,
    }).start();
  }, [active]);

  return (
    <Animated.View
      style={{
        width: width,
        height: 6,
        borderRadius: 4,
        backgroundColor: active ? "rgba(0,0,0,.8)" : "rgba(0,0,0,.2)",
      }}
    ></Animated.View>
  );
};

export default Dot;
