import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { UploadFileModal } from "../modal-components/uploadFileModal";
import { CreateQuizModal } from "@/modal-components/createQuizModal";
import { useLocalSearchParams } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
// import { FIREBASE_DB } from "@/firebase/firebaseConfig"; // Update the import path as needed
import { FIREBASE_DB } from "@/firebase-helpers";
import { useAuth } from "@/utilities";

// HubHeader Component
export const HubHeader: React.FC = () => {
  const { user } = useAuth();

  const { id } = useLocalSearchParams(); // Extracting studyHub id
  const [hubDetails, setHubDetails] = useState({ name: "", ownedBy: "", createdAt: "" });
  const [loading, setLoading] = useState(true);

  const [isFileUploadModalVisible, setFileUploadModalVisible] = useState(false);
  const [isCreateQuizModalVisible, setCreateQuizModalVisible] = useState(false);

  // Fetch studyHub details from Firestore
  useEffect(() => {
    const fetchHubDetails = async () => {
      try {
        if (!id) return;

        const hubRef = doc(FIREBASE_DB, `users/${user?.uid}/studyHubs/${id}`);
        const hubSnapshot = await getDoc(hubRef);

        if (hubSnapshot.exists()) {
          const data = hubSnapshot.data();
          setHubDetails({
            name: data.name,
            ownedBy: data.ownedBy,
            createdAt: data.createdAt.toDate().toLocaleString(),
          });
        } else {
          console.error("Study hub not found!");
        }
      } catch (error) {
        console.error("Error fetching study hub details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHubDetails();
  }, [id]);

  // FOR FILE UPLOAD MODAL VISIBILITY
  const openFileUploadModal = () => setFileUploadModalVisible(true);
  const closeFileUploadModal = () => setFileUploadModalVisible(false);

  // FOR CREATE QUIZ MODAL VISIBILITY
  const openCreateQuizModal = () => setCreateQuizModalVisible(true);
  const closeCreateQuizModal = () => setCreateQuizModalVisible(false);

  if (loading) {
    return <ActivityIndicator size={40} color="#FF6B6B" style={styles.loadingIndicator} />;
  }

  return (
    <View style={styles.parentView}>
      {/* Hub Details */}
      <View style={styles.hubDetailsView}>
        <Text style={styles.hubOwner}>Owned by {hubDetails.ownedBy}</Text>
        <Text style={styles.hubName}>{hubDetails.name}</Text>
        <Text style={styles.hubCreatedAt}>Created on: {hubDetails.createdAt}</Text>
      </View>

      {/* Buttons for Upload File and Create Quiz */}
      <View style={styles.buttonWrapperView}>
        <TouchableOpacity style={styles.buttons} onPress={openFileUploadModal}>
          <MaterialIcons style={styles.buttonsIcon} name="file-upload" size={30} />
          <Text style={styles.buttonsText}>Upload File</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttons} onPress={openCreateQuizModal}>
          <MaterialIcons style={styles.buttonsIcon} name="create" size={30} />
          <Text style={styles.buttonsText}>Create Quiz</Text>
        </TouchableOpacity>
      </View>

      {/* Modals */}
      <UploadFileModal visible={isFileUploadModalVisible} onClose={closeFileUploadModal} />
      <CreateQuizModal hubId={id} visible={isCreateQuizModalVisible} onClose={closeCreateQuizModal} />
    </View>
  );
};

const styles = StyleSheet.create({
  parentView: {
    margin: 20,
    // borderWidth: 1,
    borderRadius: 10,
    borderColor: "#aaa",
    backgroundColor: "#fff",
    elevation: 10,
    shadowColor: "#AAA",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  hubDetailsView: {
    marginVertical: 10,
    marginHorizontal: 15,
  },
  hubOwner: {
    fontSize: 14,
    fontFamily: "Poppins-Italic",
    marginVertical: 5,
    color: "#3d3d3d",
  },
  hubName: {
    fontSize: 24,
    fontFamily: "Poppins-Bold",
    color: "#3d3d3d",
  },
  hubCreatedAt: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#7d7d7d",
    marginTop: 5,
  },
  buttonWrapperView: {
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  buttons: {
    width: "45%",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "#FF6B6B",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonsText: {
    fontFamily: "Poppins-Regular",
    color: "#fff",
    marginHorizontal: 5,
  },
  buttonsIcon: {
    color: "#fff",
  },
  loadingIndicator: {
    marginVertical: 20,
  },
});
