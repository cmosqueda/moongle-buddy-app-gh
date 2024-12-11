import React, { useState } from "react";
import modalStyles from "@/styles/modalStyles";
import { View, Text, Modal, TouchableOpacity, TextInput, Alert } from "react-native";

interface CreateQuizModalProps {
  visible: boolean;
  onClose: () => void;
}

export const CreateQuizModal: React.FC<CreateQuizModalProps> = ({ visible, onClose }) => {
  // logic here
  const [quizName, setQuizName] = useState<string>();

  //   handle continue
  const handleContinue = async () => {
    console.log("Continue pressed");
  };

  return (
    <>
      {/* modal */}
      <Modal
        style={modalStyles.modal}
        visible={visible}
        animationType="slide"
        transparent={true}
        onRequestClose={onClose}
      >
        {/* OVERLAY */}
        <TouchableOpacity style={modalStyles.overlay} onPress={onClose}></TouchableOpacity>

        {/* BOTTOM SHEET */}
        <View style={modalStyles.bottomSheet}>
          {/* sheet title */}
          <Text style={modalStyles.sheetTitle}>Create Quiz</Text>

          {/* quiz name input wrapper view */}
          <View style={modalStyles.inputWrapperView}>
            {/* input label */}
            <Text style={modalStyles.inputLabel}>Quiz Name</Text>
            {/* sheet input field */}
            <TextInput
              style={modalStyles.inputField}
              placeholder="Name your quiz"
              placeholderTextColor={"#aaa"}
              value={quizName}
              onChangeText={(text) => setQuizName(text)}
            ></TextInput>
          </View>

          {/* close or continue wrapper veiw */}
          <View style={modalStyles.twoColButtonWrapperView}>
            {/* close */}
            <TouchableOpacity style={modalStyles.cancelButton} onPress={onClose}>
              <Text style={modalStyles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            {/* continue */}
            <TouchableOpacity style={modalStyles.continueButton} onPress={handleContinue}>
              <Text style={modalStyles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
          {/*  */}
        </View>
      </Modal>
    </>
  );
};
