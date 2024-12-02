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
    borderColor: "#3d3d3d",
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
    fontFamily: "helvetica",
    marginHorizontal: 10,
    color: "#fff",
    fontWeight: "900",
  },
});
