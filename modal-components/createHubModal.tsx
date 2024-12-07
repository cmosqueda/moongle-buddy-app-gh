import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity, TextInput } from "react-native";
import modalStyles from "../styles/modalStyles";
import { ScrollView } from "react-native-gesture-handler";

interface CreateHubModalProps {
  visible: boolean;
  onClose: () => void;
  onContinue: () => void;
}

export const CreateHubModal: React.FC<CreateHubModalProps> = ({ visible, onClose, onContinue }) => {
  return (
    <>
      {/* modal */}
      <Modal
        style={modalStyles.modal}
        visible={visible}
        animationType="slide"
        transparent={true}
        onRequestClose={onClose}
        // onResponderMove={onClose}
      >
        {/* OVERLAY */}
        <TouchableOpacity style={modalStyles.overlay} onPress={onClose}></TouchableOpacity>

        {/* BOTTOM SHEET */}
        <View style={modalStyles.bottomSheet}>
          {/* sheet title */}
          <Text style={modalStyles.sheetTitle}>Create Hub</Text>

          {/* hub name input wrapper view */}
          <View style={modalStyles.inputWrapperView}>
            {/* input label */}
            <Text style={modalStyles.inputLabel}>Hub Name</Text>
            {/* sheet input field */}
            <TextInput
              style={modalStyles.inputField}
              placeholder="Name your hub"
              placeholderTextColor={"#aaa"}
            ></TextInput>
          </View>

          {/* close or continue wrapper view */}
          <View style={modalStyles.twoColButtonWrapperView}>
            {/* close */}
            <TouchableOpacity style={modalStyles.cancelButton} onPress={onClose}>
              <Text style={modalStyles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            {/* continue */}
            {/* magbutang ug logic na if walay name kay mag appear ang error */}
            <TouchableOpacity style={modalStyles.continueButton} onPress={onContinue}>
              <Text style={modalStyles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
          {/*  */}
        </View>
      </Modal>
    </>
  );
};
