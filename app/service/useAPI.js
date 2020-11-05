import axios from "axios";
import { API_URL } from "./serviceConfig";

export const useAPI = () => {
  const getPokemonList = () => {
    let options = {
      method: "get",
      url: `${API_URL}/pokemon?limit=50&offset=0`,
    };
    let result = axios(options);
    return result;
  };

  return [getPokemonList];
};
