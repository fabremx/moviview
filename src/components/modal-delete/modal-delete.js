import React from "react";
import "./modal-delete.scss";
import {useModal} from "../../hooks/useModal";

export const ModalDelete = () => {
    const {modal, closeModal} = useModal()

    const onClick = () => {
        modal.callback()
        closeModal()
    }

    if (!modal.isActive) return null

    return (
        <div className="modal-delete" onClick={closeModal}>
            <div className="modal-delete__content" onClick={(event) => event.stopPropagation()}>
                <span className="close" onClick={closeModal}>
                    &times;
                </span>

                <div className="modal-text">
                    <h2>Supprimer ce film ?</h2>

                    <p>
                        Êtes-vous sûr de vouloir supprimer définitivement ce film de la
                        liste ?
                    </p>
                </div>

                <div className="button button__delete" onClick={onClick}>
                    SUPPRIMER
                </div>
            </div>
        </div>
    )
}
