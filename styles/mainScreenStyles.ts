import { StyleSheet } from "react-native";

// home styles
export const homeStyles = StyleSheet.create({
  parentView: {
    // justifyContent: "center",
    alignItems: "center",
  },
  userHeaderBg: {
    height: 100,
    backgroundColor: "#4ECDC4",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    // padding: 100,
    width: "100%",
    position: "absolute",
    // top: 0,
  },
});

// hub styles
export const hubStyles = StyleSheet.create({
  parentView: {
    // margin: 20,
    // justifyContent: "center",
    // alignItems: "center",
  },
});

// options styles

// profile styles
export const profileStyles = StyleSheet.create({
  parentView: {
    alignItems: "center",
    // justifyContent: "center",
  },
  profileHeaderBg: {
    height: 130,
    backgroundColor: "#4ecdc4",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    width: "100%",
    position: "absolute",
  },

  contentPlace: {
    width: "100%",
    alignItems: "center",
    marginVertical: 20,
  },
});
