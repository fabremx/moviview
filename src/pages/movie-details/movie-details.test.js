import React from "react";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {BrowserRouter} from "react-router-dom";
import MovieDetailsPage from "./movie-details";
import {mount} from "enzyme";
import {WATCHED_MOVIES_ROUTE} from "../../shared/constants/routes";
import {
    ADD_MOVIE_TO_WATCH,
    ADD_WATCHED_MOVIE,
    CHANGE_WATCHED_MOVIE_RATING,
    DELETE_MOVIE_TO_WATCH,
    DISPLAY_SNACKBAR,
    SAVE_MOVIES_TO_WATCH_ON_LOCAL_STORAGE,
    SAVE_WATCHED_MOVIES_ON_LOCAL_STORAGE,
} from "../../redux/actions";
import {SNACKBAR_SUCCESS_TYPE} from "../../shared/constants/variables";

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

const mockStore = configureStore([]);

const STATE = {
  watchedMovies: [],
  moviesToWatch: [],
  onGoingAction: {},
  global: {
    snackbar: {
      isSnackbarActive: false,
    },
  },
};

const STATE_FROM_MOVIE_SUGGESTION = {
  ...STATE,
  history: { location: { movie: null } },
};

const STATE_FROM_MOVIES_LIST = {
  ...STATE,
  history: { location: { movie: MOCK_MOVIE } },
};

describe("Movie details page", () => {
  it.skip("should fetch the movie when user go to detail page from movie suggestion", async () => {});

  it("should NOT fetch the movie AND correctly set local state when user go to detail page from a list", () => {
    // Given
    const store = mockStore(STATE_FROM_MOVIES_LIST);
    global.fetch = jest.fn();

    // When
    const component = mount(
      <Provider store={store}>
        <BrowserRouter>
          <MovieDetailsPage />
        </BrowserRouter>
      </Provider>
    );

    // Then
    expect(global.fetch).not.toHaveBeenCalled();
    expect(component.find("MovieDetailsPage").state().movie).toEqual(
      MOCK_MOVIE
    );
    expect(component.find("MovieDetailsPage").state().selectedStar).toEqual(
      MOCK_MOVIE.userRating
    );
    expect(component.find("MovieDetailsPage").state().watchedMovie).toEqual(
      true
    );
  });

  it("should render Loader when movie is not fetched yet", async () => {
    // Given
    const store = mockStore(STATE_FROM_MOVIES_LIST);

    // When
    const component = await mount(
      <Provider store={store}>
        <BrowserRouter>
          <MovieDetailsPage />
        </BrowserRouter>
      </Provider>
    );

    // Fake that no movie have been retrieved
    component.find("MovieDetailsPage").setState({ movie: null });

    // Then
    expect(component.find(".movie-details__loading").length).toEqual(1);
    expect(component.find("#movie-details-page").length).toEqual(0);
  });

  it("should call goBack history method when user click on the return button", () => {});

  describe("button 'AJOUTER A LA LISTE A VOIR'", () => {
    it("should render the button 'AJOUTER A LA LISTE A VOIR' when movie NOT belong to movie-to-wtach or watched-movies lists", () => {
      // Given
      const store = mockStore(STATE_FROM_MOVIES_LIST);

      // When
      const component = mount(
        <Provider store={store}>
          <BrowserRouter>
            <MovieDetailsPage />
          </BrowserRouter>
        </Provider>
      );

      // Then
      expect(component.find(".movie-details__button").length).toEqual(1);
    });

    it("should NOT render the button 'AJOUTER A LA LISTE A VOIR' when movie belong to movie-to-wtach list", () => {
      // Given
      const state = {
        ...STATE_FROM_MOVIES_LIST,
        moviesToWatch: [MOCK_MOVIE],
      };
      const store = mockStore(state);

      // When
      const component = mount(
        <Provider store={store}>
          <BrowserRouter>
            <MovieDetailsPage />
          </BrowserRouter>
        </Provider>
      );

      // Then
      expect(component.find(".movie-details__button").length).toEqual(0);
    });

    it("should NOT render the button 'AJOUTER A LA LISTE A VOIR' when movie belong to watched-movies list", () => {
      // Given
      const state = {
        ...STATE_FROM_MOVIES_LIST,
        watchedMovies: [MOCK_MOVIE],
      };
      const store = mockStore(state);

      // When
      const component = mount(
        <Provider store={store}>
          <BrowserRouter>
            <MovieDetailsPage />
          </BrowserRouter>
        </Provider>
      );

      // Then
      expect(component.find(".movie-details__button").length).toEqual(0);
    });

    it("should set correct redirection when user click on the 'AJOUTER A LA LISTE A VOIR' button", () => {
      // Given
      const store = mockStore(STATE_FROM_MOVIES_LIST);

      // When
      const component = mount(
        <Provider store={store}>
          <BrowserRouter>
            <MovieDetailsPage />
          </BrowserRouter>
        </Provider>
      );

      // Then
      expect(
        component.find(".movie-details__button").parent().props().href
      ).toEqual(WATCHED_MOVIES_ROUTE);
    });

    it("should add movie, save in localStorage and call snackbar when user add the movie to the movies-to-watch list", () => {
      // Given
      const store = mockStore(STATE_FROM_MOVIES_LIST);

      // When
      const component = mount(
        <Provider store={store}>
          <BrowserRouter>
            <MovieDetailsPage />
          </BrowserRouter>
        </Provider>
      );

      component.find(".movie-details__button").simulate("click");

      // Then
      const actionsCalled = store.getActions();
      const expectedActionCalled = [
        {
          type: ADD_MOVIE_TO_WATCH,
          payload: MOCK_MOVIE,
        },
        {
          type: SAVE_MOVIES_TO_WATCH_ON_LOCAL_STORAGE,
          payload: null,
        },
        {
          type: DISPLAY_SNACKBAR,
          payload: {
            message: "Film ajouté à la liste 'A voir' avec succès.",
            type: SNACKBAR_SUCCESS_TYPE,
          },
        },
      ];

      expect(actionsCalled).toEqual(
        expect.arrayContaining(expectedActionCalled)
      );
    });
  });

  describe("Rating Star", () => {
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
        const state = {
          ...STATE_FROM_MOVIES_LIST,
          history: {
            location: {
              movie: {
                ...MOCK_MOVIE,
                userRating: item.movie.userRating,
              },
            },
          },
        };
        const store = mockStore(state);

        // When
        const component = mount(
          <Provider store={store}>
            <BrowserRouter>
              <MovieDetailsPage />
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

    it.skip("should NOT display validation button when no rate have been given to the movie", () => {
      // TODO: handle fetch otherwise only loader is displayed
      // Given
      const store = mockStore(STATE_FROM_MOVIE_SUGGESTION);

      // When
      const component = mount(
        <Provider store={store}>
          <BrowserRouter>
            <MovieDetailsPage />
          </BrowserRouter>
        </Provider>
      );

      // Then
      expect(component.find(".validation-rate-button").length).toEqual(0);
    });

    it("should NOT display validation button when user did NOT change the rate", () => {
      // Given
      const store = mockStore(STATE_FROM_MOVIES_LIST);

      // When
      const component = mount(
        <Provider store={store}>
          <BrowserRouter>
            <MovieDetailsPage />
          </BrowserRouter>
        </Provider>
      );

      // Then
      expect(component.find(".validation-rate-button").length).toEqual(0);
    });

    it("should display validation button when user selects a rate", () => {
      // Given
      const store = mockStore(STATE_FROM_MOVIES_LIST);

      // When
      const component = mount(
        <Provider store={store}>
          <BrowserRouter>
            <MovieDetailsPage />
          </BrowserRouter>
        </Provider>
      );

      component.find(".empty-star-icon").at(0).simulate("click");

      // Then
      expect(component.find(".validation-rate-button").length).toEqual(1);
    });

    it("should set the correct redirection on validate button", () => {
      // Given
      const store = mockStore(STATE_FROM_MOVIES_LIST);

      // When
      const component = mount(
        <Provider store={store}>
          <BrowserRouter>
            <MovieDetailsPage />
          </BrowserRouter>
        </Provider>
      );

      component.find(".empty-star-icon").at(0).simulate("click");

      // Then
      expect(
        component.find(".validation-rate-button").parent().props().href
      ).toEqual(WATCHED_MOVIES_ROUTE);
    });

    it.skip("should call correct actions when user rates for the first time the movie", () => {
      //TODO: handle fetch otherwise only loader is displayed
      // Given
      const store = mockStore(STATE_FROM_MOVIE_SUGGESTION);

      // When
      const component = mount(
        <Provider store={store}>
          <BrowserRouter>
            <MovieDetailsPage />
          </BrowserRouter>
        </Provider>
      );

      component.find(".empty-star-icon").at(0).simulate("click");
      component.find(".validation-rate-button").simulate("click");

      // Then
      const actionsCalled = store.getActions();
      const expectedActionCalled = [
        {
          type: ADD_WATCHED_MOVIE,
          payload: MOCK_MOVIE,
        },
        {
          type: DELETE_MOVIE_TO_WATCH,
          payload: MOCK_MOVIE.imdbId,
        },
        {
          type: DISPLAY_SNACKBAR,
          payload: {
            message: "Film ajouté à la liste 'Vu' avec succès.",
            type: SNACKBAR_SUCCESS_TYPE,
          },
        },
        {
          type: SAVE_WATCHED_MOVIES_ON_LOCAL_STORAGE,
          payload: null,
        },
      ];

      expect(actionsCalled).toEqual(
        expect.arrayContaining(expectedActionCalled)
      );
    });

    it("should call correct actions when user updates an existing movie rate", () => {
      // Given
      const store = mockStore(STATE_FROM_MOVIES_LIST);

      // When
      const component = mount(
        <Provider store={store}>
          <BrowserRouter>
            <MovieDetailsPage />
          </BrowserRouter>
        </Provider>
      );

      // Pass the movie rate from 3 to 1
      component.find(".full-star-icon").at(0).simulate("click");
      component.find(".validation-rate-button").simulate("click");

      // Then
      const actionsCalled = store.getActions();
      const expectedActionCalled = [
        {
          type: CHANGE_WATCHED_MOVIE_RATING,
          payload: {
            movie: MOCK_MOVIE,
            rating: 1,
          },
        },
        {
          type: DISPLAY_SNACKBAR,
          payload: {
            message: "La note du film à bien été changé.",
            type: SNACKBAR_SUCCESS_TYPE,
          },
        },
        {
          type: SAVE_WATCHED_MOVIES_ON_LOCAL_STORAGE,
          payload: null,
        },
      ];

      expect(actionsCalled).toEqual(
        expect.arrayContaining(expectedActionCalled)
      );
    });
  });
});
