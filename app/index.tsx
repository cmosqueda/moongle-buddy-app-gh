import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { Redirect } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
// import { useLoadingScreen, useSplashScreen } from "@/hooks";
import { useLoadingScreen, useSplashScreen } from "../hooks/index";
import SplashScreen from "../transitional-screens/splashScreen";
import LoadingScreen from "../transitional-screens/loadingScreen";
import { useFonts } from "expo-font";

export default function Index() {
  // const isSplashVisible = useSplashScreen(3000);

  // // this is splash screen for initial boot of app
  // if (isSplashVisible) {
  //   return <SplashScreen></SplashScreen>;
  // }

  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Italic": require("../assets/fonts/Poppins-Italic.ttf"),
  });

  useEffect(() => {
    if (!fontsLoaded) {
      console.log("fonts are not loaded");
    }
  }, [fontsLoaded]);

  // loading screen
  const isLoading = useLoadingScreen();

  if (isLoading) {
    return <LoadingScreen></LoadingScreen>;
  }

  // if (!fontsLoaded) {
  //   return <LoadingScreen></LoadingScreen>;
  // }

  return (
    <>
      <Redirect href="/(main)"></Redirect>
    </>
  );
}

const mainStyles = StyleSheet.create({});
