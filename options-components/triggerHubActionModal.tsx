import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { triggerDummyScreens } from "@/styles/optionsButtonStyles";
import { HubActionModal } from "@/modal-components/hubActionModal";

export const TriggerHubActionModal = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <View>
        <TouchableOpacity style={triggerDummyScreens.button} onPress={() => openModal()}>
          <Text style={triggerDummyScreens.buttonText}>Trigger Hub Action Modal</Text>
        </TouchableOpacity>
      </View>

      <HubActionModal
        visible={isModalVisible}
        onClose={closeModal}
        hubTitle={"Trigger test"}
        hubId={"temp id"}
      ></HubActionModal>
    </>
  );
};
