import { Stack, Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Route } from "expo-router/build/Route";
import { HeaderButtons } from "@/allPurpose-components/headerButtons";
// import { HubHeaderButtons } from "@/hub-components/hubHeaderButtons";

export default function MainLayout() {
  return (
    <>
      <Tabs
        screenOptions={({ route }) => ({
          // tab bar
          tabBarIcon: ({ focused }) => {
            let iconName;
            if (route.name === "index") iconName = "home";
            else if (route.name === "hub") iconName = "folder-open";
            else if (route.name === "options") iconName = "settings";
            else if (route.name === "profile") iconName = "person";

            return <Ionicons name={iconName} size={24} color={focused ? "#FFE66D" : "#FFF"} />;
          },
          tabBarPosition: "bottom",
          tabBarInactiveTintColor: "#FFF",
          tabBarActiveTintColor: "#FFE66D",
          tabBarStyle: {
            backgroundColor: "#4ECDC4",
            height: 60,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingTop: 10,
          },
          tabBarShowLabel: false,

          // header bar
          headerStyle: {
            backgroundColor: "#4ECDC4",

            // borderBottomLeftRadius: 20,
            // borderBottomRightRadius: 20,
          },
          headerTitleStyle: {
            fontSize: 20,
            fontFamily: "helvetica",
            fontWeight: "bold",
            color: "#fff",
          },
          // headerTintColor: "#FFFFFF",
          headerShadowVisible: false,
        })}
      >
        {/* index route */}
        <Tabs.Screen
          name="index"
          options={{
            headerTitle: "Home",
            headerRight: () => <HeaderButtons></HeaderButtons>,
          }}
        ></Tabs.Screen>

        {/* hub route */}
        <Tabs.Screen
          name="hub"
          options={{
            headerTitle: "Study Hub",
            headerRight: () => <HeaderButtons></HeaderButtons>,
          }}
        ></Tabs.Screen>

        {/* options route */}
        <Tabs.Screen name="options" options={{ headerTitle: "Options" }}></Tabs.Screen>

        {/* profile route */}
        <Tabs.Screen name="profile" options={{ headerTitle: "Profile" }}></Tabs.Screen>
      </Tabs>
    </>
  );
}
