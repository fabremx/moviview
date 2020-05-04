import {
  SET_ON_GOING_ACTION,
  RESET_ON_GOING_ACTION,
} from "../../shared/constants/actions";

import onGoingReducer from "./on-going.reducer";

describe("Watched movies Reducer", () => {
  it("should return the paypload passed when user is on going an action", () => {
    // Given
    const currentState = {};

    const action = {
      type: SET_ON_GOING_ACTION,
      payload: {
        type: "DELETE",
        list: "movies-to-watch",
        movieId: "imdbId",
        callback: "callback",
      },
    };

    // When
    const newState = onGoingReducer(currentState, action);

    // Then
    expect(newState).toEqual({
      type: "DELETE",
      list: "movies-to-watch",
      movieId: "imdbId",
      callback: "callback",
    });
  });

  it("should return an empty object when user has finish his action", () => {
    // Given
    const currentState = {
      type: "DELETE",
      list: "movies-to-watch",
      movieId: "imdbId",
      callback: "callback",
    };

    const action = {
      type: RESET_ON_GOING_ACTION,
      payload: null,
    };

    // When
    const newState = onGoingReducer(currentState, action);

    // Then
    expect(newState).toEqual({});
  });
});
