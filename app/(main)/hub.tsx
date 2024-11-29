// study hub screen

import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { HubList } from "@/hub-components/hubList";
import { SafeAreaView } from "react-native-safe-area-context";

// --------------------

export default function Hub() {
  return (
    <>
      {/* scroll style */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* parent view */}
        <View>
          {/* study hub list, diri ang mga study hubs mabutang */}
          <HubList></HubList>
        </View>
      </ScrollView>
    </>
  );
}

// --------------------
