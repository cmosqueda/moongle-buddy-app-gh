import { Tabs } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
// import { Route } from "expo-router/build/Route";
import { EditButton } from "@/profile-components/editButton";
import { StatusBar } from "expo-status-bar";
import { Image } from "react-native";
import { SearchButton } from "@/allPurpose-components/headerSearchButton";
import React from "react";

// import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
// import Hub from "./hub";
// import Home from "./index";
// import Options from "./options";
// import Profile from "./profile";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { NavigationContainer } from "@react-navigation/native";

// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { enableScreens } from "react-native-screens";
// import { NavigationContainer } from "@react-navigation/native";

// const Tab = createMaterialTopTabNavigator();
// const Tab = createBottomTabNavigator();

export default function MainLayout() {
  return (
    <>
      <StatusBar style="auto" backgroundColor="#4ecdc4"></StatusBar>

      {/* <NavigationContainer> */}
      <Tabs
        screenOptions={({ route }) => ({
          // tab bar
          tabBarIcon: ({ focused }) => {
            let iconName;
            if (route.name === "index") iconName = "home";
            else if (route.name === "hub") iconName = "file-tray";
            else if (route.name === "options") iconName = "settings";
            else if (route.name === "profile") iconName = "person";

            return <Ionicons name={iconName} size={24} color={focused ? "#FFE66D" : "#FFF"} />;
          },
          tabBarInactiveTintColor: "#FFF",
          tabBarActiveTintColor: "#FFE66D",
          tabBarStyle: {
            backgroundColor: "#4ECDC4",
            height: 60,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingTop: 10,
            // position: "absolute",
            // bottom: 0,
          },
          tabBarShowLabel: false,

          // header bar
          headerStyle: {
            backgroundColor: "#4ECDC4",
          },
          headerTitleStyle: {
            fontSize: 20,
            fontFamily: "helvetica",
            fontWeight: "900",
            color: "#fff",
            justifyContent: "center",
          },
          // headerTintColor: "#FFFFFF",
          headerShadowVisible: false,
          headerLeft: () => (
            <Image
              source={require("@/assets/logotype.png")}
              style={{
                width: 60,
                height: 60,
                marginHorizontal: 10,
              }}
            ></Image>
          ),

          // headerTitle
          title: "",
          animation: "shift",
        })}
      >
        <Tabs.Screen
          name="index"
          // component={Home}
          options={{ headerRight: () => <SearchButton></SearchButton> }}
        ></Tabs.Screen>
        <Tabs.Screen
          name="hub"
          // component={Hub}
          options={{ headerRight: () => <SearchButton></SearchButton> }}
        ></Tabs.Screen>
        <Tabs.Screen
          name="options"
          // component={Options}
        ></Tabs.Screen>
        <Tabs.Screen
          name="profile"
          //  component={Profile}
          options={{
            headerRight: () => <EditButton></EditButton>,
          }}
        ></Tabs.Screen>
      </Tabs>
      {/* </NavigationContainer> */}
    </>
  );
}
