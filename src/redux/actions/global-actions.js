import {
  DISPLAY_SNACKBAR,
  CLOSE_SNACKBAR,
} from "../../shared/constants/actions";

export const displaySnackbarAction = (payload) => (dispatch) => {
  dispatch({
    type: DISPLAY_SNACKBAR,
    payload,
  });
};

export const closeSnackbarAction = () => (dispatch) => {
  dispatch({
    type: CLOSE_SNACKBAR,
    payload: null,
  });
};
