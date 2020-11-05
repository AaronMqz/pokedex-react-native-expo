import React from "react";
import { Text, SafeAreaView, StyleSheet } from "react-native";

const Search = () => {
  return (
    <SafeAreaView style={styles.Conatiner}>
      <Text>Search</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Conatiner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Search;
