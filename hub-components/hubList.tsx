import React from "react";
import { FlatList, View, Text, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
// import hubListStyles from "@/styles/hubListStyles";
import hubListStyles from "../styles/hubListStyles";
import { router } from "expo-router";
import { EmptyListScreen } from "../allPurpose-components/emptyListScreen";
// import { checkArrLength } from "../utilities/checkArrayLength";

// define type for the data items
type DataItem = {
  id: string;
  title: string;
  owner: string;
};

const DATA: DataItem[] = [
  { id: "1", title: "Item 1", owner: "John" },
  { id: "2", title: "Item 2", owner: "Jane" },
  { id: "3", title: "Item 3", owner: "John" },
  { id: "4", title: "Item 4", owner: "Jane" },
  { id: "5", title: "Item 1", owner: "John" },
  // { id: "6", title: "Item 2", owner: "Jane" },
  // { id: "7", title: "Item 3", owner: "John" },
  // { id: "8", title: "Item 4", owner: "Jane" },
  // { id: "9", title: "Item 1", owner: "John" },
  // { id: "10", title: "Item 2", owner: "Jane" },
  // { id: "11", title: "Item 3", owner: "John" },
  // { id: "12", title: "Item 4", owner: "Jane" },
];

export const HubList = () => {
  // handle item select
  // handle press of a specific hub
  const handlePress = (item: DataItem) => {
    Alert.alert("Clicked", `You clicked on ${item.title}`);
  };

  // fetch data

  // item render
  const renderItem = ({ item }: { item: DataItem }) => (
    // mag route sa ko diri for simulation
    <TouchableOpacity onPress={() => router.push("/(hub)")} style={hubListStyles.item}>
      <Text style={hubListStyles.itemTitle}>{item.title}</Text>
      <Text style={hubListStyles.ownedByLabel}>Owned by {item.owner}</Text>
    </TouchableOpacity>
  );

  // check if data is empty huhu
  if (DATA.length === 0) {
    console.log("empty data in hub");
    return (
      <>
        <EmptyListScreen
          title="No Hubs Found"
          message="You don't have any hub yet. Click the red button on the topright corner to create one."
          iconName="folder-open-outline"
        ></EmptyListScreen>
      </>
    );
  } else {
    console.log("data in hub");
  }

  return (
    <>
      {/* container */}
      <View style={hubListStyles.container}>
        <FlatList
          data={DATA}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          // nestedScrollEnabled={true}
          scrollEnabled={false}
          // ListHeaderComponent={() => (
          // )}
        ></FlatList>
      </View>
    </>
  );
};
