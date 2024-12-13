import { FIREBASE_DB } from "./firebaseConfig";
import {
  doc,
  updateDoc,
  Timestamp,
  arrayUnion,
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
  setDoc,
  FirestoreError,
  QuerySnapshot,
  DocumentData,
} from "firebase/firestore";

/**
 * Creates a study hub for a user in Firestore.
 * @param {string} userId - The ID of the user creating the study hub.
 * @param {string} studyHubName - The name of the study hub.
 * @returns {Promise<string>} - The ID of the created study hub.
 * @throws {Error} - Throws an error if the study hub creation fails.
 */
export const createStudyHub = async (userId: string, studyHubName: string, ownerName: string): Promise<string> => {
  try {
    if (!userId || !studyHubName) {
      throw new Error("User ID and Study Hub Name are required.");
    }

    const studyHubRef = doc(collection(FIREBASE_DB, `users/${userId}/studyHubs`));
    await setDoc(studyHubRef, {
      name: studyHubName,
      createdAt: Timestamp.now(),
      ownedBy: ownerName,
    });

    console.log("Study hub created successfully:", studyHubRef.id);
    return studyHubRef.id;
  } catch (error: unknown) {
    console.error("Failed to create study hub:", error);

    // Add custom error handling if needed
    if (error instanceof Error) {
      throw new Error(`Unable to create study hub: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while creating the study hub.");
    }
  }
};

/**
 * Fetches all study hubs for a given user from Firestore.
 * @param {string} userId - The ID of the user whose study hubs are being fetched.
 * @returns {Promise<Array<{ id: string, name: string, createdAt: any }>>} - An array of study hubs.
 * @throws {Error} - Throws an error if fetching study hubs fails.
 */
export const fetchStudyHubsInRealTime = (
  userId: string,
  setData: (data: any[]) => void,
  setError: (error: string | null) => void
) => {
  const studyHubsRef = collection(FIREBASE_DB, `users/${userId}/studyHubs`);
  const unsubscribe = onSnapshot(
    studyHubsRef,
    (snapshot: QuerySnapshot<DocumentData>) => {
      const hubs = snapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().name, // Map 'name' field to 'title'
        owner: doc.data().ownedBy, // Map 'createdBy' field to 'owner'
      }));
      console.log("Fetched study hubs:", hubs);
      setData(hubs);
    },
    (error) => {
      console.error("Error listening to study hubs:", error);
      setError("Failed to listen to study hubs. Please try again.");
    }
  );

  // Return unsubscribe function to clean up the listener when the component unmounts
  return unsubscribe;
};

/**
 * Creates a quiz for a user in Firestore.
 * @param {string} userId - The ID of the user creating the quiz.
 * @param {string} quizName - The name of the quiz.
 * @param {Array} questions - The array of questions for the quiz.
 * @param {string} studyHubId - The ID of the study hub associated with the quiz.
 * @returns {Promise<string>} - The ID of the created quiz.
 * @throws {Error} - Throws an error if quiz creation fails.
 */
export const createQuiz = async (
  userId: string,
  quizName: string,
  questions: Array<{ question: string; options: string[]; correctAnswer: string }>,
  studyHubId: string
): Promise<string> => {
  try {
    console.log("Attempting to create a quiz...");

    if (!userId || !quizName || !questions || questions.length === 0) {
      console.error("Validation failed: Missing required fields.");
      throw new Error("User ID, quiz name, and questions are required.");
    }

    const quizRef = doc(collection(FIREBASE_DB, `users/${userId}/studyHubs/${studyHubId}/quizzes`));

    const quizData = {
      name: quizName,
      createdAt: Timestamp.now(),
      questions: questions.map((q) => ({
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer,
      })),
      createdBy: userId,
      studyHubId: studyHubId,
    };

    console.log("Data to be written to Firestore:", quizData);

    await setDoc(quizRef, quizData);
    console.log("Quiz created successfully with ID:", quizRef.id);

    return quizRef.id;
  } catch (error: unknown) {
    console.error("Error occurred while creating the quiz:", error);

    if (error instanceof Error) {
      throw new Error(`Unable to create quiz: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while creating the quiz.");
    }
  }
};

/**
 * Adds a question to an existing quiz.
 * @param {string} userId - The ID of the user adding the question.
 * @param {string} quizId - The ID of the quiz to add the question to.
 * @param {Object} question - The question to add.
 * @param {string} question.question - The text of the question.
 * @param {Array} question.options - The options for the question.
 * @param {string} question.correctAnswer - The correct answer to the question.
 * @returns {Promise<void>} - Resolves when the question is added.
 * @throws {Error} - Throws an error if adding the question fails.
 */
export const addQuestionToQuiz = async (
  userId: string,
  quizId: string,
  question: { question: string; options: string[]; correctAnswer: string }
): Promise<void> => {
  try {
    const quizRef = doc(FIREBASE_DB, `users/${userId}/studyHubs/${userId}/quizzes/${quizId}`);

    await setDoc(
      quizRef,
      {
        questions: arrayUnion(question), // Adds a new question to the existing questions array
      },
      { merge: true }
    );

    console.log("Question added successfully to quiz:", quizId);
  } catch (error: unknown) {
    console.error("Failed to add question to quiz:", error);

    if (error instanceof Error) {
      throw new Error(`Unable to add question: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while adding the question.");
    }
  }
};
