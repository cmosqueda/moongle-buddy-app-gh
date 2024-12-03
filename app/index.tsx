import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { Redirect } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";

export default function Index() {
  return (
    <>
      <Redirect href="/(main)"></Redirect>
    </>
  );
}

const mainStyles = StyleSheet.create({});
