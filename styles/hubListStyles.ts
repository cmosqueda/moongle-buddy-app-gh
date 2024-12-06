import { StyleSheet } from "react-native";

const hubListStyles = StyleSheet.create({
  container: {
    marginVertical: 10,
    paddingHorizontal: 20,
    width: "100%",
  },
  headerView: {
    flexDirection: "row",
    margin: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: "Poppins-Black",
    color: "#3D3D3D",
    // fontWeight: "900",
  },
  plusButton: {
    width: 60,
    backgroundColor: "#FF6B6B",
    alignItems: "center",
    borderRadius: 100,
    padding: 5,
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
    fontSize: 16,
    // fontWeight: "bold",
    fontFamily: "Poppins-Bold",
    color: "#3d3d3d",
  },
  ownedByLabel: {
    fontFamily: "Poppins-Regular",
    color: "#3D3D3D",
  },
});

export default hubListStyles;
