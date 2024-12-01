import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import { ProfileHeader } from "@/profile-components/profileHeader";
import { PlanStatus } from "@/profile-components/planStatus";
import { profileStyles } from "@/styles/mainScreenStyles";

export default function Profile() {
  return (
    <>
      {/* scroll container */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* parent view */}
        <View style={profileStyles.parentView}>
          {/* green bg */}
          <View style={profileStyles.profileHeaderBg}></View>

          {/* profile account header */}
          <ProfileHeader></ProfileHeader>

          {/* content place */}
          <View style={profileStyles.contentPlace}>
            {/* plan status */}
            <PlanStatus></PlanStatus>

            {/* show badges / achievements */}

            {/* retention tracker */}
          </View>
        </View>
      </ScrollView>
    </>
  );
}
