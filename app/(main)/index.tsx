// main exports

// export { default as Home } from "./home";
export { default as Options } from "./options";
export { default as Profile } from "./profile";

// --------------------
// main entrypoint + home

import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import { HubRecents } from "@/home-components/hubRecents";
import { FileRecents } from "@/home-components/fileRecents";
import { QuizRecents } from "@/home-components/quizRecents";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { UserHeader } from "@/home-components/userHeader";

export default function Home() {
  return (
    <>
      {/* scroll style view */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* parent view */}
        <View style={homeStyles.parentView}>
          {/* background */}
          <View style={homeStyles.userHeaderBg}></View>

          {/* heading for streak tracking */}
          <UserHeader></UserHeader>

          {/* FLAT LIST, api to retrieve recently opened hubs, limit to up to 3 */}
          {/* <HubRecents></HubRecents> */}

          {/* FLAT LIST, api to retrieve data of recently opened files, limit to up to 3 */}
          <FileRecents></FileRecents>

          {/* FLAT LIST, api to retrieve data of recently opened quiz, limit to up to 3 */}
          {/* <QuizRecents></QuizRecents> */}
        </View>
      </ScrollView>
    </>
  );
}

const homeStyles = StyleSheet.create({
  parentView: {
    // alignItems: "center",
    alignItems: "center",
  },
  userHeaderBg: {
    height: 140,
    backgroundColor: "#4ECDC4",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    // padding: 100,
    width: "100%",
  },
});

// --------------------
