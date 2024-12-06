import { View, Text, StyleSheet } from "react-native";
import { PlanStatus } from "./planStatus";
import React from "react";

type User = {
  username: string;
  level: number;
};

// placeholder
const DATA: User = { username: "jalanie", level: 3 };

export const ProfileHeader = () => {
  return (
    <>
      {/* parent view */}
      <View style={styles.parentView}>
        {/* icon and level */}
        <View style={styles.iconLevelWrap}>
          {/* icon */}
          <View style={styles.icon}></View>

          {/* level */}
          <Text style={styles.levelNo}>Level {DATA.level}</Text>
        </View>

        {/* username */}
        <Text style={styles.userName}>{DATA.username}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  parentView: {
    alignItems: "center",
    width: "85%",
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 10,

    shadowColor: "#AAA",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10, // This controls the blur
    padding: 15,
    margin: 10,

    // position: "absolute",
  },
  iconLevelWrap: {
    alignItems: "center",
    marginVertical: 10,
  },
  icon: {
    width: 110,
    height: 110,
    borderRadius: 100,
    backgroundColor: "#aaa",
    margin: 10,
  },
  levelNo: {
    fontFamily: "Poppins-Regular",
    color: "#3d3d3d",
    // fontWeight: "700",
  },
  userName: {
    fontFamily: "Poppins-Black",
    // fontWeight: "900",
    fontSize: 24,
    color: "#3d3d3d",
    // margin: 10,
  },
});
