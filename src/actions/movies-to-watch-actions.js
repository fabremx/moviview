export const addMovieToWatchAction = movieToAdd => dispatch => {
  dispatch({
    type: "ADD_MOVIE_TO_WATCH",
    payload: movieToAdd
  });
};
