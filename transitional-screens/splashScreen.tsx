import { View, Image, StyleSheet, Animated } from "react-native";
import React, { useEffect } from "react";

export default function SplashScreen() {
  // const fadeAnimation = new Animated.Value(1);

  // useEffect(() => {
  //   Animated.timing(fadeAnimation, {
  //     toValue: 0,
  //     duration: 3000,
  //     useNativeDriver: true,
  //   }).start();
  // }, [fadeAnimation]);

  return (
    <View style={styles.parentView}>
      {/* <Animated.View style={[styles.childView, { opacity: fadeAnimation }]}> */}
      <Image source={require("@/assets/logotype.png")} style={styles.icon}></Image>
      {/* </Animated.View> */}
    </View>
  );
}

// styles here
const styles = StyleSheet.create({
  parentView: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4ecdc4",
    height: "100%",
  },
  childView: {
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 200,
    height: 200,
  },
});
