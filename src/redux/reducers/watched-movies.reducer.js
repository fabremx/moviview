import {
  ADD_WATCHED_MOVIE,
  DELETE_WATCHED_MOVIE,
  CHANGE_WATCHED_MOVIE_RATING,
} from "../../shared/constants/actions";

export default (state = {}, action) => {
  let newWatchedMovies, movie, rating;

  switch (action.type) {
    case ADD_WATCHED_MOVIE:
      movie = action.payload.movie;
      rating = action.payload.rating;

      movie.userRating = rating;

      newWatchedMovies = state;
      newWatchedMovies.unshift(movie);

      return newWatchedMovies;
    case DELETE_WATCHED_MOVIE:
      newWatchedMovies = state.filter(
        (movie) => movie.imdbId !== action.payload
      );

      return newWatchedMovies;
    case CHANGE_WATCHED_MOVIE_RATING:
      const index = state.findIndex(
        (movie) => movie.imdbId === action.payload.movie.imdbId
      );

      newWatchedMovies = state;
      newWatchedMovies[index].userRating = action.payload.rating;

      return newWatchedMovies;
    default:
      return state;
  }
};
