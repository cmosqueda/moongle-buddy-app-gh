// async storage sessions for local data persistence

import AsyncStorage from "@react-native-async-storage/async-storage";

// Function to save the user's session
export const saveSession = async (userToken: string) => {
  if (typeof userToken !== "string") {
    console.error("Invalid token type. Expected a string.");
    return false;
  }
  try {
    await AsyncStorage.setItem("userToken", userToken);
    return true;
  } catch (e) {
    console.error("Error saving user session:", e);
    return false;
  }
};

// Function to get the user's session
export const getSession = async () => {
  try {
    const token = await AsyncStorage.getItem("userToken");
    return token;
  } catch (e) {
    console.error("Error fetching user session:", e);
    return null;
  }
};

// Function to remove the session (logout)
export const clearSession = async () => {
  try {
    await AsyncStorage.removeItem("userToken");
    return true;
  } catch (e) {
    console.error("Error clearing user session:", e);
    return false;
  }
};
