import { StyleSheet, TouchableOpacity, ScrollView, Text, TextInput, View } from "react-native";
import { router } from "expo-router";

// type for old user credentials
type OldUserCredentials = {
  // displayed at the header
  username: string;
};

// type for new user credentials
type NewUserCredentials = {
  // should accept the new username
  newUsername: string;

  // should accept the new password
  newPassword: string;

  // should check if it matches newly entered password
  confirmPassword: string;
};

// placeholder for old data
const OLDDATA: OldUserCredentials = { username: "jalanie" };

// placeholder for new data

export default function EditProfile() {
  return (
    <>
      {/* scroll style */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* green bg for aesthetics lols  */}
        <View style={styles.greenBg}>
          {/* icon and username wrapper */}
          <View style={styles.iconAndUsernameWrapper}>
            {/* icon */}
            <View style={styles.iconView}></View>

            {/* old username displayed */}
            <Text style={styles.displayedUsername}>{OLDDATA.username}</Text>
          </View>

          {/* form field */}
          <View style={styles.formField}>
            {/* username */}
            <View style={styles.labelAndInput}>
              <Text style={styles.label}>Username</Text>
              <TextInput style={styles.input} placeholder="Enter new username"></TextInput>
            </View>

            {/* password */}
            <View style={styles.labelAndInput}>
              <Text style={styles.label}>Password</Text>
              <TextInput style={styles.input} placeholder="Enter new password"></TextInput>
            </View>

            {/* confirm pass */}
            <View style={styles.labelAndInput}>
              <Text style={styles.label}>Confirm Password</Text>
              <TextInput style={styles.input} placeholder="Confirm new password"></TextInput>
            </View>
          </View>
        </View>

        {/* buttons for saving */}
        <View style={styles.bottomButtonsWrapper}>
          {/* save changes */}
          <TouchableOpacity style={styles.saveChangesButton} onPress={() => router.back()}>
            <Text style={styles.saveChangesLabel}>Save Changes</Text>
          </TouchableOpacity>
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
    backgroundColor: "#aaa",
    margin: 10,
    borderRadius: 100,
  },
  displayedUsername: {
    fontSize: 24,
    fontFamily: "helvetica",
    fontWeight: "900",
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
    fontFamily: "helvetica",
    marginVertical: 5,
    color: "#fff",
    fontSize: 14,
  },
  input: {
    backgroundColor: "#fff",
    fontSize: 18,
    fontFamily: "helvetica",
    padding: 8,
    borderRadius: 5,
    color: "#3d3d3d",
    borderWidth: 1,
    borderColor: "#3d3d3d",
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
    padding: 10,
    borderRadius: 5,
    elevation: 10,
    shadowColor: "#AAA",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10, // This controls the blur
  },
  saveChangesLabel: {
    fontFamily: "helvetica",
    fontSize: 16,
    fontWeight: "600",
    color: "#3d3d3d",
  },
});
