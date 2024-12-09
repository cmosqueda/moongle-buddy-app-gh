import { View, Text, StyleSheet } from "react-native";
import { PlanStatus } from "./planStatus";
import React from "react";
import { useAuth } from "@/utilities/authProvider";
import { FontAwesome } from "@expo/vector-icons";

type User = {
  username: string;
  level: number;
};

export const ProfileHeader = () => {
  // placeholder
  const { user } = useAuth();
  const DATA: User = { username: user?.username, level: 3 };
  return (
    <>
      {/* parent view */}
      <View style={styles.parentView}>
        {/* icon and level */}
        <View style={styles.iconLevelWrap}>
          {/* icon */}
          <View style={styles.icon}>
            <FontAwesome name="user-circle" size={80} color={"#fff"}></FontAwesome>
          </View>

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
    backgroundColor: "#4ecdc4",
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
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
