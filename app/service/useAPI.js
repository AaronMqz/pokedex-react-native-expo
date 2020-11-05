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
              return (pokemonsHash[item.name] = result.data);
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

  return [getPokemonList];
};
