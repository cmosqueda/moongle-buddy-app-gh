import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const UnderConstruction = () => {
  return (
    <>
      <View style={styles.container}>
        <Ionicons name="construct-outline" size={90} style={styles.icon} color={"#ccc"}></Ionicons>
        <Text style={styles.title}>Under Construction</Text>
        <Text style={styles.subtitle}>Woops. Looks like this page is still under construction.</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 100,
    paddingHorizontal: 20,
    height: "100%",
  },
  icon: {
    margin: 10,
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "900",
    fontFamily: "helvetica",
    color: "#3D3D3D",
  },
  subtitle: {
    textAlign: "center",
    fontSize: 15,
    fontFamily: "helvetica",
    color: "#3D3D3D",
  },
});
