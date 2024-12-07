import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { UploadFileModal } from "../modal-components/uploadFileModal";

// hub header

// type
type HubDetails = {
  OwnerId: string;
  OwnerUsername: string;
  HubName: string;
};

const DATA: HubDetails = { OwnerId: "1", OwnerUsername: "jalanie", HubName: "Hub 1" };

export const HubHeader = () => {
  const [isFileUploadModalVisible, setFileUploadModalVisible] = useState(false);
  const [files, setFiles] = useState<{ id: number; name: string }[]>([]);

  const openFileUploadModal = () => setFileUploadModalVisible(true);
  const closeFileUploadModal = () => setFileUploadModalVisible(false);

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
      {/* parent view or container */}
      <View style={styles.parentView}>
        {/* hub details view */}
        <View style={styles.hubDetailsView}>
          {/* hub owner */}
          <Text style={styles.hubOwner}>Owned by {DATA.OwnerUsername}</Text>

          {/* hub title */}
          <Text style={styles.hubName}>{DATA.HubName}</Text>
        </View>

        {/* wrapper view for upload file or create quiz */}
        <View style={styles.buttonWrapperView}>
          {/* upload file */}
          <TouchableOpacity style={styles.buttons} onPress={openFileUploadModal}>
            <MaterialIcons style={styles.buttonsIcon} name="file-upload" size={30}></MaterialIcons>
            <Text style={styles.buttonsText}>Upload File</Text>
          </TouchableOpacity>

          {/* create quiz */}
          <TouchableOpacity style={styles.buttons}>
            <MaterialIcons style={styles.buttonsIcon} name="create" size={30}></MaterialIcons>
            <Text style={styles.buttonsText}>Create Quiz</Text>
          </TouchableOpacity>
        </View>

        {/* upload file modal */}
        <UploadFileModal
          visible={isFileUploadModalVisible}
          onClose={closeFileUploadModal}
          onContinue={handleContinue}
          onFileUpload={handleUploadFile}
          files={files}
          onDiscard={handleDiscardFile}
        ></UploadFileModal>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  parentView: {
    margin: 20,
    borderWidth: 1,
    // alignItems: "center",
    borderRadius: 5,
    borderColor: "#aaa",
    backgroundColor: "#fff",

    // shadow effect
    elevation: 10,
    shadowColor: "#AAA",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10, // This controls the blur
  },
  hubDetailsView: {
    // width: "90%",
    // margin: 15,
    marginVertical: 10,
    marginHorizontal: 15,
  },
  hubOwner: {
    fontSize: 14,
    fontFamily: "Poppins-Italic",
    // fontStyle: "italic",
    marginVertical: 5,
    color: "#3d3d3d",
  },
  hubName: {
    fontSize: 24,
    fontFamily: "Poppins-Bold",
    // fontWeight: "900",
    color: "#3d3d3d",
  },

  buttonWrapperView: {
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  buttons: {
    padding: 10,
    // margin: 5,
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "#FF6B6B",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonsText: {
    // fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: "#fff",
    marginHorizontal: 5,
    // fontWeight: "800",
  },
  buttonsIcon: {
    color: "#fff",
  },
});
