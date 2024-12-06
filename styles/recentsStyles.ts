import { StyleSheet } from "react-native";

const recentStyles = StyleSheet.create({
  container: {
    // flex: 1,
    marginVertical: 10,
    paddingHorizontal: 20,
    width: "100%",
  },
  header: {
    fontSize: 24,
    // fontWeight: "900",
    marginVertical: 5,
    fontFamily: "Poppins-Black",
    color: "#3D3D3D",
  },
  item: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  title: {
    fontSize: 16,
    // fontWeight: "bold",
    fontFamily: "Poppins-Bold",
    color: "#3D3D3D",
  },
  ownedByLabel: {
    fontFamily: "Poppins-Regular",
    color: "#3D3D3D",
  },
});

export default recentStyles;
