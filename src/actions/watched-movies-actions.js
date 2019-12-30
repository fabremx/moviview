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

export const changeMovieRatingAction = movieInfo => dispatch => {
  dispatch({
    type: "CHANGE_WATCHED_MOVIE_RATING",
    payload: movieInfo
  });
};
