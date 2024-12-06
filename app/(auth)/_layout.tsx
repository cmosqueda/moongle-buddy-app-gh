import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";

export default function AuthLayout() {
  return (
    <>
      <StatusBar style="auto" backgroundColor="#f8f8f8"></StatusBar>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login"></Stack.Screen>
        <Stack.Screen name="signup"></Stack.Screen>
      </Stack>
    </>
  );
}
