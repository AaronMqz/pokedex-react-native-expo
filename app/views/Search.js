import React, { useState, useEffect, useLayoutEffect, useMemo } from "react";
import {
  Text,
  View,
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  ActivityIndicator,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SearchBar } from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";

import {
  getPokemonListAction,
  resetPokemonsAction,
  getPokemonByNameOrId,
} from "../redux/pokemonDuck";
import i18n from "../languages/i18n";

const { width } = Dimensions.get("window");

const Search = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const pokemons = useSelector((state) => state.pokemonReducer.pokemons);
  const nextPage = useSelector((state) => state.pokemonReducer.nextPage);
  const loading = useSelector((state) => state.pokemonReducer.isFetching);
  const currentLanguageIndex = useSelector(
    (state) => state.pokemonReducer.currentLanguageIndex
  );
  const languages = useSelector((state) => state.pokemonReducer.languages);
  const [languageChanged, setLanguageChanged] = useState(i18n.locale);
  const [searchByButton, setSearchByButton] = useState(false);

  useEffect(() => {
    i18n.locale = languages[currentLanguageIndex];
    setLanguageChanged(i18n.locale);
  }, [currentLanguageIndex]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: i18n.t("navigation.search"),
    });
  }, [languageChanged]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Image
          source={require("../../assets/pokemon.png")}
          style={{ width: 80, height: 30 }}
        />
      ),
      headerRight: () => (
        <TouchableOpacity
          onPress={() => handleReset()}
          style={{ marginRight: 15 }}
        >
          {!loading && !searchByButton && (
            <FontAwesome name="undo" size={20} color={"#fff"} />
          )}
        </TouchableOpacity>
      ),
    });
  }, [loading]);

  useEffect(() => {
    if (searchText.trim().length === 0 && searchByButton) {
      setSearchByButton(false);
      handleReset();
    }
  }, [searchText]);

  const handleReset = () => {
    dispatch(resetPokemonsAction());
  };

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const filterPokemons = () => {
    if (searchText.trim().length > 0 && !searchByButton) {
      var filters = pokemons.filter((pokemon) => {
        return pokemon.name
          .toLowerCase()
          .includes(searchText.toLowerCase().trim());
      });
      return filters;
    } else {
      if (!loading || !searchByButton) {
        return pokemons;
      }
    }
  };

  const handleMorePokemons = () => {
    if (!searchText.trim().length > 0 && !loading) {
      dispatch(getPokemonListAction(nextPage));
    }
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        disabled={loading}
        onPress={() => navigation.navigate("Detail", { pokemon: item })}
      >
        <View style={styles.Card}>
          <Image
            source={{ uri: item.spriteDeafult }}
            style={styles.CardImage}
          />
          <Text style={styles.CardTitle}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const SearchButton = ({ handleButtonSearch }) => {
    return (
      <React.Fragment>
        {searchText.trim().length > 0 && (
          <TouchableOpacity
            style={{
              backgroundColor: "#fff",
              justifyContent: "center",
              height: 55,
            }}
            onPress={handleButtonSearch}
          >
            <View
              style={{
                height: 40,
                width: 80,
                marginRight: 5,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#f03434",
                borderTopRightRadius: 15,
                borderTopLeftRadius: 15,
                borderBottomLeftRadius: 15,
                borderBottomRightRadius: 15,
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
                {i18n.t("navigation.search")}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </React.Fragment>
    );
  };

  const handleButtonSearch = () => {
    dispatch(getPokemonByNameOrId(searchText.trim().toLowerCase()));
    setSearchByButton(true);
  };

  return (
    <SafeAreaView style={styles.Conatiner}>
      <View style={{ flexDirection: "row" }}>
        <SearchBar
          round
          placeholder={`${i18n.t("search.searchBarPlaceholder")} ${
            pokemons.length
          } ${i18n.t("search.result")}`}
          lightTheme={true}
          onChangeText={handleSearch}
          value={searchText}
          showCancel={false}
          containerStyle={{
            width: width,
            height: 55,
            backgroundColor: "#fff",
            borderBottomWidth: 0,
            flex: 1,
          }}
          inputContainerStyle={{ height: 40 }}
        />
        <SearchButton handleButtonSearch={handleButtonSearch} />
      </View>

      <Text
        style={{
          alignSelf: "flex-end",
          marginRight: 10,
          marginTop: 5,
          fontSize: 10,
        }}
      >
        {i18n.t("search.result")} {pokemons.length}
      </Text>
      {useMemo(
        () => (
          <FlatList
            data={filterPokemons()}
            renderItem={renderItem}
            keyExtractor={(item) => item.name + item.id}
            numColumns={3}
            columnWrapperStyle={{
              marginTop: 5,
              marginLeft: 2,
              marginRight: 2,
            }}
            onEndReached={handleMorePokemons}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              loading && (
                <ActivityIndicator
                  animating
                  size="large"
                  color="red"
                  style={{ marginBottom: 40, marginTop: 30 }}
                />
              )
            }
          />
        ),
        [searchText, pokemons, loading]
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Conatiner: {
    flex: 1,
  },
  Card: {
    borderRadius: 5,
    backgroundColor: "#fff",
    width: width / 3 - 6,
    height: width / 3,
    marginRight: 2,
    marginLeft: 2,
    padding: 10,
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
    fontSize: 14,
    alignSelf: "center",
  },
  CardImage: {
    flex: 1,
  },
});

export default Search;
