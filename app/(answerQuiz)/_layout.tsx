import { BackButton } from "@/allPurpose-components/headerBackButton";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Image } from "react-native";

<<<<<<<< HEAD:app/(editQuiz)/_layout.tsx
export default function EditQuizLayout() {
========
export default function AnswerQuizLayout() {
>>>>>>>> final:app/(answerQuiz)/_layout.tsx
  // get the id of url param and get its equivalent uid in firestore db
  const { id } = useLocalSearchParams();

  return (
    <>
      <Stack
<<<<<<<< HEAD:app/(editQuiz)/_layout.tsx
        initialRouteName="[hubId]/[id]/[name]"
========
        initialRouteName="[id]/[answerQuizId]/[answerQuizTitle]"
>>>>>>>> final:app/(answerQuiz)/_layout.tsx
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
          headerLeft: () => false,
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
<<<<<<<< HEAD:app/(editQuiz)/_layout.tsx
        <Stack.Screen name="[hubId]/[id]/[name]" options={{}}></Stack.Screen>
========
        <Stack.Screen name="[id]/[answerQuizId]/[answerQuizTitle]"></Stack.Screen>
        {/* <Stack.Screen name="createQuiz" options={{ title: "Create Quiz", headerLeft: () => false }}></Stack.Screen> */}
>>>>>>>> final:app/(answerQuiz)/_layout.tsx
      </Stack>
    </>
  );
}
