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
