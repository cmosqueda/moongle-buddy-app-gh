import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { triggerDummyScreens } from "../styles/optionsButtonStyles";
// import { CreateQuizModal } from "@/modal-components/createQuizModal";
import { QuizActionModal } from "@/modal-components/quizActionModal";

// test write
export const TriggerQuizActionModal = () => {
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
          <Text style={triggerDummyScreens.buttonText}>Trigger Quiz Action Modal</Text>
        </TouchableOpacity>
      </View>

      <QuizActionModal visible={isModalVisible} onClose={closeModal} quizTitle={"Dummy Quiz"}></QuizActionModal>
    </>
  );
};
