import React from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Text,
  Image,
} from "react-native";

const { height } = Dimensions.get("window");

const Detail = ({ route }) => {
  const pokemon = route.params.pokemon;

  return (
    <SafeAreaView style={styles.Container}>
      <ScrollView style={styles.ContainerScroll}>
        <View style={styles.Card}>
          <View style={styles.CardHeader}>
            <Image
              source={{
                uri: pokemon.sprites.other["official-artwork"].front_default,
              }}
              style={styles.CardImage}
            />
          </View>
          <View style={styles.CardBody}></View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  ContainerScroll: {},
  Card: {
    backgroundColor: "pink",
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 20,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  CardHeader: {},
  CardBody: {
    backgroundColor: "green",
    height: 400,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  CardImage: {
    height: 400,
    width: "100%",
  },
});

export default Detail;
