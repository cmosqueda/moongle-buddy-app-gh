import { Tabs } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Route } from "expo-router/build/Route";
import { EditButton } from "@/profile-components/editButton";
import { StatusBar } from "expo-status-bar";
import { Image } from "react-native";
// import SvgComponent from "@/assets/logo";
import { SearchButton } from "@/allPurpose-components/headerSearchButton";

// import { HubHeaderButtons } from "@/hub-components/hubHeaderButtons";

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

            // return <MaterialIcons name={iconName} size={24} color={focused ? "#FFE66D" : "#FFF"}></MaterialIcons>;
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
              source={require("@/assets/official-logo.png")}
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
        {/* index route */}
        <Tabs.Screen
          name="index"
          options={{
            headerRight: () => <SearchButton></SearchButton>,
          }}
        ></Tabs.Screen>

        {/* hub route */}
        <Tabs.Screen
          name="hub"
          options={{
            headerRight: () => <SearchButton></SearchButton>,
          }}
        ></Tabs.Screen>

        {/* options route */}
        <Tabs.Screen name="options" options={{}}></Tabs.Screen>

        {/* profile route */}
        <Tabs.Screen name="profile" options={{ headerRight: () => <EditButton></EditButton> }}></Tabs.Screen>
      </Tabs>
    </>
  );
}
