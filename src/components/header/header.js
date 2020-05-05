import React from "react";
import { connect } from "react-redux";
import searchIcon from "../../shared/images/search-icon.png";
import "./header.scss";
import { TMDB_URL_SEARCH } from "../../shared/api/urls";
import { SNACKBAR_ERROR_TYPE } from "../../shared/constants/variables";
import { DISPLAY_SNACKBAR } from "../../redux/actions";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { moviesList: [] };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    fetch(TMDB_URL_SEARCH + "&query=" + event.target.value)
      .then((res) => res.json())
      .then(
        (response) => {
          const moviesList =
            response.results && response.results.length ? response.results : [];
          this.setState({ moviesList });
          this.props.onSearchMovie(moviesList);
        },
        (error) => {
          console.log(error);
          this.props.displaySnackbar({
            message: "Erreur. Impossible de joindre l'API.",
            type: SNACKBAR_ERROR_TYPE,
          });
        }
      );
  }

  render() {
    return (
      <div className="header">
        <span className="header__title">Moviview</span>

        <div className="header__input">
          <input
            type="text"
            placeholder="Rechercher un film..."
            value={this.state.value}
            onChange={this.handleChange}
          />
          <img src={searchIcon} alt="search icon" />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  displaySnackbar: (payload) =>
    dispatch({
      type: DISPLAY_SNACKBAR,
      payload,
    }),
});

export default connect(null, mapDispatchToProps)(Header);
