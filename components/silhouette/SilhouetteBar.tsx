import { View, Text, Animated, ViewProps } from "react-native";
import React, { useEffect, useRef } from "react";
import { SIZE_UNIT } from "../../theme/theme";

const SilhouetteBar = (props: ViewProps) => {
  const glowAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const startAnimation = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnimation, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(glowAnimation, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    startAnimation();
  }, [glowAnimation]);

  const interpolatedColor = glowAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgba(0,0,0,.1)", "rgba(0,0,0,.2)"],
  });

  return (
    <Animated.View
      style={[
        {
          backgroundColor: interpolatedColor,
          height: 10,
          width: "100%",
          borderRadius: SIZE_UNIT,
        },
        props.style,
      ]}
    ></Animated.View>
  );
};

export default SilhouetteBar;
