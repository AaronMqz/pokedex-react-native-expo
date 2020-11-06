import React from "react";
import { SafeAreaView, Text, StyleSheet } from "react-native";
import LanguageComponent from "../components/LanguageComponent";

const Community = () => {
  return (
    <SafeAreaView style={styles.Container}>
      <LanguageComponent />
      <Text>Community </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Community;
