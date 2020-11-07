import React, { useEffect, useState, useMemo, useLayoutEffect } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  ScrollView,
  Text,
  Image,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import i18n from "../languages/i18n";
import Type from "../components/Type";
import FavoriteIcon from "../components/FavoriteIcon";
import PokemoDescription from "../components/PokemonDescription";
import Slider from "../components/Slider";
import { typeColors } from "../utils/colors";
import LanguageComponent from "../components/LanguageComponent";

import {
  getPokemonSpeciesAction,
  cleanPokemonSpeciesAction,
  saveMyFavorite,
  deleteMyFavorite,
} from "../redux/pokemonDuck";

const SliderPokemonStats = ({ stats, colorType }) => {
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

  // get range to avoid slider overflow
  const statsArray = stats.map((item) => item.base_stat);
  const getMaxValue = Math.max(...statsArray);
  const range = getMaxValue / 100;

  return (
    <React.Fragment>
      {stats.map((stat, index) => {
        return (
          <Slider
            key={index}
            label={formatingStatsName(stat.stat.name)}
            value={stat.base_stat}
            range={range}
            colorType={colorType}
          />
        );
      })}
    </React.Fragment>
  );
};

const HeightAndWeight = ({ height, weight, colorType }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        alignSelf: "center",
      }}
    >
      <View style={styles.CardBodyRow}>
        <Text style={[styles.CardBodyAboutValue, { color: colorType }]}>
          {height}
        </Text>
        <Text style={styles.CardBodyAboutLabel}>{i18n.t("detail.height")}</Text>
      </View>
      <View style={styles.CardBodyRow}>
        <Text style={[styles.CardBodyAboutValue, { color: colorType }]}>
          {weight}
        </Text>
        <Text style={styles.CardBodyAboutLabel}>{i18n.t("detail.weight")}</Text>
      </View>
    </View>
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
  const pickFirstType = pokemon.types.find((e) => !!e);
  const getColorType = typeColors[pickFirstType.type.name];

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
    };
  }, []);

  useEffect(() => {
    let favoriteFound = myFavorites.filter((item) => {
      return pokemon.name === item.name;
    });
    setIsFavorite(favoriteFound.length > 0 ? true : false);
  }, [myFavorites]);

  const handleFavorite = (value) => {
    if (value) {
      dispatch(saveMyFavorite(pokemon));
    } else {
      dispatch(deleteMyFavorite(pokemon));
    }
  };

  return (
    <SafeAreaView style={styles.Container}>
      <LanguageComponent />
      <ScrollView>
        <View
          style={[
            styles.Card,
            {
              backgroundColor: getColorType,
            },
          ]}
        >
          <Text style={styles.CardHeaderTitleNumber}>
            #{pokemon.id.toString().padStart(3, "0")}
          </Text>
          <View style={styles.CardHeaderTitle}>
            <Text style={styles.CardHeaderTitleName}>{pokemon.name}</Text>
            <FavoriteIcon isFavorite={isFavorite} onPress={handleFavorite} />
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

          <View style={styles.CardBody}>
            <HeightAndWeight
              colorType={getColorType}
              height={pokemon.height}
              weight={pokemon.weight}
            />
            {useMemo(
              () => (
                <PokemoDescription items={pokemonSpecies[i18n.locale]} />
              ),
              [pokemonSpecies[i18n.locale]]
            )}
            <SliderPokemonStats
              colorType={getColorType}
              stats={pokemon.stats}
            />
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
  Card: {
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
  CardHeaderTitle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: 20,
    marginRight: 20,
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
    marginTop: 20,
    marginLeft: 20,
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
  CardBodyAboutLabel: { fontSize: 12, color: "#757575" },
  CardImage: {
    height: 300,
    aspectRatio: 1,
    alignSelf: "center",
  },
});

export default Detail;
