import React, { useEffect , useState} from "react";
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
import { useSelector, useDispatch } from "react-redux";

import { getPokemonListAction } from "../redux/pokemonDuck";
import { set } from "react-native-reanimated";

const { width } = Dimensions.get("window");

const Search = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("")
  const pokemons = useSelector((state) => state.pokemonReducer.pokemons);

  const handleSearch = (value)  => {
    setSearchText(value)
  }
  
  const filterPokemons = () => {
    if(searchText.trim().length > 0){
      return pokemons.filter((pokemon)=> {
        return pokemon.name.toLowerCase().includes(searchText.toLowerCase().trim()) 
      })
    } else {
      return pokemons
    }
  }

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
        <Text>search all pokemons</Text>
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
        onChangeText={handleSearch}
        value={searchText}
      />
      <FlatList
        style={styles.FlatList}
        data={filterPokemons()}
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
    flex:1,
  },
});

export default Search;
