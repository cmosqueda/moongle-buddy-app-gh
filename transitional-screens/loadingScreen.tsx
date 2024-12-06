import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import React from "react";

export default function LoadingScreen() {
  return (
    <View style={styles.parentView}>
      <View style={styles.childView}>
        <ActivityIndicator size={70} color={"#4ECDC4"}></ActivityIndicator>
        <Text style={styles.loadingLabel}>Loading...</Text>
      </View>
    </View>
  );
}

// style here
const styles = StyleSheet.create({
  parentView: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  childView: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingLabel: {
    fontSize: 20,
    fontFamily: "Poppins-Regular",
    marginVertical: 20,
  },
});
