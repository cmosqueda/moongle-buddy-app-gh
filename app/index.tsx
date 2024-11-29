import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { Redirect } from "expo-router";

export default function Index() {
  return (
    <>
      <Redirect href="/(main)"></Redirect>
    </>
  );
}

const mainStyles = StyleSheet.create({});
