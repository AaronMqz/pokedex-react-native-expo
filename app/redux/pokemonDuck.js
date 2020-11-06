import { useAPI } from "../service/useAPI";
import useStorage from "../hooks/useStorage";

// CONSTANTS
let initalData = {
  isFetching: false,
  pokemons: [],
  currentPokemonSpecies: {},
  community: [],
  myFavorites: [],
  user: { name: "aaron" },
};
let FETCH_REQUEST = "FETCH_REQUEST";
let FECTH_SUCCESS = "FECTH_SUCCESS";
let FETCH_FAILURE = "FETCH_FAILURE";
let FECTH_SPECIES_SUCCESS = "FECTH_SPECIES_SUCCESS";
let CLEAN_SPECIES = "CLEAN_SPECIES";
let SAVE_FAVORITE = "SAVE_FAVORITE";
let DELETE_FAVORITE = "DELETE_FAVORITE";

// REDUCERS
export default reducer = (state = initalData, { type, payload }) => {
  switch (type) {
    case FETCH_REQUEST:
      return { ...state, isFetching: true };
    case FECTH_SUCCESS:
      return {
        ...state,
        pokemons: payload,
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
    default:
      return state;
  }
};

// ACTIONS - THUNKS
export let getPokemonListAction = () => (dispatch, getState) => {
  const { getPokemonList } = useAPI();
  const { savePokemonListStorage, getPokemonListStorage } = useStorage();

  const getStorage = async () => {
    const resultStorage = await getPokemonListStorage();
    dispatch({
      type: FECTH_SUCCESS,
      payload: resultStorage,
    });
  };

  const fetchData = async () => {
    try {
      dispatch({ type: FETCH_REQUEST });
      const result = await getPokemonList();
      dispatch({
        type: FECTH_SUCCESS,
        payload: result,
      });
      await savePokemonListStorage(result);
    } catch (error) {
      dispatch({ type: FETCH_FAILURE });
      await getStorage();
      console.log("Error API::getPokemonList: ", error);
    }
  };

  return fetchData();
};

export const getPokemonSpeciesAction = (url) => (dispatch, getState) => {
  const { getPokemonSpecies } = useAPI();
  const replaceLineBreak = (text) => {
    return text.replace(/(\n|\f)/gm, " ");
  };

  const fetchData = async () => {
    dispatch({ type: FETCH_REQUEST });
    try {
      await getPokemonSpecies(url).then((result) => {
        console.log("y eso 2");
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

export let cleanPokemonSpeciesAction = () => (dispatch, getState) => {
  dispatch({ type: CLEAN_SPECIES });
};

export let saveMyFavorite = (favorite) => (dispatch, getState) => {
  dispatch({ type: SAVE_FAVORITE, payload: favorite });
};

export let deleteMyFavorite = (favorite) => (dispatch, getState) => {
  dispatch({ type: DELETE_FAVORITE, payload: favorite });
};
