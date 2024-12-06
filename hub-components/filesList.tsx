// file list

import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
// import hubScreensStyles from "@/styles/hubScreensStyles";
import hubScreensStyles from "../styles/hubScreensStyles";

// type for files
type DataItem = {
  id: string;
  title: string;
  owner: string;
};

const DATA: DataItem[] = [
  { id: "1", title: "file", owner: "John" },
  { id: "2", title: "file2", owner: "Jane" },
  { id: "3", title: "file3", owner: "John" },
  { id: "4", title: "file4", owner: "Jane" },
];

export const FilesList = () => {
  // render file item component
  const renderItem = ({ item }: { item: DataItem }) => {
    return (
      <>
        <TouchableOpacity style={hubScreensStyles.item}>
          {/* file title */}
          <Text style={hubScreensStyles.itemTitle}>{item.title}</Text>
          {/* file owner */}
          <Text style={hubScreensStyles.ownedByLabel}>Owned by {item.owner}</Text>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <>
      {/* container */}
      <View style={hubScreensStyles.container}>
        <FlatList data={DATA} keyExtractor={(item) => item.id} renderItem={renderItem} scrollEnabled={false}></FlatList>
      </View>
    </>
  );
};
