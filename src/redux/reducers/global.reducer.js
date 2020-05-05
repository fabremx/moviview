import { DISPLAY_SNACKBAR, CLOSE_SNACKBAR } from "../../redux/actions";

export default (state = [], action) => {
  switch (action.type) {
    case DISPLAY_SNACKBAR:
      return {
        ...state,
        snackbar: {
          isSnackbarActive: true,
          message: action.payload.message,
          type: action.payload.type,
        },
      };
    case CLOSE_SNACKBAR:
      return {
        ...state,
        snackbar: {
          isSnackbarActive: false,
        },
      };
    default:
      return state;
  }
};
