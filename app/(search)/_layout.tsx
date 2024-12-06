import { router, Stack } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
// import { StatusBar } from "expo-status-bar";
// import { BackButton } from "@/allPurpose-components/headerBackButton";
import { BackButton } from "../../allPurpose-components/headerBackButton";
import React from "react";

export default function SearchLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#4ecdc4",
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={({}) => ({
            headerTitle: "Search",
            headerSearchBarOptions: {
              placeholder: "Search by title",
              headerIconColor: "#fff",
              hintTextColor: "#fff",
              textColor: "#fff",
              tintColor: "#fff",
            },
            headerLeft: () => <BackButton></BackButton>,
            headerTitleAlign: "center",
            headerTitleStyle: {
              // fontSize: 18,
              fontFamily: "Poppins-Black",
              // fontWeight: "900",
              color: "#fff",
              fontSize: 20,
            },
          })}
        ></Stack.Screen>
      </Stack>
    </>
  );
}
