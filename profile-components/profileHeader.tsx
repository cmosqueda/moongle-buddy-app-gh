import { View, Text, StyleSheet } from "react-native";

type User = {
  username: string;
  accountPlan: string;
};

const DATA: User = { username: "jalanie", accountPlan: "basic plan" };

export const ProfileHeader = () => {
  return (
    <>
      {/* container */}
      <View>
        {/* profile icon */}
        <View></View>

        {/* name */}
      </View>
    </>
  );
};

const styles = StyleSheet.create({});
