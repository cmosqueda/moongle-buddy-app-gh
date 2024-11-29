import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link, Navigator, Redirect, router } from "expo-router";
import { linkTo, navigate } from "expo-router/build/global-state/routing";
import { routeToScreen } from "expo-router/build/useScreens";
import Search from "@/app/(search)";
import { Component } from "react";
import { useRouter } from "expo-router";

// for search button
export const HeaderButtons = () => {
  // const router = useRouter();

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => router.push("/(search)/")}>
          <Ionicons name="search" size={24} color={"white"}></Ionicons>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
});
