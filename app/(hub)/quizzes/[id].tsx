import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, TouchableOpacity, FlatList } from "react-native";
import hubScreensStyles from "@/styles/hubScreensStyles";
import { EmptyListScreen } from "@/allPurpose-components/emptyListScreen";
import { fetchQuizzesInRealTime } from "@/firebase-helpers";
import { useLocalSearchParams, useGlobalSearchParams } from "expo-router";
import { useAuth } from "@/utilities";
import { QuizActionModal } from "@/modal-components/quizActionModal";

// import { useLocalSearchParams, useRouter } from "expo-router";

export default function Quizzes() {
  return (
    <>
      {/* scroll style */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* parent view */}
        <View>
          {/* quiz list */}
          <QuizzesList></QuizzesList>
        </View>
      </ScrollView>
    </>
  );
}

// quiz list
// type for quiz
type DataItem = {
  id: string;
  name: string;
  createdBy: string;
  createdAt: Date | null;
};

export const QuizzesList = () => {
  const { user } = useAuth();
  const { id } = useGlobalSearchParams();

  const [quizzes, setQuizzes] = useState<DataItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Modal state
  const [showActionModal, setShowActionModal] = useState(false);
  const [selectedQuizTitle, setSelectedQuizTitle] = useState<string>("");
  const [selectedQuizId, setSelectedQuizId] = useState<string>("");

  const openActionModal = (quizTitle: string, quizId: string) => {
    setSelectedQuizId(quizId);
    setSelectedQuizTitle(quizTitle); // Set the quiz title
    setShowActionModal(true);
  };

  const closeActionModal = () => {
    setShowActionModal(false);
    setSelectedQuizId("");
    setSelectedQuizTitle(""); // Clear the selected title
  };

  useEffect(() => {
    const userId = user?.uid; // Current user's ID
    const studyHubId = id; // Current study hub's ID

    if (!userId || !studyHubId) {
      setError("Missing user or study hub ID.");
      return;
    }

    const unsubscribe = fetchQuizzesInRealTime(userId, studyHubId, setQuizzes, setError);

    console.log("userId:", userId);
    console.log("studyHubId:", studyHubId);

    // Cleanup listener when the component unmounts
    return () => unsubscribe();
  }, []);

  const renderItem = ({ item }: { item: DataItem }) => (
    <TouchableOpacity
      style={hubScreensStyles.item}
      onPress={() => openActionModal(item.name, item.id)} // Pass the quiz title to the modal
    >
      {/* Quiz Title */}
      <Text style={hubScreensStyles.itemTitle}>{item.name}</Text>
      {/* Created At */}
      {item.createdAt && <Text style={hubScreensStyles.timestamp}>Created: {item.createdAt.toLocaleString()}</Text>}
    </TouchableOpacity>
  );

  if (error) {
    return <Text style={hubScreensStyles.errorText}>{error}</Text>;
  }

  if (quizzes.length === 0) {
    return (
      <EmptyListScreen title="No quizzes" message="You don't have any quizzes yet." iconName="folder-open-outline" />
    );
  }

  return (
    <>
      <View style={hubScreensStyles.container}>
        <FlatList data={quizzes} keyExtractor={(item) => item.id} renderItem={renderItem} scrollEnabled={false} />
      </View>

      {/* Pass the selectedQuizTitle to the modal */}
      <QuizActionModal
        visible={showActionModal}
        onClose={closeActionModal}
        quizTitle={selectedQuizTitle}
        quizId={selectedQuizId}
      />
    </>
  );
};
