import { View, Text, ScrollView } from "react-native";
import React from "react";
// import { UnderConstruction } from "@/allPurpose-components/underConstruction";
import { LogoutButton } from "../../options-components/logoutButton";
// import { TriggerSplash } from "@/options-components/triggerSplash";
import { TriggerLoading } from "@/options-components/triggerLoadingButton";
// import { useSplashScreen } from "@/hooks";
// import { useLoadingScreen } from "@/hooks";
// import { useLoadingScreen } from "hooks/useLoadingScreen";
// import { useLoadingScreen } from "../../hooks";
// import LoadingScreen from "../../transitional-screens/loadingScreen";
import { FirebaseTestRead, FirebaseTestWrite } from "@/options-components/triggerFirebaseTests";

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

          {/* dummy to trigger splash screen */}
          {/* <TriggerSplash></TriggerSplash> */}

          {/* dummy to ttrigger loading screen */}
          <TriggerLoading></TriggerLoading>

          {/* trigger firebase tests */}
          <FirebaseTestWrite></FirebaseTestWrite>
          <FirebaseTestRead></FirebaseTestRead>
        </View>
      </ScrollView>
    </>
  );
}
