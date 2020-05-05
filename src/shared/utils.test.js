import { TMDB_URL_IMAGE } from "./api/urls";
import imageNotAvailable from "./images/not-available.png";
import {
  RATING_1_COMMENT,
  RATING_2_COMMENT,
  RATING_3_COMMENT,
  RATING_4_COMMENT,
  RATING_5_COMMENT,
} from "./constants/rating-comments";

import utils from "./utils";

describe("getMoviePoster", () => {
  it("should return the correct url to find image when movie has a specified image url", () => {
    // Given
    const imageSource = "imageSource";

    // When
    const result = utils.getMoviePoster(imageSource);

    // Then
    const expectedResult = TMDB_URL_IMAGE + imageSource;
    expect(result).toEqual(expectedResult);
  });

  it("should return the no available image when movie has a NO specified image url", () => {
    // Given
    const imageSource = undefined;

    // When
    const result = utils.getMoviePoster(imageSource);

    // Then
    const expectedResult = imageNotAvailable;
    expect(result).toEqual(expectedResult);
  });
});

describe("getReadableRuntime", () => {
  it("should display 3h 12min when the movie duration is equal to 192 minutes", () => {
    // Given
    const totalMinutes = 192;

    // When
    const result = utils.getReadableRuntime(totalMinutes);

    // Then
    const expectedResult = "3h 12min";
    expect(result).toEqual(expectedResult);
  });
});

describe("displayRatingComment", () => {
  [
    {
      numberOfSelectedStar: 1,
      result: RATING_1_COMMENT,
    },
    {
      numberOfSelectedStar: 2,
      result: RATING_2_COMMENT,
    },
    {
      numberOfSelectedStar: 3,
      result: RATING_3_COMMENT,
    },
    {
      numberOfSelectedStar: 4,
      result: RATING_4_COMMENT,
    },
    {
      numberOfSelectedStar: 5,
      result: RATING_5_COMMENT,
    },
  ].forEach((item) => {
    it(`should return the correct movie rate description when rate is equal to ${item.numberOfSelectedStar}`, () => {
      // When
      const result = utils.displayRatingComment(item.numberOfSelectedStar);

      // Then
      expect(result).toEqual(item.result);
    });
  });
});
