import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { triggerDummyScreens } from "../styles/optionsButtonStyles";
// import { useLoadingScreen } from "@/hooks/useLoadingScreen";
// import LoadingScreen from "@/transitional-screens/loadingScreen";
import { useUIContext } from "@/utilities/uiProvider";
import LoadingScreen from "@/transitional-screens/loadingScreen";

export const TriggerLoading = () => {
  const { showOverlay, setShowOverlay } = useUIContext();

  const handlePress = async () => {
    console.log("trigger");
    setShowOverlay(true);

    try {
      console.log("loading screen test.");
    } catch (error) {
      console.error("error mounting loading screen", error);
    } finally {
      // Simulate a delay to show the loading screen
      setTimeout(() => {
        console.log("Setting overlay to false");
        setShowOverlay(false); // Hide the overlay after 3 seconds
      }, 3000); // Adjust the delay duration as needed
    }
  };

  return (
    <>
      <TouchableOpacity style={triggerDummyScreens.button} onPress={() => handlePress()}>
        <Text style={triggerDummyScreens.buttonText}>Trigger Loading Screen</Text>
      </TouchableOpacity>
      {/* {showOverlay && <LoadingScreen></LoadingScreen>} */}
    </>
  );
};
