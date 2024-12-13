import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import modalStyles from "@/styles/modalStyles";

interface QuizActionModalProps {
  quizId: string;
  visible: boolean;
  onClose: () => void;
  quizTitle: string | null;
  onEdit: () => void;
  onDelete: () => void;
  onAnswer: () => void;
}

export const QuizActionModal: React.FC<QuizActionModalProps> = ({
  quizId,
  visible,
  onClose,
  quizTitle = "Default Title",
  onEdit,
  onDelete,
  onAnswer,
}) => {
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
        <TouchableOpacity style={modalStyles.overlay} onPress={onClose}></TouchableOpacity>

        {/* BOTTOM SHEET */}
        <View style={modalStyles.bottomSheet}>
          {/* sheet title */}
          <Text style={modalStyles.sheetTitle}>{quizTitle}</Text>
          <Text style={modalStyles.quizIdLabel}>ID: {quizId}</Text>

          {/* action buttons wrapper */}
          <View style={modalStyles.actionButtonsWrapper}>
            {/* two col button wrapper, 1st row */}
            <View style={modalStyles.actionButtonColWrapper}>
              {/* delete */}
              <TouchableOpacity style={modalStyles.redActionButton} onPress={onDelete}>
                <Text style={modalStyles.lightButtonLabel}>Delete</Text>
              </TouchableOpacity>
              {/* edit */}
              <TouchableOpacity style={modalStyles.redActionButton} onPress={onClose}>
                <Text style={modalStyles.lightButtonLabel}>Cancel</Text>
              </TouchableOpacity>
            </View>

            {/* two col button wrapper, 2nd row */}
            <View style={modalStyles.actionButtonColWrapper}>
              {/* close modal / cancel */}
              <TouchableOpacity style={modalStyles.yellowActionButton} onPress={onEdit}>
                <Text style={modalStyles.darkButtonLabel}>Edit</Text>
              </TouchableOpacity>

              {/* answer */}
              <TouchableOpacity style={modalStyles.greenActionButton} onPress={onAnswer}>
                <Text style={modalStyles.lightButtonLabel}>Answer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};
