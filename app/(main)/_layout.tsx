import { Tabs } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
// import { Route } from "expo-router/build/Route";
// import { EditButton } from "@/profile-components/editButton";
import { EditButton } from "../../profile-components/editButton";
import { StatusBar } from "expo-status-bar";
import { Image } from "react-native";
// import { SearchButton } from "@/allPurpose-components/headerSearchButton";
import { SearchButton } from "../../allPurpose-components/headerSearchButton";
import React from "react";

export default function MainLayout() {
  return (
    <>
      <StatusBar style="auto" backgroundColor="#4ecdc4"></StatusBar>
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
            // paddingTop: 10,
          },
          tabBarShowLabel: false,
          tabBarLabelPosition: "beside-icon",

          // header bar
          headerStyle: {
            backgroundColor: "#4ECDC4",
          },
          headerTitleStyle: {
            fontSize: 20,
            fontFamily: "Poppins-Black",
            // fontWeight: "900",
            color: "#fff",
            justifyContent: "center",
          },
          // headerTintColor: "#FFFFFF",
          headerShadowVisible: false,
          headerLeft: () => (
            <Image
              source={require("../../assets/logotype.png")}
              style={{
                width: 60,
                height: 60,
                marginHorizontal: 10,
              }}
            ></Image>
          ),

          // headerTitle
          // title: "",
          headerTitleAlign: "center",
          animation: "shift",
        })}
      >
        <Tabs.Screen
          name="index"
          // component={Home}
          options={{ headerRight: () => <SearchButton></SearchButton>, title: "Home" }}
        ></Tabs.Screen>
        <Tabs.Screen
          name="hub"
          // component={Hub}
          options={{ headerRight: () => <SearchButton></SearchButton>, title: "Hub" }}
        ></Tabs.Screen>
        <Tabs.Screen
          name="options"
          // component={Options}
          options={{ title: "Options" }}
        ></Tabs.Screen>
        <Tabs.Screen
          name="profile"
          //  component={Profile}
          options={{
            headerRight: () => <EditButton></EditButton>,
            title: "Profile",
          }}
        ></Tabs.Screen>
      </Tabs>
    </>
  );
}
