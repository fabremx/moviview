import {
  ADD_MOVIE_TO_WATCH,
  DELETE_MOVIE_TO_WATCH,
  SAVE_MOVIES_TO_WATCH_ON_LOCAL_STORAGE,
} from "../../shared/constants/actions";

export const addMovieToWatchAction = (movieToAdd) => (dispatch) => {
  dispatch({
    type: ADD_MOVIE_TO_WATCH,
    payload: movieToAdd,
  });
};

export const deleteMovieToWatchAction = (movieToDeleteId) => (dispatch) => {
  dispatch({
    type: DELETE_MOVIE_TO_WATCH,
    payload: movieToDeleteId,
  });
};

export const saveMoviesToWatchOnLocalStorageAction = () => (dispatch) => {
  dispatch({
    type: SAVE_MOVIES_TO_WATCH_ON_LOCAL_STORAGE,
    payload: null,
  });
};
