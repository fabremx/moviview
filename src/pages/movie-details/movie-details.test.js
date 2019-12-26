import MovieDetailsPage from "./movie-details";

describe("Movie details", () => {
  const component = new MovieDetailsPage();

  describe("doesUserRateMovie", () => {
    it("should return true when user rated the movie", () => {
      // Given
      component.state.ratingStars = [true, true, false, false, false];

      // When
      const result = component.doesUserRateMovie();

      // Then
      expect(result).toBe(true);
    });

    it("should return false when user didn't rate the movie yet", () => {
      // Given
      component.state.ratingStars = [false, false, false, false, false];

      // When
      const result = component.doesUserRateMovie();

      // Then
      expect(result).toBe(false);
    });
  });
});
