import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, StyleSheet } from "react-native";

const Community = () => {
  return (
    <SafeAreaView style={styles.Container}>
      <Text>Community</Text>
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
