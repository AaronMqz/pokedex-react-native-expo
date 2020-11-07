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

  const saveFavoriteStorage = async (data) => {
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem("@favorites", jsonValue);
    } catch (e) {
      // saving error
      console.log("Error saving favorites in storage: ", e);
    }
  };

  const deleteFavoriteStorage = async (data) => {
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem("@favorites", jsonValue);
    } catch (e) {
      // saving error
      console.log("Error deleting favorites in storage: ", e);
    }
  };

  const getFavoriteStorage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@favorites");
      return jsonValue != null ? [].concat(JSON.parse([jsonValue])) : [];
    } catch (e) {
      // error reading value
      console.log("Error getting from storage: ", e);
    }
  };

  return {
    savePokemonListStorage,
    getPokemonListStorage,
    saveFavoriteStorage,
    deleteFavoriteStorage,
    getFavoriteStorage,
  };
};

export default useStorage;
