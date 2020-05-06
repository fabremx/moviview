import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BrowserRouter } from "react-router-dom";
import { MOVIE_DETAILS_ROUTE } from "../../shared/constants/routes";
import { mount } from "enzyme";
import { SET_ON_GOING_ACTION } from "../../redux/actions";
import MovieSuggestion from "./movie-suggestion";

const mockStore = configureStore([]);
const store = mockStore({});

const MOCK_MOVIE = {
  actors: "Ashley Tisdale, Simon Rex, Gracie Whitton, Ava Kolker",
  backgroundSrc: "/kttkW0qMv4quwRH5a59gQMFrpl2.jpg",
  country: "USA",
  director: "Malcolm D. Lee, David Zucker",
  genres: [
    {
      id: 35,
      name: "Comédie",
    },
  ],
  id: 4258,
  imdbId: "tt0795461",
  imdbRating: "3.5",
  originalTitle: "Scary Movie 5",
  posterSrc: "/2uXj7DCoSknaUzIHJ3F460Z7t24.jpg",
  releaseYear: "2013",
  runtime: 89,
  synopsis:
    "Jody et Dan, qui forment un jeune couple, emménagent avec leur bébé dans une maison où semblent se manifester d'étranges phénomènes. Ils vont faire appel à un médium... et au ballet pour faire la lumière sur cette malédiction.",
  title: "Scary Movie 5",
  userRating: 3,
};

const PROPS = {
  movie: MOCK_MOVIE,
  onToggleDeleteModal: jest.fn(),
};

describe("Movie Suggestion", () => {
  it("should set the correct path redirection", () => {
    // When
    const component = mount(
      <Provider store={store}>
        <BrowserRouter>
          <MovieSuggestion {...PROPS} />
        </BrowserRouter>
      </Provider>
    );

    // Then
    const expectedURL = MOVIE_DETAILS_ROUTE + "/" + MOCK_MOVIE.imdbId;
    expect(component.find("Link").props().to).toEqual(expectedURL);
  });

  it("should call delete modal when user click on the close icon", () => {
    // When
    const component = mount(
      <Provider store={store}>
        <BrowserRouter>
          <MovieSuggestion {...PROPS} />
        </BrowserRouter>
      </Provider>
    );

    component.find(".movie-suggestion__close").simulate("click");

    // Then
    const actionsCalled = store.getActions();
    const expectedActionCalled = [
      {
        type: SET_ON_GOING_ACTION,
        payload: {
          type: "DELETE",
          list: "movies-to-watch",
          movieId: MOCK_MOVIE.imdbId,
          callback: expect.any(Function),
        },
      },
    ];

    expect(PROPS.onToggleDeleteModal).toHaveBeenCalled();
    expect(actionsCalled).toEqual(expect.arrayContaining(expectedActionCalled));
  });
});
