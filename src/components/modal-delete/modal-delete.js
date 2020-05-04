import React from "react";
import "./modal-delete.scss";
import { connect } from "react-redux";
import { resetOnGoingAction } from "../../redux/actions/on-going-action-actions";

class ModalDelete extends React.Component {
  closeModal = () => {
    this.props.resetOnGoingAction();
    this.props.onCloseModal();
  };

  stopPropagation = (event) => {
    event.stopPropagation();
  };

  deleteMovie = () => {
    this.props.onGoingAction.callback(this.props.onGoingAction.movieId);
    this.closeModal();
  };

  render() {
    if (!this.props.show) {
      return null;
    }

    return (
      <div className="modal-delete" onClick={this.closeModal}>
        <div className="modal-delete__content" onClick={this.stopPropagation}>
          <span className="close" onClick={this.closeModal}>
            &times;
          </span>

          <div className="modal-text">
            <h2>Supprimer ce film ?</h2>
            <p>
              Êtes-vous sûr de vouloir supprimer définitivement ce film de la
              liste ?
            </p>
          </div>

          <div className="button button__delete" onClick={this.deleteMovie}>
            SUPPRIMER
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({
  resetOnGoingAction: () => dispatch(resetOnGoingAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalDelete);
