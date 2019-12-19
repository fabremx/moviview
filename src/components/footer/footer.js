import React from "react";
import "./footer.scss";
import { NavLink } from "react-router-dom";
import homeIcon from "../../shared/images/home.png";
import homeIconSelected from "../../shared/images/home-selected.png";
import listIcon from "../../shared/images/list.png";
import listIconSelected from "../../shared/images/list-selected.png";
import {
  HOME_ROUTE,
  MOVIES_TO_WATCH_ROUTE
} from "../../shared/constants/routes";

class Footer extends React.Component {
  getFooterIcons() {
    const pathname = window.location.pathname;

    switch (pathname) {
      case HOME_ROUTE:
        return [homeIconSelected, listIcon];
      case MOVIES_TO_WATCH_ROUTE:
        return [homeIcon, listIconSelected];
      default:
        return [homeIcon, listIcon];
    }
  }

  render() {
    const icons = this.getFooterIcons();

    return (
      <div className="footer">
        <NavLink to={HOME_ROUTE}>
          <div className="footer__img-container">
            <img src={icons[0]} alt="home icon" />
          </div>
        </NavLink>

        <NavLink to={MOVIES_TO_WATCH_ROUTE}>
          <div className="footer__img-container">
            <img src={icons[1]} alt="home icon" />
          </div>
        </NavLink>
      </div>
    );
  }
}

export default Footer;
