import {
  LOAD_MOVIES_TO_WATCH,
  ADD_MOVIE_TO_WATCH,
  DELETE_MOVIE_TO_WATCH,
} from "../../redux/actions";

import moviesToWatchReducer from "./movies-to-watch.reducer";

describe("Movies to watch Reducer", () => {
  it("should return the current state with the new movie when user add a new movie to watch", () => {
    // Given
    const currentState = [
      {
        id: "id1",
        title: "title1",
        imdbId: "imdbId1",
      },
      {
        id: "id2",
        title: "title2",
        imdbId: "imdbId2",
      },
    ];

    const movieToAdd = {
      id: "id new movie to watch",
      title: "title new movie to watch",
      imdbId: "imdbId new movie to watch",
    };

    const action = {
      type: ADD_MOVIE_TO_WATCH,
      payload: movieToAdd,
    };

    // When
    const newState = moviesToWatchReducer(currentState, action);

    // Then
    const expectedState = [
      {
        id: "id new movie to watch",
        title: "title new movie to watch",
        imdbId: "imdbId new movie to watch",
      },
      {
        id: "id1",
        title: "title1",
        imdbId: "imdbId1",
      },
      {
        id: "id2",
        title: "title2",
        imdbId: "imdbId2",
      },
    ];

    expect(newState).toEqual(expectedState);
  });

  it("should return the current state without the movie deleted when user delete the movie to watch", () => {
    // Given
    const currentState = [
      {
        id: "id1",
        title: "title1",
        imdbId: "imdbId1",
      },
      {
        id: "id2",
        title: "title2",
        imdbId: "imdbId2",
      },
    ];

    const action = {
      type: DELETE_MOVIE_TO_WATCH,
      payload: "imdbId1",
    };

    // When
    const newState = moviesToWatchReducer(currentState, action);

    // Then
    const expectedState = [
      {
        id: "id2",
        title: "title2",
        imdbId: "imdbId2",
      },
    ];
    expect(newState).toEqual(expectedState);
  });

  it("should set state with the content of localSotrage when there are data", () => {
    // Given
    const currentState = [];
    const mockLocalStorage = JSON.stringify([
      {
        id: "id1",
        title: "title1",
        imdbId: "imdbId1",
      },
    ]);

    window.localStorage.setItem("moviesToWatch", mockLocalStorage);

    const action = {
      type: LOAD_MOVIES_TO_WATCH,
      payload: null,
    };

    // When
    const newState = moviesToWatchReducer(currentState, action);

    // Then
    const expectedState = [
      {
        id: "id1",
        title: "title1",
        imdbId: "imdbId1",
      },
    ];

    expect(newState).toEqual(expectedState);
    window.localStorage.removeItem("moviesToWatch");
  });

  it("should set an empty array to the state when localStorage have no data", () => {
    // Given
    const currentState = [];

    const action = {
      type: LOAD_MOVIES_TO_WATCH,
      payload: null,
    };

    // When
    const newState = moviesToWatchReducer(currentState, action);

    // Then
    const expectedState = [];
    expect(newState).toEqual(expectedState);
  });
});
