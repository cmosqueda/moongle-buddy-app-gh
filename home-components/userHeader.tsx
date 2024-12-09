import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { useAuth } from "@/utilities/authProvider";
import { FontAwesome } from "@expo/vector-icons";

type User = {
  username: string;
  level: number;
};

export const UserHeader = () => {
  const { user } = useAuth();

  const DATA: User = { username: user?.username, level: 3 };

  return (
    <>
      {/* parent container */}
      <View style={styles.parentView}>
        {/* text views */}
        <View style={styles.textsView}>
          {/* heading - name with greeting*/}
          <Text style={styles.heading}>Hi, {DATA.username}!</Text>

          {/* subheading - catch phrase */}
          <Text style={styles.catchPhrase}>Let's review while having fun!</Text>
        </View>

        {/* icon view */}
        <View style={styles.iconView}>
          <View style={styles.icon}>
            <FontAwesome name="user-circle" color={"#fff"} size={40}></FontAwesome>
          </View>

          <Text style={styles.levelLabel}>Level {DATA.level}</Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  parentView: {
    width: "85%",
    // height: "20%",
    margin: 10,
    padding: 20,
    // position: "absolute",
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#AAA",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10, // This controls the blur
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 5,
  },
  textsView: {
    // alignItems: "center",
    // marginVertical: 3,
  },
  heading: {
    fontFamily: "Poppins-Black",
    fontSize: 24,
    // fontWeight: "900",
    color: "#3d3d3d",
    marginVertical: 0,
  },
  catchPhrase: {
    fontFamily: "Poppins-Italic",
    textAlign: "center",
    fontSize: 13,
  },
  iconView: {
    flexDirection: "column",
    alignItems: "center",
  },
  icon: {
    backgroundColor: "#4ecdc4",
    height: 60,
    width: 60,
    marginVertical: 5,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    //
  },
  levelLabel: {
    fontFamily: "Poppins-Regular",
  },
});
