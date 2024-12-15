import React, { useState } from "react";
import modalStyles from "@/styles/modalStyles";
import { View, Text, Modal, TouchableOpacity, TextInput, Alert } from "react-native";
import CreateQuiz from "@/app/(createQuiz)/[id]/[name]";
import { ScrollView } from "react-native-gesture-handler";
import { router } from "expo-router";

interface CreateQuizModalProps {
  visible: boolean;
  onClose: () => void;
  hubId: string | string[];
}

export const CreateQuizModal: React.FC<CreateQuizModalProps> = ({ visible, onClose, hubId }) => {
  const [quizName, setQuizName] = useState<string>();
  // const [showCreateQuizScreen, setShowCreateQuizScreen] = useState<boolean>(false);

  // Handle continue to the create quiz screen
  const handleContinue = () => {
    if (!quizName) {
      Alert.alert("Input Required", "Quiz name can't be empty. Please name your quiz.");
      return;
    }

    // Proceed to the create quiz screen
    // setShowCreateQuizScreen(true);
    console.log("hub id:", hubId);
    console.log("quiz name:", quizName);
    router.push(`/${hubId}/${quizName}`);
    onClose();
  };

  return (
    <>
      {/* Main Modal */}
      <Modal
        style={modalStyles.modal}
        visible={visible}
        animationType="slide"
        transparent={true}
        onRequestClose={onClose}
      >
        {/* Overlay */}
        <TouchableOpacity style={modalStyles.overlay} onPress={onClose}></TouchableOpacity>

        {/* Bottom Sheet */}
        <View style={modalStyles.bottomSheet}>
          {/* Sheet Title */}
          <Text style={modalStyles.sheetTitle}>Create Quiz</Text>

          {/* Quiz Name Input Wrapper */}
          <View style={modalStyles.inputWrapperView}>
            {/* Input Label */}
            <Text style={modalStyles.inputLabel}>Quiz Name</Text>

            {/* Input Field */}
            <TextInput
              style={modalStyles.inputField}
              placeholder="Name your quiz"
              placeholderTextColor={"#aaa"}
              value={quizName}
              onChangeText={(text) => setQuizName(text)}
            />
          </View>

          {/* Action Buttons */}
          <View style={modalStyles.twoColButtonWrapperView}>
            {/* Cancel */}
            <TouchableOpacity style={modalStyles.cancelButton} onPress={onClose}>
              <Text style={modalStyles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            {/* Continue */}
            <TouchableOpacity style={modalStyles.continueButton} onPress={handleContinue}>
              <Text style={modalStyles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};
