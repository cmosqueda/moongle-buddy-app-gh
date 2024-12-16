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
  getDoc,
  deleteDoc,
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

/**
 * Fetches quizzes in real time for a specific study hub.
 * @param {string} userId - The ID of the user owning the study hub.
 * @param {string} studyHubId - The ID of the study hub.
 * @param {(data: any[]) => void} setData - A function to update the state with fetched quizzes.
 * @param {(error: string | null) => void} setError - A function to handle error messages.
 * @returns {() => void} - A function to unsubscribe from the real-time listener.
 */
export const fetchQuizzesInRealTime = (
  userId: string | undefined,
  studyHubId: string | undefined,
  setData: (data: any[]) => void,
  setError: (error: string | null) => void
): (() => void) => {
  if (!userId || !studyHubId) {
    console.error("Invalid userId or studyHubId");
    setError("Missing user or study hub ID.");
    return () => {};
  }

  try {
    const quizzesRef = collection(FIREBASE_DB, `users/${userId}/studyHubs/${studyHubId}/quizzes`);
    const quizzesQuery = query(quizzesRef);

    // Set up real-time listener
    const unsubscribe = onSnapshot(
      quizzesQuery,
      (snapshot: QuerySnapshot<DocumentData>) => {
        const quizzes = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name || "Untitled Quiz", // Default title if missing
            createdAt: data.createdAt?.toDate() || null, // Convert Firestore timestamp to JS Date
            createdBy: data.createdBy || "Unknown", // Default owner if missing
          };
        });
        console.log("Fetched quizzes in real-time:", quizzes);
        setData(quizzes);
      },
      (error: FirestoreError) => {
        console.error("Error fetching quizzes in real-time:", error);
        setError("Failed to fetch quizzes. Please try again.");
      }
    );

    return unsubscribe; // Return the unsubscribe function to clean up when component unmounts
  } catch (error: unknown) {
    console.error("Error setting up real-time listener:", error);
    setError("An error occurred while setting up the listener.");
    return () => {}; // Return a no-op if an error occurs
  }
};

/**
 * Fetches quiz data by its ID from Firestore.
 * @param {string} userId - The ID of the user owning the quiz.
 * @param {string} studyHubId - The ID of the study hub containing the quiz.
 * @param {string} quizId - The ID of the quiz to fetch.
 * @returns {Promise<{ id: string, title: string, questions: Array<{ question: string, options: string[], correctAnswer: string }> }>} - The quiz data.
 * @throws {Error} - Throws an error if the quiz fetch fails.
 */
export const fetchQuizById = async (
  userId: string,
  studyHubId: string,
  quizId: string
): Promise<{
  id: string;
  title: string;
  questions: Array<{
    question: string;
    options: string[];
    correctAnswer: string;
  }>;
}> => {
  try {
    const quizRef = doc(FIREBASE_DB, `users/${userId}/studyHubs/${studyHubId}/quizzes/${quizId}`);
    const quizSnap = await getDoc(quizRef);

    if (!quizSnap.exists()) {
      throw new Error("Quiz not found.");
    }

    const quizData = quizSnap.data();
    return {
      id: quizSnap.id,
      title: quizData.name,
      questions: quizData.questions,
    };
  } catch (error: unknown) {
    console.error("Failed to fetch quiz:", error);

    if (error instanceof Error) {
      throw new Error(`Unable to fetch quiz: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while fetching the quiz.");
    }
  }
};

// fetch quiz data
export const fetchQuizData = async (userId: string, hubId: string, quizId: string) => {
  try {
    const quizRef = doc(FIREBASE_DB, `users/${userId}/studyHubs/${hubId}/quizzes/${quizId}`);
    const quizDoc = await getDoc(quizRef);

    if (quizDoc.exists()) {
      return quizDoc.data();
    } else {
      throw new Error("Quiz not found.");
    }
  } catch (error) {
    console.error("Error fetching quiz data:", error);
    throw error;
  }
};

// save updates of quiz
export const saveQuizData = async (
  userId: string,
  hubId: string,
  quizId: string,
  updatedQuizData: {
    name: string;
    questions: { question: string; options: string[]; correctAnswer: string }[];
  }
) => {
  try {
    const quizRef = doc(FIREBASE_DB, `users/${userId}/studyHubs/${hubId}/quizzes/${quizId}`);

    await updateDoc(quizRef, {
      name: updatedQuizData.name,
      questions: updatedQuizData.questions,
    });

    console.log("Quiz updated successfully!");
  } catch (error) {
    console.error("Error updating quiz data:", error);
    throw error;
  }
};

/**
 * Deletes a quiz based on its quiz ID.
 * @param {string} userId - The ID of the user owning the quiz.
 * @param {string} studyHubId - The ID of the study hub containing the quiz.
 * @param {string} quizId - The ID of the quiz to delete.
 * @returns {Promise<void>} - Resolves when the quiz is successfully deleted.
 */
export const deleteQuiz = async (userId: string, studyHubId: string, quizId: string): Promise<void> => {
  try {
    if (!userId || !studyHubId || !quizId) {
      throw new Error("User ID, Study Hub ID, and Quiz ID are required.");
    }

    const quizRef = doc(FIREBASE_DB, `users/${userId}/studyHubs/${studyHubId}/quizzes/${quizId}`);
    await deleteDoc(quizRef);
    console.log(`Quiz with ID: ${quizId} has been deleted successfully.`);
  } catch (error) {
    console.error("Error deleting quiz:", error);
    throw new Error("Failed to delete quiz. Please try again.");
  }
};

/**
 * Updates the name of a selected study hub in Firestore.
 * @param {string} userId - The ID of the user owning the study hub.
 * @param {string} studyHubId - The ID of the study hub to update.
 * @param {string} newName - The new name for the study hub.
 * @returns {Promise<void>} - Resolves when the update is successful.
 * @throws {Error} - Throws an error if the update fails.
 */
export const updateStudyHubName = async (userId: string, studyHubId: string, newName: string): Promise<void> => {
  try {
    if (!userId || !studyHubId || !newName) {
      throw new Error("User ID, Study Hub ID, and New Name are required.");
    }

    const studyHubRef = doc(FIREBASE_DB, `users/${userId}/studyHubs/${studyHubId}`);

    await updateDoc(studyHubRef, {
      name: newName,
    });

    console.log(`Study hub name updated successfully to: ${newName}`);
  } catch (error: unknown) {
    console.error("Failed to update study hub name:", error);

    if (error instanceof Error) {
      throw new Error(`Unable to update study hub name: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while updating the study hub name.");
    }
  }
};

/**
 * Deletes a study hub based on its ID.
 * @param {string} userId - The ID of the user owning the study hub.
 * @param {string} studyHubId - The ID of the study hub to delete.
 * @returns {Promise<void>} - Resolves when the study hub is successfully deleted.
 * @throws {Error} - Throws an error if the study hub deletion fails.
 */
export const deleteStudyHub = async (userId: string, studyHubId: string): Promise<void> => {
  try {
    if (!userId || !studyHubId) {
      throw new Error("User ID and Study Hub ID are required.");
    }

    const studyHubRef = doc(FIREBASE_DB, `users/${userId}/studyHubs/${studyHubId}`);

    // Delete the study hub document
    await deleteDoc(studyHubRef);

    console.log(`Study hub with ID ${studyHubId} deleted successfully.`);
  } catch (error: unknown) {
    console.error("Failed to delete study hub:", error);

    if (error instanceof Error) {
      throw new Error(`Unable to delete study hub: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while deleting the study hub.");
    }
  }
};
