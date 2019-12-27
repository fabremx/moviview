export const addMovieToWatchAction = movieToAdd => dispatch => {
  dispatch({
    type: "ADD_MOVIE_TO_WATCH",
    payload: movieToAdd
  });
};

export const deleteMovieToWatchAction = movieToDeleteId => dispatch => {
  dispatch({
    type: "DELETE_MOVIE_TO_WATCH",
    payload: movieToDeleteId
  });
};
