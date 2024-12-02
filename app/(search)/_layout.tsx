import { router, Stack } from "expo-router";
import { TouchableOpacity, StyleSheet, View, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

export default function SearchLayout() {
  const BackButton = () => {
    return (
      <TouchableOpacity style={styles.backButtonContainer} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color={"#fff"}></Ionicons>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#4ecdc4",
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={({}) => ({
            headerTitle: "Search",
            headerSearchBarOptions: {
              placeholder: "Search by title",
              headerIconColor: "#fff",
              hintTextColor: "#fff",
              textColor: "#fff",
            },
            headerLeft: () => <BackButton></BackButton>,
            headerTitleAlign: "center",
            headerTitleStyle: {
              // fontSize: 18,
              fontFamily: "helvetica",
              fontWeight: "900",
              color: "#fff",
              fontSize: 20,
            },
          })}
        ></Stack.Screen>
      </Stack>
    </>
  );
}

const styles = StyleSheet.create({
  backButtonContainer: {
    marginHorizontal: 5,
  },
});
