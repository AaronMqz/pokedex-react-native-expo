import React from "react";
import { View, Text, StyleSheet } from "react-native";
import i18n from "../languages/i18n";

const getRandomFavlorText = (items) => {
  if (items && items.length > 0) {
    return items[Math.floor(Math.random() * items.length)];
  } else {
    return i18n.t("detail.emptydescription");
  }
};

const PokemoDescription = ({ items }) => {
  return (
    <View style={styles.Container}>
      <Text style={styles.Text}>
        {`${getRandomFavlorText(items)}`} {i18n.t("detail.randomdescription")}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 15,
    width: "100%",
  },
  Text: {
    textAlign: "justify",
    fontSize: 16,
  },
});

export default PokemoDescription;
