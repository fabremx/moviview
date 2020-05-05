import React from "react";
import "./modal-delete.scss";
import { connect } from "react-redux";
import { RESET_ON_GOING_ACTION } from "../../redux/actions";

export class ModalDelete extends React.Component {
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
  onGoingAction: state.onGoingAction,
});

const mapDispatchToProps = (dispatch) => ({
  resetOnGoingAction: () =>
    dispatch({
      type: RESET_ON_GOING_ACTION,
      payload: null,
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalDelete);
