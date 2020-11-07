import React, { useEffect, useState, useMemo, useLayoutEffect } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Text,
  Image,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import i18n from "../languages/i18n";

import {
  getPokemonSpeciesAction,
  cleanPokemonSpeciesAction,
  getPokemonListAction,
  saveMyFavorite,
  deleteMyFavorite,
} from "../redux/pokemonDuck";

const { height, width } = Dimensions.get("window");

const Type = ({ types }) => {
  return (
    <React.Fragment>
      {types.map((type, index) => {
        return (
          <View key={index} style={styles.TypeStyle}>
            <Text style={styles.TypeStyleText}>{type.type.name}</Text>
          </View>
        );
      })}
    </React.Fragment>
  );
};

const formatingStatsName = (stat) => {
  let statsMap = {
    hp: i18n.t("detail.hp"),
    attack: i18n.t("detail.attack"),
    defense: i18n.t("detail.defense"),
    "special-attack": i18n.t("detail.spatk"),
    "special-defense": i18n.t("detail.spdef"),
    speed: i18n.t("detail.speed"),
  };
  return statsMap[stat];
};

const Slider = ({ label, value }) => {
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
            backgroundColor: "grey",
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
              backgroundColor: "red",
              height: 7,
              width: `${value}%`,
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

const SliderPokemonStats = ({ stats }) => {
  return (
    <React.Fragment>
      {stats.map((stat, index) => {
        return (
          <Slider
            key={index}
            label={formatingStatsName(stat.stat.name)}
            value={stat.base_stat}
          />
        );
      })}
    </React.Fragment>
  );
};

const getRandomFavlorText = (items) => {
  if (items && items.length > 0) {
    return items[Math.floor(Math.random() * items.length)];
  } else {
    return i18n.t("detail.emptydescription");
  }
};

const TextPokemoDescription = ({ items }) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
      }}
    >
      <View
        style={{
          marginTop: 10,
          marginBottom: 15,
          width: "100%",
        }}
      >
        <Text style={{ textAlign: "justify", fontSize: 16 }}>
          {`${getRandomFavlorText(items)}`} {i18n.t("detail.randomdescription")}
        </Text>
      </View>
    </View>
  );
};

const FavoriteIcon = ({ isFavorite, onPress }) => {
  //const [isFavorite, setIsFavorite] = useState(isFavorite);
  const handleOnPress = () => {
    //setIsFavorite(!isFavorite);
    onPress(!isFavorite);
  };

  return (
    <TouchableOpacity onPress={() => handleOnPress()}>
      <FontAwesome
        name={isFavorite ? "heart" : "heart-o"}
        size={25}
        color={"red"}
      />
    </TouchableOpacity>
  );
};

const Detail = ({ route }) => {
  const pokemon = route.params.pokemon;
  const dispatch = useDispatch();
  const pokemonSpecies = useSelector(
    (state) => state.pokemonReducer.currentPokemonSpecies
  );
  const myFavorites = useSelector((state) => state.pokemonReducer.myFavorites);
  const [isFavorite, setIsFavorite] = useState(false);
  const currentLanguageIndex = useSelector(
    (state) => state.pokemonReducer.currentLanguageIndex
  );
  const navigation = useNavigation();
  const languages = useSelector((state) => state.pokemonReducer.languages);
  const [languageChanged, setLanguageChanged] = useState(i18n.locale);

  useEffect(() => {
    i18n.locale = languages[currentLanguageIndex];
    setLanguageChanged(i18n.locale);
  }, [currentLanguageIndex]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: i18n.t("navigation.detail"),
    });
  }, [languageChanged]);

  useEffect(() => {
    dispatch(getPokemonSpeciesAction(pokemon.speciesUrl));

    return () => {
      dispatch(cleanPokemonSpeciesAction());
      //dispatch(getPokemonListAction());
    };
  }, []);

  useEffect(() => {
    let favoriteFound = myFavorites.filter((item) => {
      return pokemon.name === item;
    });
    setIsFavorite(favoriteFound.length > 0 ? true : false);
  }, [myFavorites]);

  const handleFavorite = (value) => {
    if (value) {
      dispatch(saveMyFavorite(pokemon.name));
    } else {
      dispatch(deleteMyFavorite(pokemon.name));
    }
  };

  return (
    <SafeAreaView style={styles.Container}>
      <ScrollView style={styles.ContainerScroll}>
        <View style={styles.Card}>
          <View style={styles.CardHeader}>
            <View style={styles.CardHeaderTitle}>
              <Text style={styles.CardHeaderTitleName}>{pokemon.name}</Text>
              <View style={styles.CardHeaderGroup}>
                <FavoriteIcon
                  isFavorite={isFavorite}
                  onPress={handleFavorite}
                />
                <Text style={styles.CardHeaderTitleNumber}>
                  #{pokemon.id.toString().padStart(3, "0")}
                </Text>
              </View>
            </View>
            <View style={styles.CardHeaderSubtitle}>
              <Type types={pokemon.types} />
            </View>
            <Image
              source={{
                uri: pokemon.spriteDeafult,
              }}
              style={styles.CardImage}
            />
          </View>
          <View style={styles.CardBody}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                width: "100%",
                alignSelf: "center",
              }}
            >
              <View style={styles.CardBodyRow}>
                <Text style={styles.CardBodyAboutValue}>{pokemon.height}</Text>
                <Text style={styles.CardBodyAboutLabel}>
                  {i18n.t("detail.height")}
                </Text>
              </View>
              <View style={styles.CardBodyRow}>
                <Text style={styles.CardBodyAboutValue}>{pokemon.weight}</Text>
                <Text style={styles.CardBodyAboutLabel}>
                  {i18n.t("detail.weight")}
                </Text>
              </View>
            </View>
            {useMemo(
              () => (
                <TextPokemoDescription items={pokemonSpecies[i18n.locale]} />
              ),
              [pokemonSpecies[i18n.locale]]
            )}
            <SliderPokemonStats stats={pokemon.stats} />
          </View>
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.4,
    shadowRadius: 1,
    elevation: 6,
  },
  CardHeader: {},
  CardHeaderGroup: {
    flexDirection: "row",
  },
  CardHeaderIconFavorite: {},
  CardHeaderTitle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
  },
  CardHeaderSubtitle: {
    flexDirection: "row",
    marginLeft: 20,
  },
  CardHeaderTitleName: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#fff",
  },
  CardHeaderTitleNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 10,
  },
  CardHeaderSubTitle: {
    alignSelf: "center",
  },
  CardBody: {
    backgroundColor: "#fff",
    flex: 1,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 15,
    paddingBottom: 15,
  },
  CardBodyRow: {
    alignItems: "center",
  },
  CardBodyAboutValue: { fontSize: 20, color: "red", fontWeight: "bold" },
  CardBodyAboutLabel: { fontSize: 13, color: "lightgrey" },
  CardImage: {
    height: 300,
    width: "90%",
    alignSelf: "center",
    marginTop: 10,
    backgroundColor: "red",
  },
  TypeStyle: {
    backgroundColor: "red",
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    borderTopRightRadius: 14,
    borderTopLeftRadius: 14,
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

export default Detail;
