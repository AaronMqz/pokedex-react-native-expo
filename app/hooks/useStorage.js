import React from "react";
import AsyncStorage from "@react-native-community/async-storage";

const useStorage = () => {
  const savePokemonListStorage = async (data) => {
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem("@pokemons", jsonValue);
    } catch (e) {
      // saving error
      console.log("Error saving in storage: ", e);
    }
  };

  const getPokemonListStorage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@pokemons");
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      // error reading value
      console.log("Error getting from storage: ", e);
    }
  };

  return { savePokemonListStorage, getPokemonListStorage };
};

export default useStorage;
