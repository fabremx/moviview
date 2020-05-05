import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import moviesToWatchReducer from "./reducers/movies-to-watch.reducer";
import watchedMoviesReducer from "./reducers/watched-movies.reducer";
import onGoingReducer from "./reducers/on-going.reducer";
import globalReducer from "./reducers/global.reducer";

const rootReducer = combineReducers({
  moviesToWatch: moviesToWatchReducer,
  watchedMovies: watchedMoviesReducer,
  onGoingAction: onGoingReducer,
  global: globalReducer,
});

export default function configureStore(initialState = {}) {
  return createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk),
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );
}
