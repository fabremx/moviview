import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import moviesReducer from "./reducers/movies-reducer";

export default function configureStore(initialState = {}) {
  return createStore(moviesReducer, initialState, applyMiddleware(thunk));
}
