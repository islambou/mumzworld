import { Image } from "expo-image";
import React from "react";
import { View, Animated, Easing, StyleSheet } from "react-native";

const SplashScreen = () => {
  const opacity = new Animated.Value(0);

  React.useEffect(() => {
    startOpacityAnimation();
  }, []);

  const startOpacityAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.logoContainer, { opacity }]}>
        <Image source={require("../../assets/images/logo.svg")} style={styles.logo} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
  },
});

export default SplashScreen;
