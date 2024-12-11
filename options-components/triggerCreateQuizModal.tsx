import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { triggerDummyScreens } from "../styles/optionsButtonStyles";
import { CreateQuizModal } from "@/modal-components/createQuizModal";

// test write
export const TriggerCreateQuizModal = () => {
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
          <Text style={triggerDummyScreens.buttonText}>Trigger Create Quiz Modal</Text>
        </TouchableOpacity>
      </View>

      <CreateQuizModal visible={isModalVisible} onClose={closeModal}></CreateQuizModal>
    </>
  );
};
