import React from "react";
import homeIcon from "../../shared/images/home.png";
import homeIconSelected from "../../shared/images/home-selected.png";
import listIcon from "../../shared/images/list.png";
import listIconSelected from "../../shared/images/list-selected.png";
import Footer from "./footer";
import { shallow } from "enzyme";

describe("Footer", () => {
  beforeEach(() => {
    delete global.window.location;
    global.window = Object.create(window);
  });

  it("should select the first footer icon when url is equal to '/'", () => {
    // Given
    global.window.location = {
      pathname: "/",
    };

    // When
    const component = shallow(<Footer />);

    // Then
    const firstFooterIcon = component
      .find(".footer__img-container")
      .at(0)
      .children();
    const secondFooterIcon = component
      .find(".footer__img-container")
      .at(1)
      .children();

    expect(firstFooterIcon.props().src).toEqual(homeIconSelected);
    expect(secondFooterIcon.props().src).toEqual(listIcon);
  });

  it("should select the second footer icon when url is equal to '/movies-to-watch'", () => {
    // Given
    global.window.location = {
      pathname: "/movies-to-watch",
    };

    // When
    const component = shallow(<Footer />);

    // Then
    const firstFooterIcon = component
      .find(".footer__img-container")
      .at(0)
      .children();
    const secondFooterIcon = component
      .find(".footer__img-container")
      .at(1)
      .children();

    expect(firstFooterIcon.props().src).toEqual(homeIcon);
    expect(secondFooterIcon.props().src).toEqual(listIconSelected);
  });

  it("should select neither of the two footer icons when pathname is different than '/' or '/movies-to-watch'", () => {
    // Given
    global.window.location = {
      pathname: "/somethingElse",
    };

    // When
    const component = shallow(<Footer />);

    // Then
    const firstFooterIcon = component
      .find(".footer__img-container")
      .at(0)
      .children();
    const secondFooterIcon = component
      .find(".footer__img-container")
      .at(1)
      .children();

    expect(firstFooterIcon.props().src).toEqual(homeIcon);
    expect(secondFooterIcon.props().src).toEqual(listIcon);
  });
});
