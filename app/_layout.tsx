import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index"></Stack.Screen>
      <Stack.Screen name="(auth)"></Stack.Screen>
      <Stack.Screen name="(main)"></Stack.Screen>
      <Stack.Screen name="(search)"></Stack.Screen>
      <Stack.Screen name="(editProfile)"></Stack.Screen>
      <Stack.Screen name="+not-found"></Stack.Screen>
      {/* <StatusBar style="auto" backgroundColor="#4ecdc4"></StatusBar> */}
    </Stack>
  );
}
