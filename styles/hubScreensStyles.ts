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
    fontFamily: "helvetica",
    fontSize: 16,
    color: "#3d3d3d",
    fontWeight: "bold",
  },
  ownedByLabel: {
    fontFamily: "helvetica",
    color: "#3d3d3d",
  },
});

export default hubScreensStyles;
