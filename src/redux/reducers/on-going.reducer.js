import {
  SET_ON_GOING_ACTION,
  RESET_ON_GOING_ACTION,
} from "../../shared/constants/actions";

export default (state = {}, action) => {
  switch (action.type) {
    case SET_ON_GOING_ACTION:
      return {
        onGoingAction: action.payload,
      };
    case RESET_ON_GOING_ACTION:
      return {
        onGoingAction: {},
      };
    default:
      return state;
  }
};
