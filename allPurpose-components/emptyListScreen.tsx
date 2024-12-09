import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
// import { Icon } from "@expo/vector-icons/build/createIconSet";

interface EmptyDetails {
  title: string;
  message: string;
  iconName: string;
}

export const EmptyListScreen: React.FC<EmptyDetails> = ({ title, iconName, message }) => {
  return (
    <>
      <View style={styles.container}>
        <Ionicons name={iconName} size={150} style={styles.icon} color={"#ddd"}></Ionicons>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{message}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    // paddingVertical: 100,
    paddingHorizontal: 20,
    // height: "100%",
    marginVertical: 50,
  },
  icon: {
    margin: 10,
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    marginBottom: 10,
    // fontWeight: "900",
    fontFamily: "Poppins-Black",
    color: "#3D3D3D",
  },
  subtitle: {
    textAlign: "center",
    fontSize: 15,
    fontFamily: "Poppins-Italic",
    color: "#3D3D3D",
  },
});
