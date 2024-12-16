import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    padding: 20,
    justifyContent: "center",
  },
  quizTitle: {
    fontFamily: "Poppins-Black",
    fontSize: 20,
    textAlign: "center",
    marginVertical: 5,
    color: "#3d3d3d",
  },
  lineBreak: {
    height: 1,
    backgroundColor: "#aaa",
    marginVertical: 10,
  },
  question: {
    fontFamily: "Poppins-Bold",
    fontSize: 20,
    // fontWeight: "bold",
    marginVertical: 20,
    color: "#333",
  },
  optionsContainer: {
    marginBottom: 20,
  },
  option: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    marginVertical: 5,
  },
  selectedOption: {
    backgroundColor: "#FFF7D1",
    borderColor: "#FFEB8D",
  },
  optionText: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: "#333",
  },
  navigation: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  navButton: {
    backgroundColor: "#4ECDC4",
    padding: 15,
    borderRadius: 10,
  },
  disabledNavButton: {
    backgroundColor: "#9AEBE5",
  },
  navButtonText: {
    fontFamily: "Poppins-Regular",
    color: "#fff",
    fontSize: 16,
  },
  resultsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  resultsText: {
    fontFamily: "Poppins-Bold",
    fontSize: 20,
    // fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#3d3d3d",
  },
  restartButton: {
    backgroundColor: "#4ECDC4",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  restartButtonText: {
    fontFamily: "Poppins-Regular",
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  exitButton: {
    backgroundColor: "#FF6F61",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  exitButtonText: {
    fontFamily: "Poppins-Regular",
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },

  // loading
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
  },

  loadingIndicator: {
    marginVertical: 20,
  },

  loadingIndicatorText: {},

  // error
});
