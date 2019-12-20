import React from "react";
import "./button.scss";

class Button extends React.Component {
  render() {
    return (
      <div className="button">
        <img src={this.props.src} alt="button icon" />
        <span className="button__label">{this.props.label}</span>
      </div>
    );
  }
}

export default Button;
