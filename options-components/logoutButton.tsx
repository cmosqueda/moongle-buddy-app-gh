import { TouchableOpacity, Text, View, Alert } from "react-native";
import { logoutButtonStyles } from "../styles/optionsButtonStyles";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { useLoadingScreen } from "../hooks/useLoadingScreen";
import { useAuth } from "@/utilities/authProvider";
import { signOut } from "firebase/auth";
import { FIREBASE_AUTH } from "@/firebase-helpers/firebaseConfig";
import { clearSession } from "@/utilities";
import LoadingScreen from "@/transitional-screens/loadingScreen";
import { useUIContext } from "@/utilities/uiProvider";

export const LogoutButton = () => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout(); // Perform logout logic
      console.log("User logged out successfully.");

      // Navigate to the login screen
      router.replace("/(auth)");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <>
      {/* button */}
      <TouchableOpacity style={logoutButtonStyles.button} onPress={() => handleLogout()}>
        <View style={logoutButtonStyles.wrapper}>
          <MaterialIcons name="logout" size={30} style={logoutButtonStyles.icon}></MaterialIcons>
          <Text style={logoutButtonStyles.label}>Logout Account</Text>
        </View>
      </TouchableOpacity>
    </>
  );
};
