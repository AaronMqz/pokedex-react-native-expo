import { useAPI } from "../service/useAPI";
import useStorage from "../hooks/useStorage";

// CONSTANTS
let initalData = {
  isFetching: false,
  nextPage: "https://pokeapi.co/api/v2/pokemon?limit=50",
  pokemons: [],
  currentPokemonSpecies: {},
  community: [],
  myFavorites: [],
  user: { name: "aaron" },
  languages: ["en", "es"],
  currentLanguageIndex: 0,
};
let FETCH_REQUEST = "FETCH_REQUEST";
let FECTH_SUCCESS = "FECTH_SUCCESS";
let FETCH_FAILURE = "FETCH_FAILURE";
let FECTH_SPECIES_SUCCESS = "FECTH_SPECIES_SUCCESS";
let CLEAN_SPECIES = "CLEAN_SPECIES";
let SAVE_FAVORITE = "SAVE_FAVORITE";
let DELETE_FAVORITE = "DELETE_FAVORITE";
let GET_FAVORITES = "GET_FAVORITES";
let CHANGE_LANGUAGE = "CHANGE_LANGUAGE";

// REDUCERS
export default reducer = (state = initalData, { type, payload }) => {
  switch (type) {
    case FETCH_REQUEST:
      return { ...state, isFetching: true };
    case FECTH_SUCCESS:
      return {
        ...state,
        pokemons: state.pokemons.concat(payload.pokemons),
        nextPage: payload.nextPage,
        isFetching: false,
      };
    case FETCH_FAILURE:
      return { ...state, isFetching: false };
    case FECTH_SPECIES_SUCCESS:
      return {
        ...state,
        currentPokemonSpecies: payload,
        isFetching: false,
      };
    case CLEAN_SPECIES:
      return {
        ...state,
        currentPokemonSpecies: {},
        isFetching: false,
      };
    case SAVE_FAVORITE:
      return {
        ...state,
        myFavorites: [...state.myFavorites, payload],
        isFetching: false,
      };
    case DELETE_FAVORITE:
      return {
        ...state,
        myFavorites: state.myFavorites.filter((item) => item !== payload),
        isFetching: false,
      };
    case CHANGE_LANGUAGE:
      return {
        ...state,
        currentLanguageIndex: payload,
      };
    case GET_FAVORITES:
      return {
        ...state,
        myFavorites: payload,
      };
    default:
      return state;
  }
};

// ACTIONS - THUNKS
export let getPokemonListAction = (url) => (dispatch) => {
  const { getPokemonList, getPokemonDetails } = useAPI();
  const { savePokemonListStorage, getPokemonListStorage } = useStorage();

  const getPokemonsFromStorage = async () => {
    const resultStorage = await getPokemonListStorage();
    dispatch({
      type: FECTH_SUCCESS,
      payload: resultStorage,
    });
  };

  const fetchData = async () => {
    try {
      dispatch({ type: FETCH_REQUEST });
      const pokemonList = await getPokemonList(url);
      const pokemonsResult = await getPokemonDetails(pokemonList.data.results);
      dispatch({
        type: FECTH_SUCCESS,
        payload: { pokemons: pokemonsResult, nextPage: pokemonList.data.next },
      });
      await savePokemonListStorage(pokemonsResult);
    } catch (error) {
      dispatch({ type: FETCH_FAILURE });
      await getPokemonsFromStorage();
      console.log("Error API::getPokemonList: ", error);
    }
  };

  return fetchData();
};

export const getPokemonSpeciesAction = (url) => (dispatch) => {
  const { getPokemonSpecies } = useAPI();
  const replaceLineBreak = (text) => {
    return text.replace(/(\n|\f)/gm, " ");
  };

  const fetchData = async () => {
    dispatch({ type: FETCH_REQUEST });
    try {
      await getPokemonSpecies(url).then((result) => {
        const favlorHash = {};
        result.data.flavor_text_entries.map((item) => {
          if (item.language.name === "en") {
            if (favlorHash[item.language.name]) {
              favlorHash[item.language.name].push(
                replaceLineBreak(item.flavor_text)
              );
            } else {
              favlorHash[item.language.name] = [
                replaceLineBreak(item.flavor_text),
              ];
            }
          }
          if (item.language.name === "es") {
            if (favlorHash[item.language.name]) {
              favlorHash[item.language.name].push(
                replaceLineBreak(item.flavor_text)
              );
            } else {
              favlorHash[item.language.name] = [
                replaceLineBreak(item.flavor_text),
              ];
            }
          }
        });
        dispatch({
          type: FECTH_SPECIES_SUCCESS,
          payload: favlorHash,
        });
      });
    } catch (error) {
      dispatch({ type: FETCH_FAILURE });
      console.log("Error", error);
    }
  };

  return fetchData();
};

export let cleanPokemonSpeciesAction = () => (dispatch) => {
  dispatch({ type: CLEAN_SPECIES });
};

export let saveMyFavorite = (favorite) => (dispatch) => {
  dispatch({ type: SAVE_FAVORITE, payload: favorite });

  const saveInStorage = async () => {
    const { saveFavoriteStorage } = useStorage();
    await saveFavoriteStorage(favorite);
  };
  saveInStorage();
};

export let deleteMyFavorite = (favorite) => (dispatch) => {
  dispatch({ type: DELETE_FAVORITE, payload: favorite });

  const saveInStorage = async () => {
    const { saveFavoriteStorage } = useStorage();
    await saveFavoriteStorage(favorite);
  };
  saveInStorage();
};

export let getMyFavorites = () => (dispatch) => {
  const getFavoriteFromStorage = async () => {
    const { getFavoriteStorage } = useStorage();
    const resultStorage = await getFavoriteStorage();
    dispatch({
      type: FECTH_SUCCESS,
      payload: resultStorage,
    });
  };
  getFavoriteFromStorage();
};

export let changeLanguage = (language) => (dispatch) => {
  dispatch({ type: CHANGE_LANGUAGE, payload: language });
};
