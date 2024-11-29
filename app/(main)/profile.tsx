import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";

export default function Profile() {
  return (
    <>
      {/* scroll container */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* parent view */}
        <View style={profileStyles.parentView}>
          {/* background */}
          <View style={profileStyles.profileHeaderBg}></View>
        </View>
      </ScrollView>
    </>
  );
}

// diri ko nag stop
const profileStyles = StyleSheet.create({
  parentView: {
    alignItems: "center",
  },
  profileHeaderBg: {
    height: 140,
    backgroundColor: "#4ecdc4",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    width: "100%",
  },
});
