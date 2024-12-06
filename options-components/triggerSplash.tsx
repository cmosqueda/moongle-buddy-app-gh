import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { triggerDummyScreens } from "../styles/optionsButtonStyles";

export const TriggerSplash = () => {
  return (
    <>
      <TouchableOpacity style={triggerDummyScreens.button}>
        <Text style={triggerDummyScreens.buttonText}>Trigger Splash Screen</Text>
      </TouchableOpacity>
    </>
  );
};
