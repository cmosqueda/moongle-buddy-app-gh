import React, { useEffect, useState } from "react";
import { FlatList, View, Text, TouchableOpacity, Alert } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
import hubListStyles from "../styles/hubListStyles";
import { router } from "expo-router";
import { EmptyListScreen } from "../allPurpose-components/emptyListScreen";
import { fetchStudyHubsInRealTime } from "@/firebase-helpers/firestoreHelpers";
import { useAuth } from "@/utilities/authProvider";
import LoadingScreen from "@/transitional-screens/loadingScreen";
import Files from "@/app/(hub)/files/[id]";
import { HubActionModal } from "@/modal-components/hubActionModal";

// define type for the data items
type DataItem = {
  id: string; // hub id
  title: string; // title of the hub
  owner: string; // owner username
};

export const HubList = () => {
  // for hub modal
  const [isHubModalVisible, setHubModalVisible] = useState(false);
  const [selectedHubId, setSelectedHubId] = useState("");
  const [selectHubTitle, setSelectedHubTitle] = useState("");

  const { user } = useAuth();
  const userId = user?.uid;

  const [data, setData] = useState<DataItem[]>([]); // Holds the fetched hubs
  const [error, setError] = useState<string | null>(null); // Holds any error message
  const [loading, setLoading] = useState(true); // Track loading state

  // Real-time data fetching using useEffect
  useEffect(() => {
    const unsubscribe = fetchStudyHubsInRealTime(
      userId,
      (fetchedData) => {
        setData(fetchedData);
        setLoading(false); // Stop loading when data is fetched
      },
      (fetchError) => {
        setError(fetchError);
        setLoading(false); // Stop loading in case of an error
      }
    );

    return () => {
      unsubscribe();
    };
  }, [userId]);

  // handlers
  const openHubModal = () => {
    setHubModalVisible(true);
  };

  const closeHubModal = () => {
    setSelectedHubId("");
    setSelectedHubTitle("");
    setHubModalVisible(false);
  };

  // Handle item selection
  const handlePress = (item: DataItem) => {
    // router.push(`/(hub)?id=${item.id}&title=${item.title}&owner=${item.owner}`);
    router.push(`/(hub)/files/${item.id}`);
    // router.push(`/(hub)/quizzes/${item.id}`);
    // router.push("/(hub)");

    console.log("hub id:", item.id);
    console.log("hub title:", item.title);
    console.log("hub owner:", item.owner);

    // Files();
  };

  const handleLongPress = (item: DataItem) => {
    setSelectedHubId(item.id);
    setSelectedHubTitle(item.title);
    openHubModal();
    // Alert.alert("Long Press", `You long pressed ${item.id} title ${item.title} on the list`);
  };

  // Item renderer
  const renderItem = ({ item }: { item: DataItem }) => (
    <TouchableOpacity
      onPress={() => handlePress(item)}
      style={hubListStyles.item}
      onLongPress={() => handleLongPress(item)}
    >
      <Text style={hubListStyles.itemTitle}>{item.title || "Untitled Hub"}</Text>
      <Text style={hubListStyles.ownedByLabel}>Owned by {item.owner || "Unknown"}</Text>
    </TouchableOpacity>
  );

  // Render loading screen if fetching data
  if (loading) {
    return <LoadingScreen />;
  }

  // Render an empty list message if there are no hubs
  if (data.length === 0) {
    return (
      <EmptyListScreen
        title="No Hubs Found"
        message="You don't have any hub yet. Click the red button on the top right corner to create one."
        iconName="folder-open-outline"
      />
    );
  }

  return (
    <>
      <View style={hubListStyles.container}>
        <FlatList data={data} keyExtractor={(item) => item.id} renderItem={renderItem} scrollEnabled={true} />
      </View>

      <HubActionModal
        visible={isHubModalVisible}
        onClose={closeHubModal}
        hubTitle={selectHubTitle}
        hubId={selectedHubId}
      ></HubActionModal>
    </>
  );
};
