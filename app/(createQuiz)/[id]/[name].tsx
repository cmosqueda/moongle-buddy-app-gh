import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { styles } from "@/styles/createQuizStyles";
import { router, useLocalSearchParams } from "expo-router";
import { useAuth } from "@/utilities";
import { createQuiz } from "@/firebase-helpers";

// question props
interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

export default function CreateQuiz() {
  // useAuth
  const { user } = useAuth();

  // the id here is the hub id
  // the name is the quiz name given by the user
  const { id, name } = useLocalSearchParams();

  console.log("created for hub:", id);

  const [questions, setQuestions] = useState<Question[]>([
    {
      question: "",
      options: [],
      correctAnswer: "",
    },
  ]);

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

  // Function to save the quiz to Firestore
  const saveQuiz = async () => {
    try {
      if (!name || questions.length === 0 || !user?.uid) {
        Alert.alert("Error", "Please provide a quiz name and at least one question.");
        return;
      }

      // Prepare the quiz data
      const quizData = questions.map((q) => ({
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer,
      }));

      // Call the Firestore helper function to create the quiz
      const quizId = await createQuiz(user.uid, name, quizData, id);

      Alert.alert("Success", `Quiz created with ID: ${quizId}`);
      // Optionally navigate back after saving
      router.back();
    } catch (error) {
      console.error("Error creating quiz:", error);
      Alert.alert("Error", "There was an issue creating the quiz. Please try again.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Quiz Title: {name}</Text>
      {questions.map((item, questionIndex) => (
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
      ))}
      {/* ADD QUESTION */}
      <TouchableOpacity style={styles.addButton} onPress={addQuestion}>
        <Text style={styles.addText}>Add Question</Text>
      </TouchableOpacity>
      {/* line */}
      <View style={styles.lineBreak}></View>
      {/* DISCARD OR SAVE */}
      <View style={styles.discardOrSaveWrapper}>
        {/* DISCARD */}
        <TouchableOpacity style={styles.discardButton} onPress={() => router.back()}>
          <Text style={styles.discardButtonText}>DISCARD</Text>
        </TouchableOpacity>

        {/* SAVE */}
        <TouchableOpacity style={styles.saveButton} onPress={saveQuiz}>
          <Text style={styles.saveButtonText}>SAVE</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
