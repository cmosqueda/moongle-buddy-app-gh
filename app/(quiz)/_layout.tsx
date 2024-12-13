import { BackButton } from "@/allPurpose-components/headerBackButton";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";

export default function QuizLayout() {
  // get the id of url param and get its equivalent uid in firestore db
  const { id } = useLocalSearchParams();

  return (
    <>
      <Stack
        initialRouteName="[id]"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#4ecdc4",
          },
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "Poppins-Black",
            color: "#fff",
            fontSize: 20,
          },
          headerLeft: () => <BackButton></BackButton>,
          // headerBackButtonDisplayMode: "minimal",
        }}
      >
        {/* create or edit quiz - index file */}
        <Stack.Screen name="index" options={{ title: "Index" }}></Stack.Screen>
        <Stack.Screen name="[id]" options={{ title: "" }}></Stack.Screen>
        {/* <Stack.Screen name="createQuiz" options={{ title: "Create Quiz", headerLeft: () => false }}></Stack.Screen> */}
      </Stack>
    </>
  );
}