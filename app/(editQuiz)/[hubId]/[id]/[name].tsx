import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { styles } from "@/styles/createQuizStyles";
import { router, useLocalSearchParams } from "expo-router";
import { useAuth } from "@/utilities";
import { getQuizById, updateQuiz } from "@/firebase-helpers";

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

export default function EditQuiz() {
  const { user } = useAuth();
  const { hubId, id, name } = useLocalSearchParams(); // Include `hubId` in the params
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        if (!user?.uid || !hubId || !id) {
          Alert.alert("Error", "Missing user, study hub, or quiz information.");
          return;
        }

        console.log("Fetching quiz data for:", { userId: user.uid, hubId, quizId: id });

        const quizData = await getQuizById(user.uid, hubId as string, id as string);

        if (quizData && quizData.questions) {
          console.log("Fetched quiz questions:", quizData.questions);
          setQuestions(quizData.questions);
        } else {
          Alert.alert("Error", "No quiz data found or invalid response.");
        }
      } catch (error) {
        console.error("Error fetching quiz:", error);
        Alert.alert("Error", "Could not fetch quiz data.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [user?.uid, hubId, id]);

  const saveQuiz = async () => {
    try {
      if (!hubId || !id) {
        Alert.alert("Error", "Missing study hub or quiz information.");
        return;
      }

      console.log("Attempting to save quiz with data:", { hubId, id, questions });

      await updateQuiz(user?.uid, hubId as string, id as string, { questions });

      Alert.alert("Success", "Quiz updated successfully.");
      router.back();
    } catch (error) {
      console.error("Error updating quiz:", error);
      Alert.alert("Error", "Failed to update quiz. Please try again.");
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Edit Quiz: {name}</Text>
      {questions.map((item, questionIndex) => (
        <View key={questionIndex} style={styles.questionContainer}>
          <Text style={styles.label}>Question {questionIndex + 1}:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter question"
            value={item.question}
            onChangeText={(text) => {
              setQuestions((prevQuestions) =>
                prevQuestions.map((q, i) => (i === questionIndex ? { ...q, question: text } : q))
              );
            }}
          />
          {item.options.map((option, optionIndex) => (
            <View key={optionIndex} style={styles.optionContainer}>
              <TextInput
                style={styles.input}
                placeholder={`Option ${optionIndex + 1}`}
                value={option}
                onChangeText={(text) => {
                  const updatedQuestions = [...questions];
                  updatedQuestions[questionIndex].options[optionIndex] = text;
                  setQuestions(updatedQuestions);
                }}
              />
              <TouchableOpacity
                style={styles.deleteChoiceButton}
                onPress={() => {
                  const updatedQuestions = [...questions];
                  updatedQuestions[questionIndex].options = updatedQuestions[questionIndex].options.filter(
                    (_, i) => i !== optionIndex
                  );
                  setQuestions(updatedQuestions);
                }}
              >
                <Text style={styles.deleteChoiceText}>Delete</Text>
              </TouchableOpacity>
            </View>
          ))}
          <TouchableOpacity
            style={styles.addChoiceButton}
            onPress={() => {
              const updatedQuestions = [...questions];
              updatedQuestions[questionIndex].options.push("");
              setQuestions(updatedQuestions);
            }}
          >
            <Text style={styles.addChoiceText}>Add Choice</Text>
          </TouchableOpacity>
          <Text style={styles.label}>Correct Answer:</Text>
          {/* picker */}
          <Picker
            selectedValue={item.correctAnswer || ""}
            onValueChange={(value) => {
              setQuestions((prevQuestions) =>
                prevQuestions.map((q, i) => (i === questionIndex ? { ...q, correctAnswer: value } : q))
              );
            }}
            style={styles.picker}
          >
            <Picker.Item label="Select Correct Answer" value="" />
            {item.options?.map((option, index) => (
              <Picker.Item key={index} label={option} value={option} />
            ))}
          </Picker>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => {
              const updatedQuestions = questions.filter((_, i) => i !== questionIndex);
              setQuestions(updatedQuestions);
            }}
          >
            <Text style={styles.deleteText}>Delete Question</Text>
          </TouchableOpacity>
        </View>
      ))}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setQuestions([...questions, { question: "", options: [], correctAnswer: "" }])}
      >
        <Text style={styles.addText}>Add Question</Text>
      </TouchableOpacity>
      <View style={styles.lineBreak}></View>
      <View style={styles.discardOrSaveWrapper}>
        <TouchableOpacity style={styles.discardButton} onPress={() => router.back()}>
          <Text style={styles.discardButtonText}>DISCARD</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={() => saveQuiz()}>
          <Text style={styles.saveButtonText}>SAVE</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
