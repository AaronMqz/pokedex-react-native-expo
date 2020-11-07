import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import i18n from "../languages/i18n";

import LanguageComponent from "../components/LanguageComponent";
import Type from "../components/Type";
import { getMyFavorites } from "../redux/pokemonDuck";
import { typeColors } from "../utils/colors";

const { width } = Dimensions.get("window");

const Favorites = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const myFavorites = useSelector((state) => state.pokemonReducer.myFavorites);
  const currentLanguageIndex = useSelector(
    (state) => state.pokemonReducer.currentLanguageIndex
  );
  const languages = useSelector((state) => state.pokemonReducer.languages);
  const [languageChanged, setLanguageChanged] = useState(i18n.locale);

  useEffect(() => {
    i18n.locale = languages[currentLanguageIndex];
    setLanguageChanged(i18n.locale);
  }, [currentLanguageIndex]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: i18n.t("favorites.title"),
    });
  }, [languageChanged]);

  useEffect(() => {
    if (myFavorites.length === 0) {
      dispatch(getMyFavorites());
    }
  }, []);

  const renderItem = ({ item }) => {
    const pickFirstType = item.types.find((e) => !!e);
    const getColorType = typeColors[pickFirstType.type.name];

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("Detail", { pokemon: item })}
      >
        <LanguageComponent />
        <View style={styles.Card}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <Text style={styles.CardHeaderTitleNumber}>
              #{item.id.toString().padStart(3, "0")}
            </Text>
            <Text style={styles.CardTitle}>{item.name}</Text>
            <View style={styles.CardHeaderSubtitle}>
              <Type types={item.types} colorType={getColorType} />
            </View>
          </View>
          <Image
            source={{ uri: item.spriteDeafult }}
            style={styles.CardImage}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.Container}>
      <LanguageComponent />
      <FlatList
        data={myFavorites}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        numColumns={1}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  Card: {
    flexDirection: "row",
    borderRadius: 5,
    backgroundColor: "#fff",
    width: width - 20,
    height: width / 3,
    marginTop: 10,
    marginRight: 2,
    marginLeft: 2,
    marginBottom: 5,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.4,
    shadowRadius: 1,
    elevation: 6,
  },
  CardTitle: {
    color: "#000",
    fontSize: 25,
    marginLeft: 10,
  },
  CardImage: {
    height: "100%",
    aspectRatio: 1,
  },
  CardHeaderTitleNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginLeft: 10,
  },
  CardHeaderSubtitle: {
    flexDirection: "row",
    marginLeft: 10,
  },
});

export default Favorites;
