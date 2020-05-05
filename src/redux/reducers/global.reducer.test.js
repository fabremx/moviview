import { DISPLAY_SNACKBAR, CLOSE_SNACKBAR } from "../../redux/actions";

import globalReducer from "./global.reducer";

describe("Global Reducer", () => {
  it("should set the snackbar properties when action 'DISPLAY_SNACKBAR' is called", () => {
    // Given
    const currentState = {
      snackbar: {
        isSnackbarActive: false,
      },
    };

    const action = {
      type: DISPLAY_SNACKBAR,
      payload: {
        message: "message to display",
        type: "success",
      },
    };

    // When
    const newState = globalReducer(currentState, action);

    // Then
    const expectedState = {
      snackbar: {
        isSnackbarActive: true,
        message: "message to display",
        type: "success",
      },
    };

    expect(newState).toEqual(expectedState);
  });

  it("should set the isSnackbarActive property to false and delete other snackbar properties when action 'CLOSE_SNACKBAR' is called", () => {
    // Given
    const currentState = {
      snackbar: {
        isSnackbarActive: true,
        message: "message to display",
        type: "success",
      },
    };

    const action = {
      type: CLOSE_SNACKBAR,
      payload: null,
    };

    // When
    const newState = globalReducer(currentState, action);

    // Then
    const expectedState = {
      snackbar: {
        isSnackbarActive: false,
      },
    };

    expect(newState).toEqual(expectedState);
  });
});
