import { StyleSheet } from "react-native";

const authStyles = StyleSheet.create({
  scrollStyle: {
    flexDirection: "column",
    backgroundColor: "#F8F8F8",
  },
  parentView: {
    alignSelf: "center",
    marginVertical: 70,
    marginHorizontal: 40,
  },
  logo: {},
  screenLabel: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    marginVertical: 10,
    fontFamily: "helvetica",
    textAlign: "center",
    color: "#3D3D3D",
  },
  subTitle: {
    fontSize: 15,
    fontFamily: "helvetica",
    textAlign: "center",
    color: "#3D3D3D",
  },
  formArea: {
    marginVertical: 20,
  },
  textInput: {
    height: 35,
    fontSize: 15,
    borderWidth: 1,
    padding: 5,
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: "white",
    fontFamily: "helvetica",

    // shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  continueButton: {
    height: 35,
    // borderWidth: 1,
    marginVertical: 5,
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#4ECDC4",

    // shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  continueLabel: {
    fontFamily: "helvetica",
    color: "white",
  },
  switchScreenView: {
    alignSelf: "center",
  },
  switchScreenText: {
    fontFamily: "helvetica",
    color: "#3D3D3D",
  },
  toSingupLink: {
    color: "#4ECDC4",
  },
  forgotPassText: {
    color: "#4ECDC4",
  },
});

export default authStyles;
