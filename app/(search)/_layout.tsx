import { router, Stack } from "expo-router";
import { TouchableOpacity, Text, StyleSheet, View, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SearchBar } from "react-native-screens";
import { goBack } from "expo-router/build/global-state/routing";

export default function SearchLayout() {
  // search bar component
  const SearchBarInput = () => {
    return (
      <>
        <View style={styles.searchBar}>
          <TextInput style={styles.searchInput} placeholder="Search by title" placeholderTextColor={"#AAA"}></TextInput>
          <TouchableOpacity style={styles.closeButton}>
            <Ionicons name="close" size={24} color="#3d3d3d" />
          </TouchableOpacity>
        </View>
      </>
    );
  };

  return (
    <>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#FFF",
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={({}) => ({
            headerTitle: "",
            headerRight: () => <SearchBarInput></SearchBarInput>,
            headerLeft: () => (
              <TouchableOpacity style={styles.backButtonContainer} onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color={"#3d3d3d"}></Ionicons>
              </TouchableOpacity>
            ),

            headerTitleAlign: "center",
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
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: {
    fontFamily: "helvetica",
    padding: 5,
    fontSize: 16,
    backgroundColor: "#FFF",
    borderRadius: 30,
    width: 240,
    borderWidth: 1,
    borderColor: "#AAA",
    height: 40,
    marginHorizontal: 5,
  },
  closeButton: {
    marginHorizontal: 5,
    // backgroundColor: "#4ECDC4",
    paddingVertical: 3,
    borderRadius: 30,
  },
});
