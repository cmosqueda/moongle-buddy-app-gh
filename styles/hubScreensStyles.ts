import { StyleSheet } from "react-native";

// para styles sa files list ug quizzes list
const hubScreensStyles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 10,
    // width: "100%",
  },
  item: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  itemTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: 16,
    color: "#3d3d3d",
    // fontWeight: "bold",
  },
  ownedByLabel: {
    fontFamily: "Poppins-Regular",
    color: "#3d3d3d",
  },

  errorText: {
    fontFamily: "Poppins-Regular",
    color: "#FF6B6B",
  },

  timestamp: {
    fontFamily: "Poppins-Regular",
    color: "#3d3d3d",
    fontSize: 12,
  },
});

export default hubScreensStyles;
