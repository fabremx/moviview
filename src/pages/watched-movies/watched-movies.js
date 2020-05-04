import React from "react";
import "./watched-movies.scss";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import MovieRating from "../../components/movie-rating/movie-rating";
import SearchSuggestions from "../../components/search-suggestions/search-suggestions";
import { MOVIE_DETAILS_ROUTE } from "../../shared/constants/routes";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteWatchedMovieAction } from "../../actions/watched-movies-actions";
import ModalDelete from "../../components/modal-delete/modal-delete";

class WatchedMoviesPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = { searchSuggestions: [], isModalOpen: false };
  }

  setSearchSuggestions = (moviesSuggestions) => {
    this.setState({ searchSuggestions: moviesSuggestions });
  };

  toggleDeleteModal = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  };

  render() {
    return (
      <div id="movie-watched-page">
        <Header onSearchMovie={this.setSearchSuggestions} />

        {this.state.searchSuggestions.length && (
          <div className="search-suggestions-container">
            {this.state.searchSuggestions.map((movie) => (
              <Link to={MOVIE_DETAILS_ROUTE + "/" + movie.id} key={movie.id}>
                <SearchSuggestions movie={movie} key={movie.id} />
              </Link>
            ))}
          </div>
        )}

        <div className="watched-movies-container">
          <div className="watched-movies-container__title">Films vus</div>
          {this.props.watchedMovies.map((movie, index) => (
            <MovieRating
              movie={movie}
              key={index}
              onToggleDeleteModal={this.toggleDeleteModal}
            />
          ))}
        </div>

        <ModalDelete
          show={this.state.isModalOpen}
          onCloseModal={this.toggleDeleteModal}
        />

        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({
  deleteWatchedMovieAction: () => dispatch(deleteWatchedMovieAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WatchedMoviesPage);
