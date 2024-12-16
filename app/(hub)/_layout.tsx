// import { BackButton } from "@/allPurpose-components/headerBackButton";
import { Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { Image, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { HubHeader } from "@/hub-components/hubHeader";
import { StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";

// layout for hub screens
export default function HubLayout() {
  return (
    <>
      <StatusBar backgroundColor="#4ecdc4"></StatusBar>
      <Tabs
        initialRouteName="files/[id]"
        screenOptions={({ route }) => ({
          // tab bar
          tabBarIcon: ({ focused }) => {
            let iconName;
            if (route.name === "files/[id]") iconName = "insert-drive-file";
            else if (route.name === "quizzes/[id]") iconName = "quiz";
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
          },
          tabBarPosition: "bottom",

          //   header
          header: () => (
            /* <Image
                    source={require("../../assets/logotype.png")}
                    style={{
                      width: 60,
                      height: 60,
                      marginHorizontal: 10,
                    }}
                  ></Image> */

            <>
              <View style={styles.headerContainer}></View>
              <View>
                <TouchableOpacity
                  style={{ marginHorizontal: 20, marginTop: 50 }}
                  onPress={() => router.push("/(main)/hub")}
                >
                  <Ionicons name="arrow-back" size={24} color={"#fff"}></Ionicons>
                </TouchableOpacity>

                {/*  */}
                <HubHeader></HubHeader>
              </View>
            </>
          ),
          headerShadowVisible: false,
        })}
      >
        <Tabs.Screen name="index" options={{ href: null }}></Tabs.Screen>
        {/* files/[id] => [id] is the study hub id */}
        <Tabs.Screen name="files/[id]" options={{ tabBarLabel: "Files" }}></Tabs.Screen>
        <Tabs.Screen name="quizzes/[id]" options={{ tabBarLabel: "Quizzes" }}></Tabs.Screen>
      </Tabs>
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: "center",
    position: "absolute",
    width: "100%",
    backgroundColor: "#4ecdc4",
    height: "60%",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
});
