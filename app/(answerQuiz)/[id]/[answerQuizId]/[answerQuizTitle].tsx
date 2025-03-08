import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from "react-native";
import { styles } from "@/styles/answerQuizStyles";
import { router, useGlobalSearchParams, useLocalSearchParams } from "expo-router";
// import { fetchQuizById } from "@/utils/firestoreHelpers"; // Ensure correct path to the helper
// import { fetchQuizById } from "@/firebase-helpers";
import { useAuth } from "@/utilities";
import { fetchQuizById } from "@/firebase-helpers";

// Define types for quiz data
interface QuizItem {
  question: string;
  options: string[];
  correctAnswer: string;
}

interface QuizData {
  id: string;
  title: string;
  questions: QuizItem[];
}

export default function AnswerQuiz() {
  // URL parameters
  const { user } = useAuth();

  const userId = user?.uid;

  // study hub
  // const { hubId } = useGlobalSearchParams();

  // answer quiz
  const { answerQuizId, answerQuizTitle, id } = useGlobalSearchParams();

  // Component state
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch quiz data from Firestore
  useEffect(() => {
    const loadQuiz = async () => {
      try {
        if (!userId || !id || !answerQuizId) {
          Alert.alert("Error", "Missing required parameters.");
          router.back();
          return;
        }

        const quiz = await fetchQuizById(userId, id, answerQuizId);
        setQuizData(quiz);
      } catch (error) {
        console.error("Error fetching quiz:", error);
        Alert.alert("Error", "Failed to load quiz. Please try again.");
        router.back();
      } finally {
        setLoading(false);
      }
    };

    loadQuiz();
  }, [answerQuizId, userId, id]);

  // Navigation logic
  const handleAnswer = (option: string): void => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: option,
    }));
  };

  const nextQuestion = (): void => {
    if (currentQuestionIndex < (quizData?.questions.length || 0) - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const prevQuestion = (): void => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const finishQuiz = (): void => {
    setShowResults(true);
  };

  const restartQuiz = (): void => {
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setShowResults(false);
  };

  const exitQuiz = (): void => {
    restartQuiz();
    router.back();
  };

  // Render options for the current question
  const renderOptions = (): JSX.Element[] => {
    const currentQuestion = quizData?.questions[currentQuestionIndex];
    return (
      currentQuestion?.options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.option, selectedAnswers[currentQuestionIndex] === option && styles.selectedOption]}
          onPress={() => handleAnswer(option)}
        >
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      )) || []
    );
  };

  // Show results screen
  if (showResults) {
    const correctCount = quizData?.questions.reduce((score, question, index) => {
      return score + (selectedAnswers[index] === question.correctAnswer ? 1 : 0);
    }, 0);

    return (
      <View style={styles.resultsContainer}>
        <Text style={styles.resultsText}>
          You got {correctCount} out of {quizData?.questions.length} correct!
        </Text>
        <TouchableOpacity style={styles.restartButton} onPress={restartQuiz}>
          <Text style={styles.restartButtonText}>Restart Quiz</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.exitButton} onPress={exitQuiz}>
          <Text style={styles.exitButtonText}>Exit Quiz</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Loading state
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={50} color="#FF6B6B" style={styles.loadingIndicator} />
      </View>
    );
  }

  // Main quiz screen
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.quizTitle}>{quizData?.title || "Quiz"}</Text>
        <View style={styles.lineBreak}></View>
        <Text style={styles.question}>
          {currentQuestionIndex + 1}. {quizData?.questions[currentQuestionIndex].question}
        </Text>
        <View style={styles.optionsContainer}>{renderOptions()}</View>
        <View style={styles.navigation}>
          <TouchableOpacity
            style={[styles.navButton, currentQuestionIndex === 0 && styles.disabledNavButton]}
            onPress={prevQuestion}
            disabled={currentQuestionIndex === 0}
          >
            <Text style={styles.navButtonText}>Previous</Text>
          </TouchableOpacity>
          {currentQuestionIndex === (quizData?.questions.length || 0) - 1 ? (
            <TouchableOpacity style={styles.navButton} onPress={finishQuiz}>
              <Text style={styles.navButtonText}>Finish</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.navButton} onPress={nextQuestion}>
              <Text style={styles.navButtonText}>Next</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScrollView>
  );
}
