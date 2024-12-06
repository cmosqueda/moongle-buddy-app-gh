// quiz list

// file list

import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
// import hubScreensStyles from "@/styles/hubScreensStyles";
import hubScreensStyles from "../styles/hubScreensStyles";

// type for quiz
type DataItem = {
  id: string;
  title: string;
  owner: string;
};

const DATA: DataItem[] = [
  { id: "1", title: "quiz", owner: "John" },
  { id: "2", title: "quiz2", owner: "Jane" },
  { id: "3", title: "quiz3", owner: "John" },
  { id: "4", title: "quiz4", owner: "Jane" },
];

export const QuizzesList = () => {
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
