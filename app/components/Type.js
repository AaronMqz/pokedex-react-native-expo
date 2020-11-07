import React from "react";
import { View, StyleSheet, Text } from "react-native";

const Type = ({ types, colorType }) => {
  return (
    <React.Fragment>
      {types.map((type, index) => {
        return (
          <View
            key={index}
            style={[styles.TypeStyle, { backgroundColor: colorType }]}
          >
            <Text style={styles.TypeStyleText}>{type.type.name}</Text>
          </View>
        );
      })}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  TypeStyle: {
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    borderTopRightRadius: 14,
    borderTopLeftRadius: 14,
    borderWidth: 1,
    borderColor: "#eee",
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 3,
    marginRight: 5,
    marginTop: 5,
    height: 30,
    justifyContent: "center",
  },
  TypeStyleText: {
    color: "#fff",
  },
});

export default Type;
