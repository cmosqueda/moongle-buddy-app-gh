import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Alert } from "react-native";
import { useGlobalSearchParams, useLocalSearchParams } from "expo-router/build/hooks";
import { useAuth } from "@/utilities";
import { EmptyListScreen } from "@/allPurpose-components/emptyListScreen";
import { fetchQuizzesInRealTime } from "@/firebase-helpers";
import LoadingScreen from "@/transitional-screens/loadingScreen";
import hubScreensStyles from "../styles/hubScreensStyles";
import { QuizActionModal } from "@/modal-components/quizActionModal";
import { router } from "expo-router";
import { getQuizById } from "@/firebase-helpers";

// Type for quiz
type DataItem = {
  hubId: string;
  id: string;
  title: string;
  createdBy: string;
  createdAt: Date | null; // Add createdAt
};

export const QuizzesList = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<DataItem | null>(null);

  const openModal = (quiz: DataItem) => {
    setSelectedQuiz(quiz);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedQuiz(null);
    setModalVisible(false);
  };

  const { user } = useAuth();
  const { hubId, id, name } = useGlobalSearchParams();
  const [quizzes, setQuizzes] = useState<DataItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const onEdit = () => {
    console.log("Pressed on edit");
    console.log("the hub id:", selectedQuiz?.hubId);
    console.log("the quiz id:", selectedQuiz?.id);
    console.log("the quiz title:", selectedQuiz?.title);

    // Navigate to the editQuiz screen with the quiz id and title
    if (selectedQuiz) {
      // router.push(`/(editQuiz)/${hubId}/${id}/${name}`);
      router.push({
        pathname: "/(editQuiz)/[hubId]/[id]/[name]",
        params: { hubId: selectedQuiz.hubId, id: selectedQuiz.id, name: selectedQuiz.title },
      });
    }
  };

  const onDelete = () => {
    console.log("Pressed on delete");
  };

  const onAnswer = () => {
    console.log("Pressed on answer");
  };

  useEffect(() => {
    if (!user) {
      setError("You must be logged in to view quizzes.");
      setLoading(false);
      return;
    }

    if (!id) {
      setError("Invalid Study Hub ID provided.");
      setLoading(false);
      return;
    }

    const unsubscribe = fetchQuizzesInRealTime(
      user.uid,
      id,
      (fetchedQuizzes) => {
        setQuizzes(fetchedQuizzes);
        setLoading(false);
      },
      (fetchError) => {
        setError(fetchError || "An error occurred while fetching quizzes.");
        setLoading(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [user, id]);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        if (!user?.uid || !id) {
          Alert.alert("Error", "Missing user or quiz information.");
          return;
        }

        const quizData = await getQuizById(user.uid, hubId as string, id as string, name);
        console.log("Fetched Quiz Data:", quizData); // Add this line for debugging

        if (quizData) {
          setQuestions(quizData.questions || []);
        } else {
          Alert.alert("Error", "Failed to fetch quiz data.");
        }
      } catch (error) {
        console.error("Error fetching quiz:", error);
        Alert.alert("Error", "Could not fetch quiz data.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [user?.uid, id]);

  const renderItem = React.useCallback(
    ({ item }: { item: DataItem }) => (
      <TouchableOpacity style={hubScreensStyles.item} onPress={() => openModal(item)}>
        <Text style={hubScreensStyles.itemTitle}>{item.title}</Text>
        {item.createdAt && (
          <Text style={hubScreensStyles.timestamp}>
            Created on: {item.createdAt.toLocaleDateString()} at {item.createdAt.toLocaleTimeString()}
          </Text>
        )}
      </TouchableOpacity>
    ),
    []
  );

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <EmptyListScreen title="Error" message={error} iconName="alert-circle-outline" />;
  }

  if (quizzes.length === 0) {
    return (
      <EmptyListScreen
        title="No Quizzes"
        message="There are no quizzes in this study hub yet."
        iconName="folder-open-outline"
      />
    );
  }

  return (
    <>
      <View style={hubScreensStyles.container}>
        <FlatList
          data={quizzes}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {selectedQuiz && (
        <QuizActionModal
          quizId={selectedQuiz.id}
          visible={isModalVisible}
          onClose={closeModal}
          quizTitle={selectedQuiz.title}
          onEdit={onEdit}
          onDelete={onDelete}
          onAnswer={onAnswer}
        />
      )}
    </>
  );
};
