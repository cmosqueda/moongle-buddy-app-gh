import { StyleSheet } from "react-native";

const hubListStyles = StyleSheet.create({
  container: {
    marginVertical: 10,
    paddingHorizontal: 20,
    width: "100%",
  },
  headerView: {
    flexDirection: "row",
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: "helvetica",
    color: "#3D3D3D",
    fontWeight: "bold",
  },
  plusButton: {
    width: 50,
    backgroundColor: "#4ECDC4",
    alignItems: "center",
    borderRadius: 100,
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
    fontWeight: "bold",
    fontFamily: "helvetica",
    color: "#3d3d3d",
  },
  ownedByLabel: {
    fontFamily: "helvetica",
    color: "#3D3D3D",
  },
});

export default hubListStyles;
