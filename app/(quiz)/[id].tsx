import React from "react";
import { View, Text } from "react-native";

// render return value depends on the context given
// ex. if context='answer', then render quiz screen made for answering
// if context='edit', then render quiz screen made for editing quiz

// quiz component
export default function Quiz() {
  return (
    <>
      <View>
        <Text>this is quiz component</Text>
      </View>
    </>
  );
}
