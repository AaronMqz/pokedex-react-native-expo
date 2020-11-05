import React from "react";
import { SafeAreaView, Text, StyleSheet } from "react-native";

const Favorites = () => {
  return (
    <SafeAreaView style={styles.Container}>
      <Text>Favorites</Text>
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

export default Favorites;
