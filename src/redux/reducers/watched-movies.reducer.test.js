import {
  ADD_WATCHED_MOVIE,
  DELETE_WATCHED_MOVIE,
  CHANGE_WATCHED_MOVIE_RATING,
} from "../../shared/constants/actions";

import watchedMoviesReducer from "./watched-movies.reducer";

describe("Watched movies Reducer", () => {
  it("should return the current state with the new watched movie and its rate when user rates a movie", () => {
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
      id: "id new watched movie",
      title: "title new watched movie",
      imdbId: "imdbId new watched movie",
    };

    const action = {
      type: ADD_WATCHED_MOVIE,
      payload: {
        movie: movieToAdd,
        rating: 4,
      },
    };

    // When
    const newState = watchedMoviesReducer(currentState, action);

    // Then
    const expectedState = [
      {
        id: "id new watched movie",
        title: "title new watched movie",
        imdbId: "imdbId new watched movie",
        userRating: 4,
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

  it("should return the current state without the deleted movie when user delete a watched movie", () => {
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
      type: DELETE_WATCHED_MOVIE,
      payload: "imdbId1",
    };

    // When
    const newState = watchedMoviesReducer(currentState, action);

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

  it("should update movie rating when user submit a new rate", () => {
    // Given
    const currentState = [
      {
        id: "id1",
        title: "title1",
        imdbId: "imdbId1",
      },
      {
        id: "idMovieToChange",
        title: "titleMovieToChange",
        imdbId: "imdbIdMovieToChange",
        userRating: 2,
      },
    ];

    const action = {
      type: CHANGE_WATCHED_MOVIE_RATING,
      payload: {
        movie: {
          id: "idMovieToChange",
          title: "titleMovieToChange",
          imdbId: "imdbIdMovieToChange",
          userRating: 2,
        },
        rating: 4,
      },
    };

    // When
    const newState = watchedMoviesReducer(currentState, action);

    // Then
    const expectedState = [
      {
        id: "id1",
        title: "title1",
        imdbId: "imdbId1",
      },
      {
        id: "idMovieToChange",
        title: "titleMovieToChange",
        imdbId: "imdbIdMovieToChange",
        userRating: 4,
      },
    ];
    expect(newState).toEqual(expectedState);
  });
});
