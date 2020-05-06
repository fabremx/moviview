import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BrowserRouter } from "react-router-dom";
import MovieRating from "./movie-rating";
import { MOVIE_DETAILS_ROUTE } from "../../shared/constants/routes";
import { mount } from "enzyme";
import { SET_ON_GOING_ACTION } from "../../redux/actions";

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

describe("Movie Rating", () => {
  it("should set the correct path redirection", () => {
    // When
    const component = mount(
      <Provider store={store}>
        <BrowserRouter>
          <MovieRating {...PROPS} />
        </BrowserRouter>
      </Provider>
    );

    // Then
    const expectedURL = MOVIE_DETAILS_ROUTE + "/" + MOCK_MOVIE.imdbId;
    expect(component.find("Link").props().to).toEqual({
      pathname: expectedURL,
      movie: MOCK_MOVIE,
    });
  });

  [
    {
      movie: {
        ...MOCK_MOVIE,
        userRating: 0,
      },
      result: {
        emptyStarCount: 5,
        fullStarCount: 0,
      },
    },
    {
      movie: {
        ...MOCK_MOVIE,
        userRating: 1,
      },
      result: {
        emptyStarCount: 4,
        fullStarCount: 1,
      },
    },
    {
      movie: {
        ...MOCK_MOVIE,
        userRating: 2,
      },
      result: {
        emptyStarCount: 3,
        fullStarCount: 2,
      },
    },
    {
      movie: {
        ...MOCK_MOVIE,
        userRating: 3,
      },
      result: {
        emptyStarCount: 2,
        fullStarCount: 3,
      },
    },
    {
      movie: {
        ...MOCK_MOVIE,
        userRating: 4,
      },
      result: {
        emptyStarCount: 1,
        fullStarCount: 4,
      },
    },
    {
      movie: {
        ...MOCK_MOVIE,
        userRating: 5,
      },
      result: {
        emptyStarCount: 0,
        fullStarCount: 5,
      },
    },
  ].forEach((item) => {
    it(`should display the correct number of empty/full rating star when the user rates is equal to ${item.movie.userRating}`, () => {
      // Given
      const props = {
        ...PROPS,
        movie: item.movie,
      };

      // When
      const component = mount(
        <Provider store={store}>
          <BrowserRouter>
            <MovieRating {...props} />
          </BrowserRouter>
        </Provider>
      );

      // Then
      expect(component.find(".full-star-icon").length).toEqual(
        item.result.fullStarCount
      );
      expect(component.find(".empty-star-icon").length).toEqual(
        item.result.emptyStarCount
      );
    });
  });

  it("should call delete modal when user click on the close icon", () => {
    // When
    const component = mount(
      <Provider store={store}>
        <BrowserRouter>
          <MovieRating {...PROPS} />
        </BrowserRouter>
      </Provider>
    );

    component.find(".movie-watched__close").simulate("click");

    // Then
    const actionsCalled = store.getActions();
    const expectedActionCalled = [
      {
        type: SET_ON_GOING_ACTION,
        payload: {
          type: "DELETE",
          list: "watched-movies",
          movieId: MOCK_MOVIE.imdbId,
          callback: expect.any(Function),
        },
      },
    ];

    expect(PROPS.onToggleDeleteModal).toHaveBeenCalled();
    expect(actionsCalled).toEqual(expect.arrayContaining(expectedActionCalled));
  });
});
