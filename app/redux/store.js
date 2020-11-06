import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import reducer, { getPokemonListAction } from "./pokemonDuck";

let rootReducer = combineReducers({
  pokemonReducer: reducer,
});

export default function Store() {
  let store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
  );
  let initialPageUrl = store.getState().pokemonReducer.nextPage;
  getPokemonListAction(initialPageUrl)(store.dispatch, store.getState);

  return store;
}
