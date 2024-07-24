import { View, Text, Animated, Easing } from "react-native";
import React, { useEffect, useRef } from "react";

interface SpinnerProps {
  children: React.ReactNode;
  disableAnimation?: boolean;
}

const Spinner = ({ children, disableAnimation }: SpinnerProps) => {
  const scaleValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (disableAnimation) {
      scaleValue.setValue(1);
      return;
    }

    const animation = Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]);

    animation.start();

    return () => {
      animation.stop();
    };
  }, [disableAnimation]);

  const scale = scaleValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return <Animated.View style={{ transform: [{ scale }] }}>{children}</Animated.View>;
};

export default Spinner;
