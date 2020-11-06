import axios from "axios";
import { API_URL } from "./serviceConfig";

export const useAPI = () => {
  const getPokemonList = (url) => {
    return axios.get(url).catch((error) => {
      throw error;
    });
  };

  const getPokemonDetails = (pokemonList) => {
    const getAllRequest = pokemonList.map((item) => {
      return axios.get(item.url).then(({ data }) => {
        return {
          id: data.id,
          name: data.name,
          height: data.height,
          weight: data.weight,
          spriteDeafult: data.sprites.other["official-artwork"].front_default,
          speciesUrl: data.species.url,
          types: data.types,
          stats: data.stats,
        };
      });
    });
    return Promise.all(getAllRequest);
  };

  const getPokemonSpecies = (url) => {
    let result = axios.get(url);
    return result;
  };

  return {
    getPokemonList,
    getPokemonSpecies,
    getPokemonDetails,
  };
};
