import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity, TextInput, Alert } from "react-native";
import modalStyles from "../styles/modalStyles";
import { ScrollView } from "react-native-gesture-handler";
import { createStudyHub } from "@/firebase-helpers/firestoreHelpers";
import { useAuth } from "@/utilities/authProvider";

interface CreateHubModalProps {
  visible: boolean;
  onClose: () => void;
  // onContinue: () => void;
}

export const CreateHubModal: React.FC<CreateHubModalProps> = ({ visible, onClose }) => {
  // logic here
  const { user } = useAuth();
  const [studyHubName, setStudyHubName] = useState<string>();

  const UserData = {
    uid: user?.uid,
    username: user?.username,
  };

  // diri ko nag stop

  const handleContinue = async () => {
    console.log("Continue pressed");

    // Check if the study hub name is empty
    if (studyHubName === "") {
      return; // Exit the function early
    }

    try {
      // Call the function to create a new study hub
      const studyHubId = await createStudyHub(UserData.uid, studyHubName, UserData.username);
      console.log("New study hub created with ID:", studyHubId);

      // Reset the input field
      setStudyHubName("");
      Alert.alert("Success", "Your study hub has been created.");
    } catch (error) {
      console.error("Error:", error);

      // Show an alert with an appropriate error message
      // Alert.alert("Error", "There was an issue creating your study hub. Please try again later.");
      Alert.alert("Input Required", "Study hub name can't be empty. Please name your hub.");
    }
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
              value={studyHubName}
              onChangeText={(text) => setStudyHubName(text)}
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
