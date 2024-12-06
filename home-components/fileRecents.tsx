import React from "react";
import { FlatList, View, Text, Pressable, Alert } from "react-native";
import recentStyles from "../styles/recentsStyles";
import { EmptyListScreen } from "../allPurpose-components/emptyListScreen";

// Define the type for the data items
type DataItem = {
  id: string;
  title: string;
  owner: string;
};

// Define the data with proper types
const DATA: DataItem[] = [
  { id: "1", title: "File 1", owner: "user" },
  { id: "2", title: "File 2", owner: "user" },
  { id: "3", title: "File 3", owner: "user" },
  { id: "4", title: "File 3", owner: "user" },
  { id: "5", title: "File 3", owner: "user" },
  // { id: "6", title: "File 3", owner: "user" },
  // { id: "7", title: "File 3", owner: "user" },
];

export const FileRecents = () => {
  // Action handler with type annotation
  const handlePress = (item: DataItem) => {
    Alert.alert("Clicked!", `You clicked on ${item.title}`);
  };

  // Rendering item with type annotation
  const renderItem = ({ item }: { item: DataItem }) => (
    <Pressable
      onPress={() => handlePress(item)}
      style={({ pressed }) => [recentStyles.item, pressed ? { backgroundColor: "#ddd" } : null]}
    >
      <Text style={recentStyles.title}>{item.title}</Text>
      <Text style={recentStyles.ownedByLabel}>Owned by {item.owner}</Text>
    </Pressable>
  );

  if (DATA.length === 0) {
    console.log("no recently accessed file");
    return (
      <EmptyListScreen
        title="Empty"
        message="Woops. Nothing's here yet."
        iconName="folder-open-outline"
      ></EmptyListScreen>
    );
  } else {
    console.log("accessed file");
  }

  return (
    <View style={recentStyles.container}>
      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        // nestedScrollEnabled={true}
        scrollEnabled={false}
        ListHeaderComponent={() => <Text style={recentStyles.header}>Last Accessed Files</Text>}
      />
    </View>
  );
};
