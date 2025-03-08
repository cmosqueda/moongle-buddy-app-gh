import { StyleSheet, TouchableOpacity, ScrollView, Text, TextInput, View, Alert } from "react-native";
import { router } from "expo-router";
import React, { useState } from "react";
import { useAuth } from "@/utilities/authProvider";
import { FontAwesome } from "@expo/vector-icons";
import { changeCredentials, reauthenticateUser } from "@/firebase-helpers";
import { LogoutButton } from "@/options-components/logoutButton";

// usernameFieldInput => for username text field
// newPasswordInput => for new password text field
// confirmNewPassInput => for confirm new password text field

export default function EditProfile() {
  const [usernameInput, setUsernameInput] = useState("");
  const [newPasswordInput, setNewPasswordInput] = useState("");
  const [confirmNewPassInput, setConfirmNewPassInput] = useState("");

  const { user } = useAuth();
  const { reloadUser } = useAuth();
  // placeholder for old data
  const username = user?.username;
  const userEmail = user?.email;
  const userPassword = user?.password;

  // action
  const pressedSaveChanges = async () => {
    if (usernameInput === "" || newPasswordInput === "" || confirmNewPassInput === "") {
      console.log("Required to fill in all text fields.");
      return;
    }

    if (newPasswordInput !== confirmNewPassInput) {
      console.log("Passwords do not match.");
      return;
    }

    try {
      await reauthenticateUser(userEmail, userPassword);
      await changeCredentials(usernameInput, newPasswordInput);
      setUsernameInput("");
      setNewPasswordInput("");
      setConfirmNewPassInput("");
      await reloadUser();
      Alert.alert("Credentials changed", "You have successfully changed your account credentials.");

      console.log("Changes saved successfully!");
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <>
      {/* scroll style */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* green bg for aesthetics lols  */}
        <View style={styles.greenBg}>
          {/* icon and username wrapper */}
          <View style={styles.iconAndUsernameWrapper}>
            {/* icon */}
            <View style={styles.iconView}>
              <FontAwesome name="user-circle" size={100} color={"#fff"}></FontAwesome>
            </View>

            {/* old username displayed */}
            <Text style={styles.displayedUsername}>{username}</Text>
          </View>

          {/* form field */}
          <View style={styles.formField}>
            {/* username */}
            <View style={styles.labelAndInput}>
              <Text style={styles.label}>Username</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter new username"
                placeholderTextColor={"#aaa"}
                value={usernameInput}
                onChangeText={setUsernameInput}
              ></TextInput>
            </View>

            {/* password */}
            <View style={styles.labelAndInput}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter new password"
                placeholderTextColor={"#aaa"}
                value={newPasswordInput}
                onChangeText={setNewPasswordInput}
              ></TextInput>
            </View>

            {/* confirm pass */}
            <View style={styles.labelAndInput}>
              <Text style={styles.label}>Confirm Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Confirm new password"
                placeholderTextColor={"#aaa"}
                value={confirmNewPassInput}
                onChangeText={setConfirmNewPassInput}
              ></TextInput>
            </View>
          </View>
        </View>

        {/* buttons for saving */}
        {/* <View style={styles.bottomButtonsWrapper}>
          <TouchableOpacity style={styles.saveChangesButton} onPress={pressedSaveChanges}>
            <Text style={styles.saveChangesLabel}>Save Changes</Text>
          </TouchableOpacity>
        </View> */}

        {/* button for logout*/}
        <View style={styles.bottomButtonsWrapper}>
          <LogoutButton></LogoutButton>
        </View>
      </ScrollView>
    </>
  );
}

// styles here
const styles = StyleSheet.create({
  greenBg: {
    backgroundColor: "#4ecdc4",
    alignItems: "center",
    paddingVertical: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    elevation: 10,
    shadowColor: "#AAA",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10, // This controls the blur
  },
  iconAndUsernameWrapper: {
    margin: 10,
    alignItems: "center",
  },
  iconView: {
    width: 120,
    height: 120,
    // backgroundColor: "#4ecdc4",
    margin: 10,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 5,
    borderColor: "#fff",
  },
  displayedUsername: {
    fontSize: 24,
    fontFamily: "Poppins-Bold",
    // fontWeight: "900",
    color: "#fff",
  },
  formField: {
    marginVertical: 20,
    width: "70%",
  },
  labelAndInput: {
    marginVertical: 5,
  },
  label: {
    fontFamily: "Poppins-Regular",
    marginVertical: 5,
    color: "#fff",
    fontSize: 14,
  },
  input: {
    backgroundColor: "#fff",
    fontSize: 18,
    fontFamily: "Poppins-Regular",
    padding: 5,
    borderRadius: 5,
    color: "#3d3d3d",
    // borderWidth: 1,
    // borderColor: "#3d3d3d",
    height: 50,
  },

  //   bottom buttons wrapper
  bottomButtonsWrapper: {
    justifyContent: "space-evenly",
    flexDirection: "row",
    marginVertical: 30,
  },
  saveChangesButton: {
    // marginHorizontal: 20,
    backgroundColor: "#FFE66D",
    padding: 15,
    borderRadius: 30,
    // borderWidth: 1,
    // borderColor: "#3d3d3d",
  },
  saveChangesLabel: {
    fontFamily: "Poppins-Bold",
    fontSize: 16,
    // fontWeight: "600",
    color: "#3d3d3d",
  },
});
