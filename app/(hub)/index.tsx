import { FilesList } from "@/hub-components/filesList";
import { HubHeader } from "@/hub-components/hubHeader";
import React from "react";
import { ScrollView, View, Text } from "react-native";

// hub entry point index + files screen

export default function Files() {
  return (
    <>
      {/* scroll style */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* parent view */}

        <View>
          {/* hub header => hub details */}
          <HubHeader></HubHeader>

          {/* file list*/}
          <FilesList></FilesList>
        </View>
      </ScrollView>
    </>
  );
}
