import React from "react";
import { Text, View, TextInput, StyleSheet } from "react-native";

const SearchInput = () => {
  return (
    <View style={styles.Container}>
      <TextInput
        style={styles.Input}
        placeholder={"Enter pokemo name or id"}
        placeholderTextColor={"grey"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    backgroundColor: "blue",
    height: 50,
    alignSelf: "flex-start",
    top: 0,
    justifyContent: "flex-start",
  },
  Input: {
    borderBottomWidth: 2,
    borderColor: "#2ecc71",
    width: "90%",
    textAlign: "center",
    fontSize: 20,
  },
});

export default SearchInput;
