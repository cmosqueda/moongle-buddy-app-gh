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
  logoView: {
    alignItems: "center",
    marginVertical: 10,
  },
  logo: {
    width: 100,
    height: 100,
  },
  screenLabel: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    // fontWeight: "800",
    marginVertical: 10,
    fontFamily: "Poppins-Black",
    textAlign: "center",
    color: "#3D3D3D",
  },
  subTitle: {
    fontSize: 15,
    fontFamily: "Poppins-Regular",
    textAlign: "center",
    color: "#3D3D3D",
  },
  formArea: {
    marginVertical: 20,
  },
  textInput: {
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
  continueButton: {
    height: 50,
    // borderWidth: 1,
    marginVertical: 5,
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#4ECDC4",

    // shadow
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 10,
  },
  continueLabel: {
    fontFamily: "Poppins-Regular",
    color: "white",
    fontSize: 16,
  },
  switchScreenView: {
    alignSelf: "center",
  },
  switchScreenText: {
    fontFamily: "Poppins-Regular",
    color: "#3D3D3D",
  },
  toSingupLink: {
    color: "#4ECDC4",
  },
  forgotPassText: {
    color: "#4ECDC4",
  },

  // validation
  isFalseText: {
    color: "#FF6B6B",
    fontFamily: "Poppins-Regular",
  },
});

export default authStyles;
