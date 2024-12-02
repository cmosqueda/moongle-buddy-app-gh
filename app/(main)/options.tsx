import { View, Text, ScrollView } from "react-native";
import React from "react";
import { UnderConstruction } from "@/allPurpose-components/underConstruction";
import { LogoutButton } from "@/options-components/logoutButton";

export default function Options() {
  return (
    <>
      {/* scroll style */}
      <ScrollView>
        {/* parent view */}
        <View>
          {/* under construction lmao */}
          {/* <UnderConstruction></UnderConstruction> */}

          {/* mga buttons */}
          <LogoutButton></LogoutButton>
        </View>
      </ScrollView>
    </>
  );
}
