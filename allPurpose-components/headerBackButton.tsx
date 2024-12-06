import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";

export const BackButton = () => {
  return (
    <TouchableOpacity style={{ marginHorizontal: 5 }} onPress={() => router.back()}>
      <Ionicons name="arrow-back" size={24} color={"#fff"}></Ionicons>
    </TouchableOpacity>
  );
};
