import { TouchableOpacity, Text, View } from "react-native";
import { logoutButtonStyles } from "../styles/optionsButtonStyles";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { useLoadingScreen } from "../hooks/useLoadingScreen";

export const LogoutButton = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    // setIsLoggingOut(true);
    // const duration = 3000; // 3 seconds delay
    // const isLoading = useLoadingScreen(duration);
    // if (!isLoading) {
    //   router.push("/(auth)");
    //   setIsLoggingOut(false);
    // }
    // setIsLoggingOut(true)
    // await router.push('/(auth)').then(() => {
    // });
    // setIsLoggingOut(false)

    router.push("/(auth)");
  };

  return (
    <>
      {/* button */}
      <TouchableOpacity style={logoutButtonStyles.button} onPress={handleLogout}>
        <View style={logoutButtonStyles.wrapper}>
          <MaterialIcons name="logout" size={30} style={logoutButtonStyles.icon}></MaterialIcons>
          <Text style={logoutButtonStyles.label}>Logout Account</Text>
        </View>
      </TouchableOpacity>
    </>
  );
};
