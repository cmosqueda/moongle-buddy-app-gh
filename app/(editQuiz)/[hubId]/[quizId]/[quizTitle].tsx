import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { styles } from "@/styles/createQuizStyles";
import { router, useLocalSearchParams, useGlobalSearchParams } from "expo-router";
import { useAuth } from "@/utilities";
import { fetchQuizData, saveQuizData } from "@/firebase-helpers";

// question props
interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

export default function EditQuiz() {
  // useAuth
  const { user } = useAuth();

  // the id here is the hub id
  // the name is the quiz name given by the user
  const { hubId, quizId, quizTitle } = useGlobalSearchParams();

  console.log("edited for hub:", hubId);
  console.log("quiz accessed:", quizId);
  console.log("quiz title:", quizTitle);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadQuizData = async () => {
      try {
        setLoading(true);
        const quizData = await fetchQuizData(user.uid, hubId, quizId);
        setQuestions(quizData.questions || []);
      } catch (error) {
        Alert.alert("Error", "Failed to load quiz data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadQuizData();
  }, [hubId, quizId, user.uid]);

  const saveChanges = async () => {
    try {
      if (questions.some((q) => !q.question || q.options.length === 0 || !q.correctAnswer)) {
        Alert.alert("Error", "Please ensure all fields are filled out correctly.");
        return;
      }

      setLoading(true);
      await saveQuizData(user.uid, hubId, quizId, { name: quizTitle, questions });
      Alert.alert("Success", "Quiz updated successfully!");
      router.back(); // Navigate back to the previous screen
    } catch (error) {
      Alert.alert("Error", "Failed to save changes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: "", options: [], correctAnswer: "" }]);
  };

  const deleteQuestion = (index: number) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  const updateQuestion = (text: string, index: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = text;
    setQuestions(updatedQuestions);
  };

  const updateOption = (text: string, questionIndex: number, optionIndex: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = text;
    setQuestions(updatedQuestions);
  };

  const updateCorrectAnswer = (value: string, index: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].correctAnswer = value;
    setQuestions(updatedQuestions);
  };

  const addChoice = (questionIndex: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.push("");
    setQuestions(updatedQuestions);
  };

  const deleteChoice = (questionIndex: number, optionIndex: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options = updatedQuestions[questionIndex].options.filter(
      (_, i) => i !== optionIndex
    );
    setQuestions(updatedQuestions);
  };

  // Function to save the edited quiz items to Firestore

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Edit Quiz: {quizTitle}</Text>

      {loading ? (
        <Text>Loading...</Text>
      ) : (
        questions.map((item, questionIndex) => (
          <View key={questionIndex} style={styles.questionContainer}>
            <Text style={styles.label}>Question {questionIndex + 1}:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter question"
              value={item.question}
              onChangeText={(text) => updateQuestion(text, questionIndex)}
            />
            {item.options.map((option, optionIndex) => (
              <View key={optionIndex} style={styles.optionContainer}>
                <TextInput
                  style={styles.input}
                  placeholder={`Option ${optionIndex + 1}`}
                  value={option}
                  onChangeText={(text) => updateOption(text, questionIndex, optionIndex)}
                />
                <TouchableOpacity
                  style={styles.deleteChoiceButton}
                  onPress={() => deleteChoice(questionIndex, optionIndex)}
                >
                  <Text style={styles.deleteChoiceText}>Delete</Text>
                </TouchableOpacity>
              </View>
            ))}
            <TouchableOpacity style={styles.addChoiceButton} onPress={() => addChoice(questionIndex)}>
              <Text style={styles.addChoiceText}>Add Choice</Text>
            </TouchableOpacity>
            <Text style={styles.label}>Correct Answer:</Text>
            <Picker
              selectedValue={item.correctAnswer}
              onValueChange={(value) => updateCorrectAnswer(value, questionIndex)}
              style={styles.picker}
            >
              <Picker.Item label="Select Correct Answer" value="" />
              {item.options.map((option, optionIndex) => (
                <Picker.Item key={optionIndex} label={`Option ${optionIndex + 1}: ${option}`} value={option} />
              ))}
            </Picker>
            <TouchableOpacity style={styles.deleteButton} onPress={() => deleteQuestion(questionIndex)}>
              <Text style={styles.deleteText}>Delete Question</Text>
            </TouchableOpacity>
          </View>
        ))
      )}

      <TouchableOpacity style={styles.addButton} onPress={addQuestion}>
        <Text style={styles.addText}>Add Question</Text>
      </TouchableOpacity>

      <View style={styles.lineBreak}></View>
      <View style={styles.discardOrSaveWrapper}>
        <TouchableOpacity style={styles.discardButton} onPress={() => router.back()}>
          <Text style={styles.discardButtonText}>DISCARD</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={saveChanges}>
          <Text style={styles.saveButtonText}>SAVE</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
