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
 * Fetches all quizzes for a specific study hub in real-time.
 * @param {string} userId - The ID of the user whose quizzes are being fetched.
 * @param {string} studyHubId - The ID of the study hub from which quizzes are fetched.
 * @param {Function} setData - The function to update the UI state with the fetched quizzes.
 * @param {Function} setError - The function to update the UI state with error messages.
 */
export const fetchQuizzesInRealTime = (
  userId: string,
  studyHubId: string,
  setData: (data: any[]) => void,
  setError: (error: string | null) => void
) => {
  try {
    // Reference to the quizzes collection
    const quizzesRef = collection(FIREBASE_DB, `users/${userId}/studyHubs/${studyHubId}/quizzes`);

    // Real-time listener to fetch quizzes
    const unsubscribe = onSnapshot(
      quizzesRef,
      (snapshot: QuerySnapshot<DocumentData>) => {
        // Map through each document and format it
        const quizzes = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id, // Use the document ID
            title: data.name || "Untitled", // Default to "Untitled" if name is missing
            createdBy: data.createdBy || "Unknown", // Default to "Unknown" if owner is missing
            createdAt: data.createdAt ? data.createdAt.toDate() : null, // Convert timestamp
            questions: data.questions || [], // Default to an empty array if questions are missing
          };
        });

        console.log("Fetched quizzes:", quizzes); // Log to verify data
        setData(quizzes); // Update UI state
      },
      (error) => {
        console.error("Error listening to quizzes:", error);
        setError("Failed to listen to quizzes. Please try again.");
      }
    );

    // Return the unsubscribe function to clean up the listener
    return unsubscribe;
  } catch (error) {
    console.error("Unexpected error in fetchQuizzesInRealTime:", error);
    setError("An unexpected error occurred while fetching quizzes.");
    return () => {}; // Return a no-op cleanup function
  }
};

/**
 * Fetches a quiz's data by its ID for a specific user and study hub.
 * @param {string} userId - The ID of the user owning the quiz.
 * @param {string} studyHubId - The ID of the study hub containing the quiz.
 * @param {string} quizId - The ID of the quiz to fetch.
 * @returns {Promise<Object>} - The quiz data.
 * @throws {Error} - Throws an error if fetching the quiz fails.
 */
export const fetchQuiz = async (userId: string, studyHubId: string, quizId: string): Promise<any> => {
  try {
    const quizRef = doc(FIREBASE_DB, `users/${userId}/studyHubs/${studyHubId}/quizzes/${quizId}`);
    const quizDoc = await getDoc(quizRef);

    if (!quizDoc.exists()) {
      throw new Error("Quiz not found.");
    }

    return quizDoc.data();
  } catch (error) {
    console.error("Error fetching quiz:", error);
    throw new Error("Failed to fetch quiz.");
  }
};

/**
 * Updates an existing quiz's data.
 * @param {string} userId - The ID of the user owning the quiz.
 * @param {string} studyHubId - The ID of the study hub containing the quiz.
 * @param {string} quizId - The ID of the quiz to update.
 * @param {Object} updatedData - The updated quiz data.
 * @returns {Promise<void>} - Resolves when the quiz is updated successfully.
 * @throws {Error} - Throws an error if updating the quiz fails.
 */
export const updateQuiz = async (
  userId: string,
  studyHubId: string,
  quizId: string,
  updatedData: {
    name?: string;
    questions: Array<{ question: string; options: string[]; correctAnswer: string }>;
  }
): Promise<void> => {
  try {
    const quizRef = doc(FIREBASE_DB, `users/${userId}/studyHubs/${studyHubId}/quizzes/${quizId}`);
    await updateDoc(quizRef, updatedData);
  } catch (error) {
    console.error("Error updating quiz:", error);
    throw new Error("Failed to update quiz.");
  }
};

export const getQuizById = async (userId: string, hubId: string, quizId: string) => {
  try {
    // Reference to the quiz document
    const quizRef = doc(FIREBASE_DB, `users/${userId}/studyHubs/${hubId}/quizzes/${quizId}`);

    // Fetch the document
    const quizSnapshot = await getDoc(quizRef);

    if (quizSnapshot.exists()) {
      console.log("Quiz data fetched successfully:", quizSnapshot.data());
      return quizSnapshot.data(); // Returns the data
    } else {
      console.error("No such quiz document found.");
      return null; // Document does not exist
    }
  } catch (error) {
    console.error("Error fetching quiz document:", error);
    throw error; // Rethrow to handle in the caller
  }
};

// export const updateQuiz = async (userId: string, studyHubId: string, quizId: string, quizData: any) => {
//   try {
//     const quizRef = doc(FIREBASE_DB, `users/${userId}/studyHubs/${studyHubId}/quizzes/${quizId}`);
//     await updateDoc(quizRef, quizData);
//     console.log("Quiz updated successfully.");
//   } catch (error) {
//     console.error("Error updating quiz:", error);
//     throw error;
//   }
// };

// export const updateQuiz = async (userId: string, studyHubId: string, quizId: string, quizData: any): Promise<void> => {
//   try {
//     const quizRef = doc(FIREBASE_DB, `users/${userId}/studyHubs/${studyHubId}/quizzes/${quizId}`);
//     await updateDoc(quizRef, quizData);
//     console.log("Quiz updated successfully:", quizId);
//   } catch (error: unknown) {
//     console.error("Error updating quiz:", error);
//     if (error instanceof Error) {
//       throw new Error(`Failed to update quiz: ${error.message}`);
//     } else {
//       throw new Error("An unknown error occurred while updating the quiz.");
//     }
//   }
// };
