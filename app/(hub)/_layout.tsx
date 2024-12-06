// import { BackButton } from "@/allPurpose-components/headerBackButton";
import { BackButton } from "../../allPurpose-components/headerBackButton";
import { Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";

// layout for hub screens
export default function HubLayout() {
  return (
    <>
      <Tabs
        screenOptions={({ route }) => ({
          // tab bar
          tabBarIcon: ({ focused }) => {
            let iconName;
            if (route.name === "index") iconName = "insert-drive-file";
            else if (route.name === "quizzes") iconName = "quiz";
            return <MaterialIcons name={iconName} size={24} color={focused ? "#FFE66D" : "#FFF"}></MaterialIcons>;
          },
          tabBarStyle: {
            backgroundColor: "#4ecdc4",
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            height: 60,
          },
          tabBarLabelPosition: "beside-icon",
          tabBarActiveTintColor: "#FFE66D",
          tabBarInactiveTintColor: "#fff",
          tabBarLabelStyle: {
            fontFamily: "Poppins-Bold",
            fontSize: 16,
            // fontWeight: "900",
          },

          //   header
          headerTitle: () => (
            <Image
              source={require("../../assets/logotype.png")}
              style={{
                width: 60,
                height: 60,
                marginHorizontal: 10,
              }}
            ></Image>
          ),
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity style={{ marginHorizontal: 20 }} onPress={() => router.push("/(main)/hub")}>
              <Ionicons name="arrow-back" size={24} color={"#fff"}></Ionicons>
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: "#4ecdc4",
          },
        })}
      >
        <Tabs.Screen name="index" options={{ tabBarLabel: "Files" }}></Tabs.Screen>
        <Tabs.Screen name="quizzes" options={{ tabBarLabel: "Quizzes" }}></Tabs.Screen>
      </Tabs>
    </>
  );
}
