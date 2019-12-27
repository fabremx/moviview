export const addWatchedMovieAction = movieToAdd => dispatch => {
  dispatch({
    type: "ADD_WATCHED_MOVIE",
    payload: movieToAdd
  });
};

export const deleteWatchedMovieAction = movieToDeleteId => dispatch => {
  dispatch({
    type: "DELETE_WATCHED_MOVIE",
    payload: movieToDeleteId
  });
};
