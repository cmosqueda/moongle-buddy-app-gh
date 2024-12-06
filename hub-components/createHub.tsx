import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import hubListStyles from "../styles/hubListStyles";

export const CreateHub = () => {
  return (
    <>
      <View style={hubListStyles.headerView}>
        <Text style={hubListStyles.headerTitle}>Study Hub</Text>

        {/* plus button */}
        <TouchableOpacity style={hubListStyles.plusButton}>
          <MaterialIcons name="create-new-folder" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </>
  );
};
