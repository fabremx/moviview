export default (state = {}, action) => {
  switch (action.type) {
    case "ADD_MOVIE_TO_WATCH":
      state.moviesToWatch.unshift(action.payload);

      return {
        watchedMovies: [...state.watchedMovies],
        moviesToWatch: [...state.moviesToWatch]
      };
    case "DELETE_MOVIE_TO_WATCH":
      const moviesToWatch = state.moviesToWatch.filter(
        movie => movie.imdbId !== action.payload
      );

      return {
        watchedMovies: [...state.watchedMovies],
        moviesToWatch: moviesToWatch
      };
    case "ADD_WATCHED_MOVIE":
      const { movie, rating } = action.payload;
      movie.userRating = rating;

      state.watchedMovies.unshift(movie);

      return {
        watchedMovies: [...state.watchedMovies],
        moviesToWatch: [...state.moviesToWatch]
      };
    case "DELETE_WATCHED_MOVIE":
      const watchedMovies = state.watchedMovies.filter(
        movie => movie.imdbId !== action.payload
      );

      return {
        watchedMovies: watchedMovies,
        moviesToWatch: [...state.moviesToWatch]
      };
    case "SET_ON_GOING_ACTION":
      return {
        watchedMovies: [...state.watchedMovies],
        moviesToWatch: [...state.moviesToWatch],
        onGoingAction: action.payload
      };
    case "RESET_ON_GOING_ACTION":
      return {
        watchedMovies: [...state.watchedMovies],
        moviesToWatch: [...state.moviesToWatch]
      };
    default:
      return state;
  }
};
