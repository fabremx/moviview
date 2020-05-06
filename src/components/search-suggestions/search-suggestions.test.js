import React from "react";
import SearchSuggestions from "./search-suggestions";
import { shallow } from "enzyme";

const MOCK_MOVIE = {
  title: "Title",
  original_title: "Original title",
  poster_path: "/o8XGtRGGf8JGv0CInCqXtxH88LY.jpg",
  release_date: "2020-08-07",
};

const PROPS = {
  movie: MOCK_MOVIE,
};

describe("Search suggestion", () => {
  it("should render the original title when it exists", () => {
    // When
    const component = shallow(<SearchSuggestions {...PROPS} />);

    // Then
    const displayedTitle = "Title (Original title)";
    expect(component.find(".search-suggestion__title").text()).toEqual(
      displayedTitle
    );
  });

  it("should NOT render the original title when it equal to the common title", () => {
    // Given
    const movie = {
      ...PROPS.movie,
      title: "Same Title",
      original_title: "Same Title",
    };
    const props = {
      movie,
    };

    // When
    const component = shallow(<SearchSuggestions {...props} />);

    // Then
    const displayedTitle = "Same Title ";
    expect(component.find(".search-suggestion__title").text()).toEqual(
      displayedTitle
    );
  });

  it("should render only the year as release date when movie have a release date", () => {
    // When
    const component = shallow(<SearchSuggestions {...PROPS} />);

    // Then
    const displayedRealeaseDate = "Année de sortie: 2020";
    expect(component.find(".search-suggestion__release").text()).toEqual(
      displayedRealeaseDate
    );
  });

  it("should NOT render release date when movie have NOT a release date", () => {
    // Given
    const movie = {
      ...PROPS.movie,
      release_date: undefined,
    };

    const props = {
      movie,
    };

    // When
    const component = shallow(<SearchSuggestions {...props} />);

    // Then
    const displayedRealeaseDate = "Année de sortie: ";
    expect(component.find(".search-suggestion__release").text()).toEqual(
      displayedRealeaseDate
    );
  });
});
