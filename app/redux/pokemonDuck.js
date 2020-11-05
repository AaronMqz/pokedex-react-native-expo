import { useAPI } from "../service/useAPI";

// CONSTANTS
let initalData = {
  isFetching: false,
  pokemons: [],
};
let FETCH_REQUEST = "FETCH_REQUEST";
let FECTH_SUCCESS = "FECTH_SUCCESS";
let FETCH_FAILURE = "FETCH_FAILURE";

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
    default:
      return state;
  }
};

// ACTIONS - THUNKS
export let getPokemonListAction = () => (dispatch, getState) => {
  const [getPokemonList] = useAPI();
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
