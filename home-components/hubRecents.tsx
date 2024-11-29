import React from "react";
import { FlatList, View, Text, Pressable, Alert } from "react-native";
import recentStyles from "@/styles/recentsStyles";

// Define the type for the data items
type DataItem = {
  id: string;
  title: string;
  owner: string;
};

// Define the data with proper types
const DATA: DataItem[] = [
  { id: "1", title: "Hub 1", owner: "user" },
  { id: "2", title: "Hub 2", owner: "user" },
  { id: "3", title: "Hub 3", owner: "user" },
  { id: "4", title: "Hub 3", owner: "user" },
  { id: "5", title: "Hub 3", owner: "user" },
  { id: "6", title: "Hub 3", owner: "user" },
];

export const HubRecents = () => {
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

  return (
    <View style={recentStyles.container}>
      <Text style={recentStyles.header}>Last Accessed Hubs</Text>

      <FlatList data={DATA} keyExtractor={(item) => item.id} renderItem={renderItem} nestedScrollEnabled={true} />
    </View>
  );
};
