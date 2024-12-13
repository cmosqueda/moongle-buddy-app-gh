import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import modalStyles from "@/styles/modalStyles";

interface QuizActionModalProps {
  visible: boolean;
  onClose: () => void;
  quizTitle: string | null;
}

export const QuizActionModal: React.FC<QuizActionModalProps> = ({ visible, onClose, quizTitle = "Default Title" }) => {
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
              <TouchableOpacity style={modalStyles.redActionButton}>
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
              <TouchableOpacity style={modalStyles.yellowActionButton}>
                <Text style={modalStyles.darkButtonLabel}>Edit</Text>
              </TouchableOpacity>

              {/* answer */}
              <TouchableOpacity style={modalStyles.greenActionButton}>
                <Text style={modalStyles.lightButtonLabel}>Answer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};
