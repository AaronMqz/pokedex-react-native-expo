import { useAPI } from "../service/useAPI";

// CONSTANTS
let initalData = {
  isFetching: false,
  pokemons: [],
  currentPokemonSpecies: {},
};
let FETCH_REQUEST = "FETCH_REQUEST";
let FECTH_SUCCESS = "FECTH_SUCCESS";
let FETCH_FAILURE = "FETCH_FAILURE";
let FECTH_SPECIES_SUCCESS = "FECTH_SPECIES_SUCCESS";
let CLEAN_SPECIES = "CLEAN_SPECIES";

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
    default:
      return state;
  }
};

// ACTIONS - THUNKS
export let getPokemonListAction = () => (dispatch, getState) => {
  const { getPokemonList } = useAPI();
  const fetchData = async () => {
    dispatch({ type: FETCH_REQUEST });
    try {
      await getPokemonList().then((result) => {
        dispatch({
          type: FECTH_SUCCESS,
          payload: result,
        });
      });
    } catch (error) {
      dispatch({ type: FETCH_FAILURE });
      console.log("Error", error);
    }
  };

  return fetchData();
};

export const getPokemonSpeciesAction = (url) => (dispatch, getState) => {
  const { getPokemonSpecies } = useAPI();
  const replaceLineBreak = (text) => {
    return text.replace(/(\n|\f)/gm, " ");
  };

  const fetchData2 = async () => {
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

  return fetchData2();
};

export let cleanPokemonSpeciesAction = () => (dispatch, getState) => {
  dispatch({ type: CLEAN_SPECIES });
};
