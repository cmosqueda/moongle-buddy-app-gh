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
  timestamp: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
    fontFamily: "Poppins-Regular",
  },
});

export default hubScreensStyles;
