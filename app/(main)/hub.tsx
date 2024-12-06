// study hub screen

import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
// import { HubList } from "@/hub-components/hubList";
import { HubList } from "../../hub-components/hubList";
import { SafeAreaView } from "react-native-safe-area-context";
import { CreateHub } from "../../hub-components/createHub";
import { hubStyles } from "../../styles/mainScreenStyles";

// --------------------

export default function Hub() {
  return (
    <>
      {/* scroll style */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* parent view */}
        <View style={hubStyles.parentView}>
          {/* diri nalang ibutang ang create a hub nga header */}
          <CreateHub></CreateHub>
          {/* study hub list, diri ang mga study hubs mabutang */}
          <HubList></HubList>
        </View>
      </ScrollView>
    </>
  );
}

// --------------------
