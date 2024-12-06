import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";

// ------------------------
// EDIT BUTTON

export const EditButton = () => {
  return (
    <>
      <TouchableOpacity style={editButtonStyles.button} onPress={() => router.push("/(editProfile)")}>
        <MaterialCommunityIcons name="account-edit" size={24} color={"#fff"}></MaterialCommunityIcons>
      </TouchableOpacity>
    </>
  );
};

const editButtonStyles = StyleSheet.create({
  button: {
    margin: 20,
  },
});

// ------------------------

// diri ko nag stop
// dugangan nako ug save button

export const SaveChanges = () => {
  return (
    <>
      <TouchableOpacity style={saveChangesStyles.button}>
        <Text>Save changes</Text>
      </TouchableOpacity>
    </>
  );
};

const saveChangesStyles = StyleSheet.create({
  button: {
    margin: 20,
    borderRadius: 5,
  },
});
// ------------------------
