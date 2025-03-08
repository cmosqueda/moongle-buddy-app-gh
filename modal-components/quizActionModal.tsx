import React from "react";
import { Modal, Text, TouchableOpacity, View, Alert } from "react-native";
import modalStyles from "@/styles/modalStyles";
import { router, useGlobalSearchParams } from "expo-router";
import { deleteQuiz } from "@/firebase-helpers";
import { useAuth } from "@/utilities";

interface QuizActionModalProps {
  visible: boolean;
  onClose: () => void;
  quizTitle: string | null;
  quizId: string | null;
}

export const QuizActionModal: React.FC<QuizActionModalProps> = ({
  visible,
  onClose,
  quizTitle = "Default Title",
  quizId = "Default quiz ID",
}) => {
  // user auth user id
  const { user } = useAuth();

  const userId = user?.uid;

  // studyHub id url param
  const { id } = useGlobalSearchParams();

  // actions
  const pressedEdit = () => {
    console.log("Edit pressed");
    console.log("Quiz title:", quizTitle);
    console.log("studyHub id:", id);
    console.log("quiz id:", quizId);

    onClose();
    router.push(`/(editQuiz)/${id}/${quizId}/${quizTitle}`);
  };

  const pressedDelete = async () => {
    console.log("Delete pressed");
    if (!quizId) {
      Alert.alert("Error", "Quiz ID is missing.");
      return;
    }

    try {
      await deleteQuiz(userId, id, quizId);
      Alert.alert("Success", `Quiz "${quizTitle}" has been deleted.`);
      onClose(); // Close the modal after deletion
    } catch (error) {
      console.error("Failed to delete quiz:", error);
      Alert.alert("Error", "Failed to delete the quiz. Please try again.");
    }
  };

  const pressedAnswer = () => {
    console.log("Answer pressed");
    console.log("Quiz id:", quizId);
    console.log("Quiz title:", quizTitle);
    onClose();
    router.push(`/(answerQuiz)/${id}/${quizId}/${quizTitle}`);
  };

  return (
    <>
      <Modal
        style={modalStyles.modal}
        visible={visible}
        animationType="slide"
        transparent={true}
        onRequestClose={onClose}
      >
        {/* OVERLAY */}
        <TouchableOpacity style={modalStyles.overlay} onPress={() => onClose()}></TouchableOpacity>

        {/* BOTTOM SHEET */}
        <View style={modalStyles.bottomSheet}>
          {/* sheet title */}
          <Text style={modalStyles.sheetTitle}>{quizTitle}</Text>

          {/* action buttons wrapper */}
          <View style={modalStyles.actionButtonsWrapper}>
            {/* two col button wrapper, 1st row */}
            <View style={modalStyles.actionButtonColWrapper}>
              {/* delete */}
              <TouchableOpacity style={modalStyles.redActionButton} onPress={pressedDelete}>
                <Text style={modalStyles.lightButtonLabel}>Delete</Text>
              </TouchableOpacity>
              {/* edit */}
              <TouchableOpacity style={modalStyles.redActionButton} onPress={() => onClose()}>
                <Text style={modalStyles.lightButtonLabel}>Cancel</Text>
              </TouchableOpacity>
            </View>

            {/* two col button wrapper, 2nd row */}
            <View style={modalStyles.actionButtonColWrapper}>
              {/* close modal / cancel */}
              <TouchableOpacity style={modalStyles.yellowActionButton} onPress={pressedEdit}>
                <Text style={modalStyles.darkButtonLabel}>Edit</Text>
              </TouchableOpacity>

              {/* answer */}
              <TouchableOpacity style={modalStyles.greenActionButton} onPress={() => pressedAnswer()}>
                <Text style={modalStyles.lightButtonLabel}>Answer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};
