import closeIcon from "../../shared/images/close-snackbar-icon.png";
import React from "react";
import {useSnackbar} from "../../hooks/useSnackbar";
import {SNACKBAR_TYPE} from "../../shared/constants/variables";
import validIcon from "../../shared/images/valid-snackbar-icon.png";
import "./snackbar.scss"

export const Snackbar = () => {
    const {snackbar, closeSnackbar} = useSnackbar()

    if (!snackbar.isActive) return null

    const getSnackbarIcon = (type) => {
        switch (type) {
            case SNACKBAR_TYPE.SUCCESS:
                return validIcon;
            case SNACKBAR_TYPE.ERROR:
                return closeIcon;
            default:
                return validIcon;
        }
    }

    const getSnackbarIconClassName = (type) => {
        switch (type) {
            case SNACKBAR_TYPE.SUCCESS:
                return "snackbar__icon snackbar__icon--success";
            case SNACKBAR_TYPE.ERROR:
                return "snackbar__icon snackbar__icon--error";
            default:
                return "snackbar__icon";
        }
    }

    return (
        <div id="snackbar">
            <img
                src={getSnackbarIcon(snackbar.type)}
                alt="valid icon"
                className={getSnackbarIconClassName(snackbar.type)}
            />

            <p>{snackbar.message}</p>

            <img
                src={closeIcon}
                alt="close icon"
                onClick={closeSnackbar}
                className="snackbar__close-icon"
            />

        </div>
    )
}