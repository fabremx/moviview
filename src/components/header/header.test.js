import React from "react";
import { TMDB_URL_SEARCH } from "../../shared/api/urls";
import Header from "./header";
import { shallow, mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

const PROPS = {
  onSearchMovie: jest.fn(),
};

const MOCKED_FETCH_RESULT = [{ id: "movie1" }, { id: "movie2" }];

const mockStore = configureStore([]);
const STORE = mockStore({});

describe("Header", () => {
  afterEach(() => {
    global.fetch.mockClear();
    delete global.fetch;
  });

  it("should search on TMDB Api with the correct query parameter when user tape any letter in the input form", () => {
    // Given
    const searchInput = "movie";
    const mockFetchResponse = {
      json: () =>
        Promise.resolve({
          results: MOCKED_FETCH_RESULT,
        }),
    };

    global.fetch = jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockFetchResponse));

    // When
    const component = mount(
      <Provider store={STORE}>
        <Header {...PROPS} />
      </Provider>
    );

    component
      .find("input")
      .simulate("change", { target: { value: searchInput } });

    // Then
    const expectedQuery = TMDB_URL_SEARCH + "&query=" + searchInput;
    expect(global.fetch).toHaveBeenCalledWith(expectedQuery);
  });

  it("should set call 'onSearchMovie' method with the fetch results when the search result is not empty", () => {
    // Given
    const mockFetchResponse = {
      json: () => ({
        results: MOCKED_FETCH_RESULT,
      }),
    };

    global.fetch = jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockFetchResponse));

    // When
    const component = mount(
      <Provider store={STORE}>
        <Header {...PROPS} />
      </Provider>
    );

    component
      .find("input")
      .simulate("change", { target: { value: "something" } });

    // Then
    const expectedParam = MOCKED_FETCH_RESULT;
    expect(PROPS.onSearchMovie).toHaveBeenCalledWith(expectedParam);
  });

  it.skip("should set call 'onSearchMovie' method with empty array when the search result is empty, null or undefined", () => {});

  it.skip("should call error snackbar when fetch retrieves an error", () => {});
});
