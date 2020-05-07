import React from "react";
import { MOVIE_DETAILS_ROUTE } from "../../shared/constants/routes";
import WatchedMoviesPage from "./watched-movies";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BrowserRouter } from "react-router-dom";
import { mount } from "enzyme";

const MOCK_MOVIE_SUGGESTION_1 = {
  adult: false,
  backdrop_path: "/8iVyhmjzUbvAGppkdCZPiyEHSoF.jpg",
  genre_ids: [18],
  id: 550,
  original_language: "en",
  original_title: "Fight Club",
  overview:
    "Le narrateur, sans identité précise, vit seul, travaille seul, dort seul, mange seul ses plateaux-repas pour une personne comme beaucoup d’autres personnes seules qui connaissent la misère humaine, morale et sexuelle. C’est pourquoi il va devenir membre du Fight club, un lieu clandestin où il va pouvoir retrouver sa virilité, l’échange et la communication. Ce club est dirigé par Tyler Durden, une sorte d’anarchiste entre gourou et philosophe qui prêche l’amour de son prochain.",
  popularity: 43.276,
  poster_path: "/fCTjGJxKWZGWQDCGFGYMGvh4VNP.jpg",
  release_date: "1999-10-15",
  title: "Fight Club",
  video: false,
  vote_average: 8.4,
  vote_count: 19070,
};

const MOCK_MOVIE_SUGGESTION_2 = {
  adult: false,
  backdrop_path: "/47rioCQJLDe6gT7NYdPf7IRy3Nu.jpg",
  genre_ids: (4)[(28, 18, 9648, 53)],
  id: 670,
  original_language: "ko",
  original_title: "올드보이",
  overview:
    "À la fin des années 80, Oh Dae-Soo, père de famille sans histoire, est enlevé un jour devant chez lui. Séquestré pendant plusieurs années dans une cellule privée, son seul lien avec l'extérieur est une télévision. Par le biais de cette télévision, il apprend le meurtre de sa femme, meurtre dont il est le principal suspect. Au désespoir d'être séquestré sans raison apparente succède alors chez le héros une rage intérieure vengeresse qui lui permet de survivre. Il est relâché 15 ans plus tard, toujours sans explication. Oh Dae-Soo est alors contacté par celui qui semble être le responsable de ses malheurs, qui lui propose de découvrir qui l'a enlevé et pourquoi. Le cauchemar continue pour le héros.",
  popularity: 21.816,
  poster_path: "/u0Ct3708zXaoJCkF65bLfenQmhM.jpg",
  release_date: "2003-11-21",
  title: "Old Boy",
  video: false,
  vote_average: 8.2,
  vote_count: 4711,
};

const MOCK_MOVIE_TO_WATCH = {
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
const store = mockStore({
  watchedMovies: [],
});

describe("Watched Movies Page", () => {
  describe("Header and SeachSuggestion", () => {
    it("should not render movie suggestions when header component does not retrieve array of movie", () => {
      // When
      const component = mount(
        <Provider store={store}>
          <BrowserRouter>
            <WatchedMoviesPage />
          </BrowserRouter>
        </Provider>
      );

      // Then
      expect(component.find(".search-suggestions-container").length).toEqual(0);
    });

    it("should render movie suggestions list when header component retrieves array of movies ", () => {
      // Given
      const movieSuggestion = [
        MOCK_MOVIE_SUGGESTION_1,
        MOCK_MOVIE_SUGGESTION_2,
      ];

      // When
      const component = mount(
        <Provider store={store}>
          <BrowserRouter>
            <WatchedMoviesPage />
          </BrowserRouter>
        </Provider>
      );

      component.find("Header").props().onSearchMovie(movieSuggestion);
      component.update();

      // Then
      expect(component.find(".search-suggestions-container").length).toEqual(1);
      expect(component.find("SearchSuggestions").length).toEqual(2);
    });

    it("should set the correct redirection to each movie suggestion when header component retrieves array of movies", () => {
      // Given
      const movieSuggestion = [
        MOCK_MOVIE_SUGGESTION_1,
        MOCK_MOVIE_SUGGESTION_2,
      ];

      // When
      const component = mount(
        <Provider store={store}>
          <BrowserRouter>
            <WatchedMoviesPage />
          </BrowserRouter>
        </Provider>
      );

      component.find("Header").props().onSearchMovie(movieSuggestion);
      component.update();

      // Then
      expect(component.find(".search-suggestions-container").length).toEqual(1);

      const expectedUrlSearch0 =
        MOVIE_DETAILS_ROUTE + "/" + MOCK_MOVIE_SUGGESTION_1.id;
      const expectedUrlSearch1 =
        MOVIE_DETAILS_ROUTE + "/" + MOCK_MOVIE_SUGGESTION_2.id;

      expect(
        component.find("SearchSuggestions").at(0).parent().props().href
      ).toEqual(expectedUrlSearch0);
      expect(
        component.find("SearchSuggestions").at(1).parent().props().href
      ).toEqual(expectedUrlSearch1);
    });

    it("should pass the correct props to SearchSuggestions component when header component retrieves array of movies", () => {
      // Given
      const movieSuggestion = [
        MOCK_MOVIE_SUGGESTION_1,
        MOCK_MOVIE_SUGGESTION_2,
      ];

      // When
      const component = mount(
        <Provider store={store}>
          <BrowserRouter>
            <WatchedMoviesPage />
          </BrowserRouter>
        </Provider>
      );

      component.find("Header").props().onSearchMovie(movieSuggestion);
      component.update();

      // Then
      expect(component.find(".search-suggestions-container").length).toEqual(1);
      expect(component.find("SearchSuggestions").at(0).props().movie).toEqual(
        MOCK_MOVIE_SUGGESTION_1
      );
      expect(component.find("SearchSuggestions").at(1).props().movie).toEqual(
        MOCK_MOVIE_SUGGESTION_2
      );
    });
  });

  describe("watched movies List", () => {
    it("should render message when there are no movies in watched movies list", () => {
      // When
      const component = mount(
        <Provider store={store}>
          <BrowserRouter>
            <WatchedMoviesPage />
          </BrowserRouter>
        </Provider>
      );

      // Then
      expect(component.find(".watched-movies--no-movies").length).toEqual(1);
      expect(component.find("MovieRating").length).toEqual(0);
    });

    it("should render movies when there are movies in watched movies list", () => {
      // Given
      const store = mockStore({
        watchedMovies: [MOCK_MOVIE_TO_WATCH],
      });

      // When
      const component = mount(
        <Provider store={store}>
          <BrowserRouter>
            <WatchedMoviesPage />
          </BrowserRouter>
        </Provider>
      );

      // Then
      expect(component.find(".watched-movies--no-movies").length).toEqual(0);
      expect(component.find("MovieRating").length).toEqual(1);
      expect(component.find("MovieRating").props().movie).toEqual(
        MOCK_MOVIE_TO_WATCH
      );
    });
  });

  describe("Delete Modal", () => {
    it("should not render by default the delete modal", () => {
      // When
      const component = mount(
        <Provider store={store}>
          <BrowserRouter>
            <WatchedMoviesPage />
          </BrowserRouter>
        </Provider>
      );

      // Then
      expect(component.find("ModalDelete").props().show).toEqual(false);
    });

    it("should render the delete modal when user delete a movie", () => {
      // Given
      const store = mockStore({
        watchedMovies: [MOCK_MOVIE_TO_WATCH],
      });

      // When
      const component = mount(
        <Provider store={store}>
          <BrowserRouter>
            <WatchedMoviesPage />
          </BrowserRouter>
        </Provider>
      );

      component.find("MovieRating").props().onToggleDeleteModal();
      component.update();

      // Then
      expect(component.find("ModalDelete").props().show).toEqual(true);
    });

    it("should hide the delete modal when user close the modal", () => {
      // Given
      const store = mockStore({
        watchedMovies: [MOCK_MOVIE_TO_WATCH],
      });

      // When
      const component = mount(
        <Provider store={store}>
          <BrowserRouter>
            <WatchedMoviesPage />
          </BrowserRouter>
        </Provider>
      );

      component.find("MovieRating").props().onToggleDeleteModal();
      component.find("ModalDelete").props().onCloseModal();
      component.update();

      // Then
      expect(component.find("ModalDelete").props().show).toEqual(false);
    });
  });

  describe("Footer", () => {
    it("should render Footer component", () => {
      // When
      const component = mount(
        <Provider store={store}>
          <BrowserRouter>
            <WatchedMoviesPage />
          </BrowserRouter>
        </Provider>
      );

      // Then
      expect(component.find("Footer").length).toEqual(1);
    });
  });
});
