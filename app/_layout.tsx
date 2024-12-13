import { AuthProvider } from "@/utilities/authProvider";
import { Stack } from "expo-router";
// import { StatusBar } from "expo-status-bar";
import React from "react";
import { UIProvider } from "@/utilities/uiProvider";

export default function RootLayout() {
  // diri ko mag stop
  // basta need nga ma wrap sa authprovider ang root index
  return (
    <>
      <UIProvider>
        <AuthProvider>
          {/* root layout */}
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index"></Stack.Screen>
            <Stack.Screen name="(auth)"></Stack.Screen>
            <Stack.Screen name="(main)"></Stack.Screen>
            <Stack.Screen name="(search)"></Stack.Screen>
            <Stack.Screen name="(editProfile)"></Stack.Screen>
            <Stack.Screen name="(hub)"></Stack.Screen>
            <Stack.Screen name="(createQuiz)"></Stack.Screen>
            <Stack.Screen name="(editQuiz)"></Stack.Screen>
            <Stack.Screen name="app"></Stack.Screen>
            <Stack.Screen name="+not-found"></Stack.Screen>
          </Stack>
        </AuthProvider>
      </UIProvider>
    </>
  );
}
