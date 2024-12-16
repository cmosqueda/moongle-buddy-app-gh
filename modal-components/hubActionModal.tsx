import { useAuth } from "@/utilities";
import React, { useEffect, useState } from "react";
import { Alert, Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import { doc, onSnapshot } from "firebase/firestore"; // Import Firestore methods
import { deleteStudyHub, FIREBASE_DB } from "@/firebase-helpers";
import modalStyles from "@/styles/modalStyles";
import { updateStudyHubName } from "@/firebase-helpers";

interface HubActionModalProps {
  visible: boolean;
  onClose: () => void;
  hubTitle: string | null;
  hubId: string | null;
}

export const HubActionModal: React.FC<HubActionModalProps> = ({
  visible,
  onClose,
  hubTitle = "Default Title",
  hubId = "Default hub ID",
}) => {
  // State management
  const [renameInput, setRenameInput] = useState("");
  const [isRenameWrapperVisible, setRenameWrapperVisible] = useState(false);
  const [isActionButtonsVisible, setActionButtonsVisible] = useState(true);
  const [currentHubTitle, setCurrentHubTitle] = useState(hubTitle); // State for real-time title

  // Use user auth context
  const { user } = useAuth();
  const userId = user?.uid;

  // Real-time listener for hubTitle updates
  useEffect(() => {
    if (!userId || !hubId) return; // Guard clause if userId or hubId is not available

    const studyHubRef = doc(FIREBASE_DB, `users/${userId}/studyHubs/${hubId}`);
    const unsubscribe = onSnapshot(studyHubRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setCurrentHubTitle(data?.name || "Untitled Hub");
      } else {
        console.warn("Study hub document not found");
      }
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, [userId, hubId]);

  // Handlers
  const pressedRenameButton = () => {
    setActionButtonsVisible(false);
    setRenameWrapperVisible(true);
  };

  const saveRename = async () => {
    try {
      await updateStudyHubName(userId, hubId, renameInput);
      Alert.alert("Hub Name Updated", "Study hub name updated successfully.");
      setRenameInput("");
      setRenameWrapperVisible(false);
      setActionButtonsVisible(true);
    } catch (error) {
      console.error("Error updating name:", error);
    }
  };

  const discardRename = () => {
    setRenameInput("");
    setRenameWrapperVisible(false);
    setActionButtonsVisible(true);
  };

  const pressedDeleteButton = async () => {
    console.log("You have pressed delete.");

    try {
      await deleteStudyHub(userId, hubId);
      Alert.alert("Hub deleted", "You deleted a hub.");
      console.log("Study hub deleted successfully.");

      onClose();
    } catch (error) {
      console.error("Error deleting study hub:", error);
    }
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
        {/* Overlay */}
        <TouchableOpacity style={modalStyles.overlay} onPress={onClose}></TouchableOpacity>

        {/* Bottom Sheet */}
        <View style={modalStyles.bottomSheet}>
          {/* Sheet Title */}
          <Text style={modalStyles.sheetTitle}>{currentHubTitle}</Text>

          {/* Hub Action Buttons Wrapper */}
          <View style={modalStyles.hubActionButtonsWrapper}>
            {isRenameWrapperVisible && (
              <View>
                <TextInput
                  placeholder="Rename hub"
                  placeholderTextColor={"#aaa"}
                  style={modalStyles.inputField}
                  value={renameInput}
                  onChangeText={setRenameInput}
                />
                <View style={modalStyles.hubRenameWrapperView}>
                  <TouchableOpacity style={modalStyles.redActionButton} onPress={discardRename}>
                    <Text style={modalStyles.lightButtonLabel}>Discard</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={modalStyles.yellowActionButton} onPress={saveRename}>
                    <Text style={modalStyles.darkButtonLabel}>Save</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {isActionButtonsVisible && (
              <>
                <TouchableOpacity style={modalStyles.yellowActionButton} onPress={pressedRenameButton}>
                  <Text style={modalStyles.darkButtonLabel}>Rename</Text>
                </TouchableOpacity>
                <TouchableOpacity style={modalStyles.redActionButton} onPress={pressedDeleteButton}>
                  <Text style={modalStyles.lightButtonLabel}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity style={modalStyles.redActionButton} onPress={onClose}>
                  <Text style={modalStyles.lightButtonLabel}>Cancel</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </>
  );
};
