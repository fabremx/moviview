import {
  ADD_WATCHED_MOVIE,
  DELETE_WATCHED_MOVIE,
  CHANGE_WATCHED_MOVIE_RATING,
  SAVE_WATCHED_MOVIES_ON_LOCAL_STORAGE,
} from "../../shared/constants/actions";

export const addWatchedMovieAction = (movieToAdd) => (dispatch) => {
  dispatch({
    type: ADD_WATCHED_MOVIE,
    payload: movieToAdd,
  });
};

export const deleteWatchedMovieAction = (movieToDeleteId) => (dispatch) => {
  dispatch({
    type: DELETE_WATCHED_MOVIE,
    payload: movieToDeleteId,
  });
};

export const changeMovieRatingAction = (movieInfo) => (dispatch) => {
  dispatch({
    type: CHANGE_WATCHED_MOVIE_RATING,
    payload: movieInfo,
  });
};

export const saveWatchedMoviesOnLocalStorageAction = () => (dispatch) => {
  dispatch({
    type: SAVE_WATCHED_MOVIES_ON_LOCAL_STORAGE,
    payload: null,
  });
};
