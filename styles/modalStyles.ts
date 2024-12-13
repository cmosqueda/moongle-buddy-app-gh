import { StyleSheet } from "react-native";

const modalStyles = StyleSheet.create({
  modal: {
    // flex: 1,
    // height: "100%",
  },
  overlay: {
    flex: 1,
    // height: "40%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  bottomSheet: {
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: "absolute",
    bottom: 0,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  sheetTitle: {
    fontSize: 24,
    fontFamily: "Poppins-Black",
    color: "#3d3d3d",
  },
  inputWrapperView: {
    width: "80%",
    marginVertical: 5,
  },
  inputLabel: {
    marginVertical: 5,
    fontSize: 14,
    fontFamily: "Poppins-Regular",
  },
  inputField: {
    height: 50,
    fontSize: 16,
    borderWidth: 1,
    padding: 5,
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: "white",
    fontFamily: "Poppins-Regular",
    borderColor: "#aaa",
  },

  // for close & continue buttons
  twoColButtonWrapperView: {
    width: "70%",
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  cancelButton: {
    backgroundColor: "#FF6B6B",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  cancelButtonText: {
    fontFamily: "Poppins-Bold",
    color: "#fff",
  },
  continueButton: {
    backgroundColor: "#FFE66D",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    // borderWidth: 1,
  },
  continueButtonText: {
    fontFamily: "Poppins-Bold",
    color: "#3d3d3d",
  },

  //   para sa uploads file list
  uploadAreaButton: {
    alignItems: "center",
    paddingVertical: 20,
    marginVertical: 10,
    // backgroundColor: "#4ecdc4",
    borderWidth: 2,
    borderStyle: "dashed",
    borderRadius: 5,
    borderColor: "#4ecdc4",
  },
  uploadAreaText: {
    fontFamily: "Poppins-Italic",
    color: "#4ecdc4",
  },

  //   flat list wrapper
  flatListWrapper: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ccc",
    height: 130,
  },

  //
  uploadedFileItem: {
    flexDirection: "row",
    margin: 5,
    justifyContent: "space-between",
    alignItems: "center",
  },
  uploadedFileTitle: {
    fontFamily: "Poppins-Regular",
    color: "#aaa",
  },
  uploadedFileDelIcon: {
    marginVertical: 3,
  },

  //
  fileEmptyText: {
    textAlign: "center",
    marginVertical: 10,
    fontFamily: "Poppins-Regular",
    color: "#aaa",
  },

  // quiz action modal
  actionButtonsWrapper: {
    flexDirection: "row",
    marginVertical: 20,
    justifyContent: "center",
  },

  actionButtonColWrapper: {},
  redActionButton: {
    backgroundColor: "#FF6B6B",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 5,
    margin: 5,
  },
  yellowActionButton: {
    backgroundColor: "#FFE66D",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 5,
    margin: 5,
  },
  greenActionButton: {
    backgroundColor: "#4ecdc4",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 5,
    margin: 5,
  },
  lightButtonLabel: {
    fontFamily: "Poppins-Bold",
    color: "#fff",
  },
  darkButtonLabel: {
    fontFamily: "Poppins-Bold",
    color: "#3d3d3d",
  },

  // quiz id label:
  quizIdLabel: {
    fontFamily: "Poppins-Italic",
    color: "#3d3d3d",
  },
});

export default modalStyles;
