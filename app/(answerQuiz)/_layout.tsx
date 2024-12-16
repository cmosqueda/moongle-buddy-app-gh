import { BackButton } from "@/allPurpose-components/headerBackButton";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Image } from "react-native";

export default function AnswerQuizLayout() {
  // get the id of url param and get its equivalent uid in firestore db
  const { id } = useLocalSearchParams();

  return (
    <>
      <Stack
        initialRouteName="[id]/[answerQuizId]/[answerQuizTitle]"
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
          headerTitle: () => (
            <>
              <Image
                source={require("../../assets/logotype.png")}
                style={{
                  width: 60,
                  height: 60,
                  marginHorizontal: 10,
                }}
              ></Image>
            </>
          ),
        }}
      >
        {/* create or edit quiz - index file */}
        <Stack.Screen name="index" options={{ title: "Index" }}></Stack.Screen>
        <Stack.Screen name="[id]/[answerQuizId]/[answerQuizTitle]"></Stack.Screen>
        {/* <Stack.Screen name="createQuiz" options={{ title: "Create Quiz", headerLeft: () => false }}></Stack.Screen> */}
      </Stack>
    </>
  );
}
