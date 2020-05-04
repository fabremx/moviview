import {
  ADD_MOVIE_TO_WATCH,
  DELETE_MOVIE_TO_WATCH,
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
    default:
      return state;
  }
};
