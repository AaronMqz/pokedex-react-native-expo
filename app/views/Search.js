import React, { useState } from "react";
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
import { useNavigation } from "@react-navigation/native";
import { SearchBar } from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";

import { getPokemonListAction } from "../redux/pokemonDuck";
import LanguageComponent from "../components/LanguageComponent";

const { width } = Dimensions.get("window");

const Search = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const pokemons = useSelector((state) => state.pokemonReducer.pokemons);
  const nextPage = useSelector((state) => state.pokemonReducer.nextPage);
  const loading = useSelector((state) => state.pokemonReducer.isFetching);

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const filterPokemons = () => {
    if (searchText.trim().length > 0) {
      return pokemons.filter((pokemon) => {
        return pokemon.name
          .toLowerCase()
          .includes(searchText.toLowerCase().trim());
      });
    } else {
      return pokemons;
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

  return (
    <SafeAreaView style={styles.Conatiner}>
      <LanguageComponent />
      <SearchBar
        round
        placeholder="Search"
        lightTheme={true}
        onChangeText={handleSearch}
        value={searchText}
        showCancel={false}
      />
      <Text
        style={{
          alignSelf: "flex-end",
          marginRight: 10,
          marginTop: 2,
          marginBottom: 2,
          fontSize: 10,
        }}
      >
        Results: {pokemons.length}
      </Text>
      <FlatList
        data={filterPokemons()}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        numColumns={3}
        columnWrapperStyle={{
          marginTop: 5,
          marginLeft: 2,
          marginRight: 2,
        }}
        onEndReached={handleMorePokemons}
        onEndReachedThreshold={1}
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
