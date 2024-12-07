import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import hubListStyles from "../styles/hubListStyles";
import { CreateHubModal } from "../modal-components/createHubModal";

export const CreateHub = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const handleContinue = () => {
    console.log("Continue button pressed");
  };

  return (
    <>
      <View style={hubListStyles.headerView}>
        <Text style={hubListStyles.headerTitle}>Study Hub</Text>
        {/* plus button */}
        <TouchableOpacity style={hubListStyles.plusButton} onPress={openModal}>
          <MaterialIcons name="create-new-folder" size={24} color="#fff" />
        </TouchableOpacity>

        <CreateHubModal visible={isModalVisible} onClose={closeModal} onContinue={handleContinue}></CreateHubModal>
      </View>
    </>
  );
};
