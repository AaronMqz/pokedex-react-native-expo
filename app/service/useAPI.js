import axios from "axios";
import { API_URL } from "./serviceConfig";

export const useAPI = () => {
  const getPokemonList = () => {
    let URL = `${API_URL}/pokemon?limit=2&offset=0`;
    let result = axios
      .get(URL)
      .then((result) => {
        try {
          const pokemonsHash = {};
          const getAllRequest = result.data.results.map((item) => {
            return axios.get(item.url).then((result) => {
              console.log(result.data.sprites.other)
              return (pokemonsHash[item.name] = {
                id: result.data.id,
                name: result.data.name,
                height: result.data.height,
                weight: result.data.weight,
                spriteDeafult:  result.data.sprites.other["official-artwork"].front_default,
                speciesUrl: result.data.species.url,
                types: result.data.types,
                stats: result.data.stats
              });
            });
          });
          return Promise.all(getAllRequest);
        } catch (error) {
          throw error;
        }
      })
      .catch((error) => {
        throw error;
      });
    return result;
  };

  const getPokemonSpecies = (url) => {
    let result = axios.get(url);
    return result;
  };

  return { getPokemonList, getPokemonSpecies };
};
