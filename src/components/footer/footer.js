import React from "react";
import "./footer.scss";
import {NavLink} from "react-router-dom";
import homeIcon from "../../shared/images/home.png";
import homeIconSelected from "../../shared/images/home-selected.png";
import listIcon from "../../shared/images/list.png";
import listIconSelected from "../../shared/images/list-selected.png";
import {ROUTES,} from "../../shared/constants/routes";

export const Footer = () => {
    const icons = getFooterIcons()

    function getFooterIcons() {
        const pathname = window.location.pathname;

        switch (pathname) {
            case ROUTES.WATCHED_MEDIA:
                return [homeIcon, listIconSelected];
            case ROUTES.MEDIA_TO_WATCH:
                return [homeIconSelected, listIcon];
            default:
                return [homeIcon, listIcon];
        }
    }

    return (
        <div className="footer">
            <NavLink to={ROUTES.MEDIA_TO_WATCH}>
                <div className="footer__img-container">
                    <img src={icons[0]} alt="home icon"/>
                </div>
            </NavLink>

            <NavLink to={ROUTES.WATCHED_MEDIA}>
                <div className="footer__img-container">
                    <img src={icons[1]} alt="home icon"/>
                </div>
            </NavLink>
        </div>
    )
}