// main exports

// export { default as Home } from "./home";
export { default as Options } from "./options";
export { default as Profile } from "./profile";

// --------------------
// main entrypoint + home

import { View, ScrollView, StyleSheet } from "react-native";
import React from "react";
import { FileRecents } from "@/home-components/fileRecents";
import { UserHeader } from "@/home-components/userHeader";
import { homeStyles } from "@/styles/mainScreenStyles";

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

// --------------------

// styles can be found at styles >> mainScreenStyles.ts
