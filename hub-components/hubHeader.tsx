import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

// hub header

// type
type HubDetails = {
  OwnerId: string;
  OwnerUsername: string;
  HubName: string;
};

const DATA: HubDetails = { OwnerId: "1", OwnerUsername: "jalanie", HubName: "Hub 1" };

export const HubHeader = () => {
  return (
    <>
      {/* parent view or container */}
      <View style={styles.parentView}>
        {/* hub details view */}
        <View style={styles.hubDetailsView}>
          {/* hub owner */}
          <Text style={styles.hubOwner}>Owned by {DATA.OwnerUsername}</Text>

          {/* hub title */}
          <Text style={styles.hubName}>{DATA.HubName}</Text>
        </View>

        <TouchableOpacity style={styles.createButton}>
          <Text style={styles.createButtonText}>Create</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  parentView: {
    margin: 20,
    borderWidth: 1,
    // alignItems: "center",
    borderRadius: 5,
    borderColor: "#aaa",
    backgroundColor: "#fff",

    // shadow effect
    elevation: 10,

    shadowColor: "#AAA",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10, // This controls the blur
  },
  hubDetailsView: {
    // width: "90%",
    margin: 15,
  },
  hubOwner: {
    fontSize: 14,
    fontFamily: "helvetica",
    fontStyle: "italic",
    marginVertical: 5,
    color: "#3d3d3d",
  },
  hubName: {
    fontSize: 24,
    fontFamily: "helvetica",
    fontWeight: "900",
    color: "#3d3d3d",
  },
  createButton: {
    padding: 10,
    // borderWidth: 1,
    margin: 15,
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "#FF6B6B",
  },
  createButtonText: {
    fontSize: 16,
    fontFamily: "helvetica",
    color: "#fff",
  },
});
