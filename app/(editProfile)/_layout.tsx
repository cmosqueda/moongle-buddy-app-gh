import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

// layout for edit profile screen

export default function EditProfileLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#4ecdc4",
          },
          headerShadowVisible: false,
          headerTintColor: "#fff",
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerTitle: "Edit Profile",
            headerTitleStyle: {
              color: "#fff",
              fontWeight: "900",
            },
            headerTitleAlign: "center",
          }}
        ></Stack.Screen>
      </Stack>
    </>
  );
}
