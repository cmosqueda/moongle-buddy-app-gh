// import { FilesList } from "@/hub-components/filesList";
// import { HubHeader } from "@/hub-components/hubHeader";
import { useRouter } from "expo-router";
import { FilesList } from "@/hub-components/filesList";
import { HubHeader } from "@/hub-components/hubHeader";
import React, { useEffect, useState } from "react";
import { ScrollView, View, Text } from "react-native";
import { useSearchParams } from "expo-router/build/hooks";
// import { useLocalSearchParams } from "expo-router/build/hooks";

// hub entry point index + files screen

export default function Files() {
  return (
    <>
      {/* scroll style */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* parent view */}

        <View>
          {/* hub header => hub details */}
          {/* <HubHeader></HubHeader> */}
          {/* <HubHeader></HubHeader> */}

          {/* file list*/}
          <FilesList></FilesList>
        </View>
      </ScrollView>
    </>
  );
}
