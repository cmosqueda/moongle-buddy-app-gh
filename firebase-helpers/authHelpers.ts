import { useAuth } from "@/utilities";
import { FIREBASE_AUTH, FIREBASE_DB } from "./firebaseConfig";
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";

// change credentials function

/**
 * Updates the username in Firestore and password in Firebase Auth.
 *
 * @param {string} newUserName - The new username for the user.
 * @param {string} newPassword - The new password for the user.
 * @returns {Promise<void>} - Resolves if both updates are successful.
 */
export const changeCredentials = async (newUserName: string, newPassword: string) => {
  const auth = FIREBASE_AUTH;
  const currentUser = auth.currentUser;

  if (!currentUser) {
    console.error("No user is signed in.");
    return;
  }

  try {
    // Update the user's password first
    await updatePassword(currentUser, newPassword);
    console.log("Password updated successfully.");

    // Update the user's username in Firestore
    const userDocRef = doc(FIREBASE_DB, "users", currentUser.uid);
    await updateDoc(userDocRef, { username: newUserName, password: newPassword });
    console.log("Username updated successfully.");
  } catch (error) {
    console.error("Error updating credentials:", error);
    throw new Error("Failed to update credentials.");
  }
};

export const reauthenticateUser = async (email: string, currentPassword: string) => {
  try {
    const auth = FIREBASE_AUTH;
    const currentUser = auth.currentUser;

    if (currentUser) {
      const credential = EmailAuthProvider.credential(email, currentPassword);
      await reauthenticateWithCredential(currentUser, credential);
      console.log("Re-authentication successful");
    }
  } catch (error) {
    console.error("Re-authentication failed:", error);
  }
};
