// logout button component
// returns user to homescreen , router sa gamiton kay i-simulate paman
// dapat naay loading screen

import { TouchableOpacity, Text, View } from "react-native";
import { logoutButtonStyles } from "@/styles/optionsButtonStyles";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

export const LogoutButton = () => {
  return (
    <>
      {/* button */}
      <TouchableOpacity style={logoutButtonStyles.button} onPress={() => router.push("/(auth)/")}>
        <View style={logoutButtonStyles.wrapper}>
          <MaterialIcons name="logout" size={30} style={logoutButtonStyles.icon}></MaterialIcons>
          <Text style={logoutButtonStyles.label}>Logout Account</Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

// style at optionsButtonStyles.ts
