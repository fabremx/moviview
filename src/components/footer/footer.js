import React from "react";
import "./footer.scss";
import homeIcon from "../../shared/images/home-selected.png";
import eyeIcon from "../../shared/images/eye.png";
import listIcon from "../../shared/images/list.png";

class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
        <div className="footer__img-container">
          <img src={homeIcon} alt="home icon" />
        </div>

        <div className="footer__img-container">
          <img src={eyeIcon} alt="eye icon" />
        </div>

        <div className="footer__img-container">
          <img src={listIcon} alt="list icon" />
        </div>
      </div>
    );
  }
}

export default Footer;
