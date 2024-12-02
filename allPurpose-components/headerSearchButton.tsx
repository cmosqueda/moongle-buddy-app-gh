import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

// for search button
export const SearchButton = () => {
  // const router = useRouter();

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => router.push("/(search)/")}>
          <Ionicons name="search" size={24} color={"white"}></Ionicons>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
});
