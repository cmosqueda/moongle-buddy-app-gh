import { Tabs } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Route } from "expo-router/build/Route";
import { SearchButton } from "@/allPurpose-components/searchButton";
import { EditButton } from "@/profile-components/editButton";
import { StatusBar } from "expo-status-bar";
import { Image } from "react-native";
// import SvgComponent from "@/assets/logo";

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
            else if (route.name === "hub") iconName = "folder";
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

            // borderBottomLeftRadius: 20,
            // borderBottomRightRadius: 20,
          },
          headerTitleStyle: {
            fontSize: 20,
            fontFamily: "helvetica",
            fontWeight: "900",
            color: "#fff",
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
        })}
      >
        {/* index route */}
        <Tabs.Screen
          name="index"
          options={{
            headerTitle: "",
            headerRight: () => <SearchButton></SearchButton>,
          }}
        ></Tabs.Screen>

        {/* hub route */}
        <Tabs.Screen
          name="hub"
          options={{
            headerTitle: "",
            headerRight: () => <SearchButton></SearchButton>,
          }}
        ></Tabs.Screen>

        {/* options route */}
        <Tabs.Screen name="options" options={{ headerTitle: "" }}></Tabs.Screen>

        {/* profile route */}
        <Tabs.Screen
          name="profile"
          options={{ headerTitle: "", headerRight: () => <EditButton></EditButton> }}
        ></Tabs.Screen>
      </Tabs>
    </>
  );
}
