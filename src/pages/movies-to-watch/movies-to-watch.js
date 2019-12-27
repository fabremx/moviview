import React from "react";
import "./movies-to-watch.scss";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import SearchSuggestions from "../../components/search-suggestions/search-suggestions";
import { MOVIE_DETAILS_ROUTE } from "../../shared/constants/routes";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteMovieToWatchAction } from "../../actions/movies-to-watch-actions";
import MovieSuggestion from "../../components/movie-suggestion/movie-suggestion";
import ModalDelete from "../../components/modal-delete/modal-delete";

class MoviesToWatchPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = { searchSuggestions: [] };
  }

  setSearchSuggestions = moviesSuggestions => {
    this.setState({ searchSuggestions: moviesSuggestions });
  };

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

  getMoviesToWatch() {
    const moviesToWatch = this.props.moviesToWatch.map((movie, index) => (
      <MovieSuggestion
        movie={movie}
        key={index}
        onToggleDeleteModal={this.toggleDeleteModal}
      />
    ));

    return (
      <div className="watched-movies-container">
        <div className="watched-movies-container__title">Films à voir</div>
        {moviesToWatch}
      </div>
    );
  }

  toggleDeleteModal = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  };

  render() {
    return (
      <div id="movie-watched-page">
        <Header onSearchMovie={this.setSearchSuggestions} />

        {this.getSearchSuggestionsDiv()}
        {this.getMoviesToWatch()}

        <ModalDelete
          show={this.state.isModalOpen}
          onCloseModal={this.toggleDeleteModal}
        />

        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  deleteMovieToWatchAction: () => dispatch(deleteMovieToWatchAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(MoviesToWatchPage);
