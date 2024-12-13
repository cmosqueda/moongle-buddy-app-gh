import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity, TextInput, FlatList } from "react-native";
import modalStyles from "../styles/modalStyles";
// import { ScrollView } from "react-native-gesture-handler";
import { FontAwesome6, Ionicons, MaterialIcons } from "@expo/vector-icons";

interface UploadFileModalProps {
  visible: boolean;
  onClose: () => void;
  // onContinue: () => void;
  // onFileUpload: () => void;
  // files: { id: number; name: string }[];
  // onDiscard: () => void;
}

export const UploadFileModal: React.FC<UploadFileModalProps> = ({
  visible,
  onClose,
  // onContinue,
  // files,
  // onFileUpload,
  // onDiscard,
}) => {
  //

  const [files, setFiles] = useState<{ id: number; name: string }[]>([]);

  const handleContinue = () => {
    console.log("Continue file upload button pressed");
  };

  const handleUploadFile = () => {
    const mockFile = { id: Date.now(), name: `File_${Date.now()}.txt` };
    setFiles((prevFiles) => [...prevFiles, mockFile]);
  };

  const handleDiscardFile = () => {
    console.log("Discarded this file");
  };

  return (
    <>
      {/* modal */}
      <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
        {/* OVERLAY */}
        <TouchableOpacity onPress={onClose} style={modalStyles.overlay}></TouchableOpacity>

        {/* BOTTOM SHEET VIEW */}
        <View style={modalStyles.bottomSheet}>
          {/* sheet title */}
          <Text style={modalStyles.sheetTitle}>Upload a File</Text>

          {/* upload area wrapper view */}
          <View style={modalStyles.inputWrapperView}>
            {/* upload area */}
            <TouchableOpacity onPress={() => handleUploadFile()} style={modalStyles.uploadAreaButton}>
              <Text style={modalStyles.uploadAreaText}>Click to Upload</Text>
            </TouchableOpacity>

            {/* flatlist wrapper */}
            <FlatList
              data={files}
              keyExtractor={(item) => item.id.toString()}
              scrollEnabled={true}
              style={modalStyles.flatListWrapper}
              renderItem={({ item }) => (
                // rendering component
                <View style={modalStyles.uploadedFileItem}>
                  <Text style={modalStyles.uploadedFileTitle}>{item.name}</Text>
                  <TouchableOpacity style={modalStyles.uploadedFileDelIcon} onPress={() => handleDiscardFile()}>
                    <MaterialIcons name="delete" size={24} color={"#aaa"}></MaterialIcons>
                  </TouchableOpacity>
                </View>
              )}
              ListEmptyComponent={<Text style={modalStyles.fileEmptyText}>No files uploaded yet.</Text>}
            ></FlatList>
          </View>

          {/* cancel or continue */}
          <View style={modalStyles.twoColButtonWrapperView}>
            {/* close modal / cancel process */}
            <TouchableOpacity onPress={onClose} style={modalStyles.cancelButton}>
              <Text style={modalStyles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            {/* continue */}
            <TouchableOpacity onPress={() => handleContinue()} style={modalStyles.continueButton}>
              <Text style={modalStyles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};
