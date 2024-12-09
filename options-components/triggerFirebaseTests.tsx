// trigger firebase tests
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { triggerDummyScreens } from "../styles/optionsButtonStyles";

// test write
export const FirebaseTestWrite = () => {
  return (
    <>
      <TouchableOpacity style={triggerDummyScreens.button} onPress={() => console.log("test write pressed")}>
        <Text style={triggerDummyScreens.buttonText}>Test write on firebase</Text>
      </TouchableOpacity>
    </>
  );
};

// test read
export const FirebaseTestRead = () => {
  return (
    <>
      <TouchableOpacity style={triggerDummyScreens.button} onPress={() => console.log("test read pressed")}>
        <Text style={triggerDummyScreens.buttonText}>Test read on firebase</Text>
      </TouchableOpacity>
    </>
  );
};
