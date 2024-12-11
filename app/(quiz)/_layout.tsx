import { Stack } from "expo-router";
import React from "react";

export default function QuizLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="index"></Stack.Screen>
      </Stack>
    </>
  );
}
