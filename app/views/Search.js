import React from "react";
import {
  Text,
  View,
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SearchBar } from "react-native-elements";

import { useSelector } from "react-redux";

const { width } = Dimensions.get("window");

const Search = () => {
  const navigation = useNavigation();
  const pokemons = useSelector((state) => state.pokemonReducer.pokemons);

  const renderItem = ({ item }) => {
    console.log(item);
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("Detail", { pokemon: item })}
      >
        <View style={styles.Card}>
          <Image
            source={{ uri: item.sprites.front_default }}
            style={styles.CardImage}
          />
          <Text style={styles.CardTitle}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.Conatiner}>
      <SearchBar
        round
        placeholder="Type Here..."
        showCancel={false}
        showLoading={false}
        lightTheme={true}
      />
      <FlatList
        style={styles.FlatList}
        data={pokemons}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        numColumns={3}
        columnWrapperStyle={{ marginTop: 5, marginLeft: 5 }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Conatiner: {
    flex: 1,
  },
  FlatList: {
    paddingTop: 10,
    paddingBottom: 150,
    marginHorizontal: 5,
  },
  Card: {
    borderRadius: 5,
    backgroundColor: "#fff",
    width: width / 3 - 10,
    height: 130,
    marginRight: 5,
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
    height: 100,
    width: "100%",
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
  },
});

export default Search;
