import {
  ADD_MOVIE_TO_WATCH,
  DELETE_MOVIE_TO_WATCH,
  SAVE_MOVIES_TO_WATCH_ON_LOCAL_STORAGE,
} from "../../shared/constants/actions";

export default (state = [], action) => {
  let newMoviesToWatchState;

  switch (action.type) {
    case ADD_MOVIE_TO_WATCH:
      newMoviesToWatchState = state;
      newMoviesToWatchState.unshift(action.payload);

      return newMoviesToWatchState;
    case DELETE_MOVIE_TO_WATCH:
      newMoviesToWatchState = state.filter(
        (movie) => movie.imdbId !== action.payload
      );

      return newMoviesToWatchState;
    case SAVE_MOVIES_TO_WATCH_ON_LOCAL_STORAGE:
      window.localStorage.setItem("moviesToWatch", JSON.stringify(state));
      return state;
    default:
      return state;
  }
};
