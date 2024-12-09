// style for options button component

// logout button

import { StyleSheet } from "react-native";

export const logoutButtonStyles = StyleSheet.create({
  button: {
    // flexDirection: "row",
    // alignItems: "center",
    // justifyContent: "space-between",
    margin: 10,
    // borderWidth: 1,
    // borderColor: "#3d3d3d",
    borderRadius: 5,
    backgroundColor: "#FF6B6B",
  },
  wrapper: {
    margin: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    color: "#fff",
  },
  label: {
    fontFamily: "Poppins-Black",
    marginHorizontal: 10,
    color: "#fff",
    // fontWeight: "900",
  },
});

// style for button dummy loading screen and splash screen
export const triggerDummyScreens = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    padding: 15,
    backgroundColor: "#aaa",
    borderRadius: 5,
  },
  buttonText: {
    fontFamily: "Poppins-Regular",
    // fontSize: 18,
    // fontWeight: "900",
    color: "#fff",
  },
});
