import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { triggerDummyScreens } from "../styles/optionsButtonStyles";
// import { useLoadingScreen } from "@/hooks/useLoadingScreen";
// import LoadingScreen from "@/transitional-screens/loadingScreen";

export const TriggerLoading = () => {
  return (
    <>
      <TouchableOpacity style={triggerDummyScreens.button}>
        <Text style={triggerDummyScreens.buttonText}>Trigger Loading Screen</Text>
      </TouchableOpacity>
    </>
  );
};
