import React from "react";
import { View, Dimensions, Text } from "react-native";

const { width } = Dimensions.get("window");

const Slider = ({ label, value, range, colorType }) => {
  return (
    <View
      style={{
        flexDirection: "column",
        width: "100%",
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <View
          style={{
            backgroundColor: "white",
            width: width - 280,
            flexDirection: "row",
            justifyContent: "space-between",
            paddingRight: 10,
          }}
        >
          <Text>{label}</Text>
          <Text>{value}</Text>
        </View>
        <View
          style={{
            backgroundColor: "#E0E0E0",
            flex: 1,
            height: 7,
            marginBottom: 20,
            marginTop: 5,
            borderTopRightRadius: 5,
            borderTopLeftRadius: 5,
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
          }}
        >
          <View
            style={{
              backgroundColor: colorType,
              height: 7,
              width: `${value / range}%`,
              borderTopRightRadius: 5,
              borderTopLeftRadius: 5,
              borderBottomLeftRadius: 5,
              borderBottomRightRadius: 5,
            }}
          ></View>
        </View>
      </View>
    </View>
  );
};

export default Slider;
