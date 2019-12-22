import React from "react";
import "./movies-watched.scss";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import MovieRating from "../../components/movie-rating/movie-rating";
import SearchSuggestions from "../../components/search-suggestions/search-suggestions";
import { MOVIE_DETAILS_ROUTE } from "../../shared/constants/routes";
import { Link } from "react-router-dom";

class MoviesWatchedPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchSuggestions: [] };
    this.setSearchSuggestions = this.setSearchSuggestions.bind(this);
  }

  setSearchSuggestions(moviesSuggestions) {
    this.setState({ searchSuggestions: moviesSuggestions });
  }

  getSearchSuggestionsDiv() {
    if (!this.state.searchSuggestions.length) {
      return;
    }

    const autocompleteSuggestions = this.state.searchSuggestions.map(movie => (
      <Link to={MOVIE_DETAILS_ROUTE + "/" + movie.id} key={movie.id}>
        <SearchSuggestions movie={movie} key={movie.id} />
      </Link>
    ));

    return (
      <div className="search-suggestions-container">
        {autocompleteSuggestions}
      </div>
    );
  }

  getMoviesWatched() {
    const MOVIE_1 =
      '{"Title":"Fight Club","Year":"1999","Rated":"R","Released":"15 Oct 1999","Runtime":"139 min","Genre":"Drama","Director":"David Fincher","Writer":"Chuck Palahniuk (novel), Jim Uhls (screenplay)","Actors":"Edward Norton, Brad Pitt, Meat Loaf, Zach Grenier","Plot":"An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.","Language":"English","Country":"USA, Germany","Awards":"Nominated for 1 Oscar. Another 10 wins & 34 nominations.","Poster":"https://m.media-amazon.com/images/M/MV5BMmEzNTkxYjQtZTc0MC00YTVjLTg5ZTEtZWMwOWVlYzY0NWIwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"8.8/10"},{"Source":"Rotten Tomatoes","Value":"79%"},{"Source":"Metacritic","Value":"66/100"}],"Metascore":"66","imdbRating":"8.8","imdbVotes":"1,729,708","imdbID":"tt0137523","Type":"movie","DVD":"06 Jun 2000","BoxOffice":"N/A","Production":"20th Century Fox","Website":"N/A","Response":"True"}';
    const MOVIE_2 =
      '{"Title":"Raging Bull","Year":"1980","Rated":"R","Released":"19 Dec 1980","Runtime":"129 min","Genre":"Biography, Drama, Sport","Director":"Martin Scorsese","Writer":"Jake LaMotta (based on the book by), Joseph Carter (with), Peter Savage (with), Paul Schrader (screenplay), Mardik Martin (screenplay)","Actors":"Robert De Niro, Cathy Moriarty, Joe Pesci, Frank Vincent","Plot":"The life of boxer Jake LaMotta, whose violence and temper that led him to the top in the ring destroyed his life outside of it.","Language":"English","Country":"USA","Awards":"Won 2 Oscars. Another 22 wins & 26 nominations.","Poster":"https://m.media-amazon.com/images/M/MV5BYjRmODkzNDItMTNhNi00YjJlLTg0ZjAtODlhZTM0YzgzYThlXkEyXkFqcGdeQXVyNzQ1ODk3MTQ@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"8.2/10"},{"Source":"Rotten Tomatoes","Value":"94%"},{"Source":"Metacritic","Value":"89/100"}],"Metascore":"89","imdbRating":"8.2","imdbVotes":"296,838","imdbID":"tt0081398","Type":"movie","DVD":"01 Aug 2000","BoxOffice":"N/A","Production":"United Artists","Website":"N/A","Response":"True"}';
    const MOVIE_3 =
      '{"Title":"Taxi Driver","Year":"1976","Rated":"R","Released":"09 Feb 1976","Runtime":"114 min","Genre":"Crime, Drama","Director":"Martin Scorsese","Writer":"Paul Schrader","Actors":"Diahnne Abbott, Robinson Frank Adu, Victor Argo, Gino Ardito","Plot":"A mentally unstable veteran works as a nighttime taxi driver in New York City, where the perceived decadence and sleaze fuels his urge for violent action by attempting to liberate a presidential campaign worker and an underage prostitute.","Language":"English, Spanish","Country":"USA","Awards":"Nominated for 4 Oscars. Another 21 wins & 15 nominations.","Poster":"https://m.media-amazon.com/images/M/MV5BM2M1MmVhNDgtNmI0YS00ZDNmLTkyNjctNTJiYTQ2N2NmYzc2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"8.3/10"},{"Source":"Rotten Tomatoes","Value":"97%"},{"Source":"Metacritic","Value":"94/100"}],"Metascore":"94","imdbRating":"8.3","imdbVotes":"665,169","imdbID":"tt0075314","Type":"movie","DVD":"15 Jun 1999","BoxOffice":"N/A","Production":"Columbia Pictures","Website":"N/A","Response":"True"}';
    const MOVIE_4 =
      '{"Title":"Terminator","Year":"1991","Rated":"N/A","Released":"N/A","Runtime":"39 min","Genre":"Short, Action, Sci-Fi","Director":"Ben Hernandez","Writer":"James Cameron (characters), James Cameron (concept), Ben Hernandez (screenplay)","Actors":"Loris Basso, James Callahan, Debbie Medows, Michelle Kovach","Plot":"A cyborg comes from the future, to kill a girl named Sarah Lee.","Language":"English","Country":"USA","Awards":"N/A","Poster":"N/A","Ratings":[{"Source":"Internet Movie Database","Value":"6.2/10"}],"Metascore":"N/A","imdbRating":"6.2","imdbVotes":"25","imdbID":"tt5817168","Type":"movie","DVD":"N/A","BoxOffice":"N/A","Production":"N/A","Website":"N/A","Response":"True"}';

    const MOCKED_MOVIES_VIWED = [
      JSON.parse(MOVIE_1),
      JSON.parse(MOVIE_2),
      JSON.parse(MOVIE_3),
      JSON.parse(MOVIE_4)
    ];

    const moviesWatched = MOCKED_MOVIES_VIWED.map((movie, index) => (
      <MovieRating movie={movie} key={index} />
    ));

    return (
      <div className="movies-watched-container">
        <div className="movies-watched-container__title">Films vus</div>
        {moviesWatched}
      </div>
    );
  }

  render() {
    return (
      <div id="movie-watched-page">
        <Header onSearchMovie={this.setSearchSuggestions} />

        {this.getSearchSuggestionsDiv()}
        {this.getMoviesWatched()}

        <Footer />
      </div>
    );
  }
}

export default MoviesWatchedPage;
