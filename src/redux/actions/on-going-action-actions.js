import {
  SET_ON_GOING_ACTION,
  RESET_ON_GOING_ACTION,
} from "../../shared/constants/actions";

export const setOnGoingAction = (actionInfo) => (dispatch) => {
  dispatch({
    type: SET_ON_GOING_ACTION,
    payload: actionInfo,
  });
};

export const resetOnGoingAction = () => (dispatch) => {
  dispatch({
    type: RESET_ON_GOING_ACTION,
    payload: null,
  });
};
