import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

type UserAccount = {
  planStatus: string;
};

const DATA: UserAccount = {
  planStatus: "basic plan",
};

export const PlanStatus = () => {
  return (
    <>
      <TouchableOpacity style={styles.statusButton}>
        <Text style={styles.statusLabel}>You are using the {DATA.planStatus}</Text>
      </TouchableOpacity>
    </>
  );
};

// diri ko nag stop katulgon nakayko

const styles = StyleSheet.create({
  statusButton: {
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    paddingVertical: 5,
    borderRadius: 30,
    borderColor: "#4ecdc4",
    margin: 5,
  },

  statusLabel: {
    color: "#4ecdc4",
    fontFamily: "Poppins-Regular",
    margin: 5,
  },
});
