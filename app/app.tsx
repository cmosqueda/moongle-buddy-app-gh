import { View } from "react-native";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { useAuth } from "@/utilities/authProvider";
import SplashScreen from "../transitional-screens/splashScreen";
// import LoadingScreen from "@/transitional-screens/loadingScreen";

function AppContent() {
  const [showSplash, setShowSplash] = useState(true); // Splash screen state
  const { isAuthenticated } = useAuth(); // Check authentication state
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Italic": require("../assets/fonts/Poppins-Italic.ttf"),
  });

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3000);
    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  useEffect(() => {
    if (!showSplash && isAuthenticated !== undefined) {
      if (isAuthenticated) {
        router.replace("/(main)");
      } else {
        router.replace("/(auth)");
      }
    }
  }, [showSplash, isAuthenticated]);

  if (showSplash || !fontsLoaded) {
    return <SplashScreen />;
  }

  return (
    <>
      <View style={{ flex: 1 }}>{/* Your App's Navigation */}</View>
    </>
  );
}

export default function App() {
  return (
    <>
      <AppContent />
    </>
  );
}
