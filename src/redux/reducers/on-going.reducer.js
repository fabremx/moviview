import {
  SET_ON_GOING_ACTION,
  RESET_ON_GOING_ACTION,
} from "../../redux/actions";

export default (state = {}, action) => {
  switch (action.type) {
    case SET_ON_GOING_ACTION:
      return action.payload;
    case RESET_ON_GOING_ACTION:
      return {};
    default:
      return state;
  }
};
