import React from "react";
import validIcon from "./shared/images/valid-snackbar-icon.png";
import closeIcon from "./shared/images/close-snackbar-icon.png";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import App from "./App";
import { shallow, mount } from "enzyme";
import {
  SNACKBAR_SUCCESS_TYPE,
  SNACKBAR_ERROR_TYPE,
} from "./shared/constants/variables";
import { BrowserRouter } from "react-router-dom";

const mockStore = configureStore([]);

describe("App", () => {
  it("should hide snackbar when property 'isSnackbarActive' in state is equal to false", () => {
    // Given
    const store = mockStore({
      watchedMovies: [],
      moviesToWatch: [],

      global: {
        snackbar: {
          isSnackbarActive: false,
        },
      },
    });

    // When
    const component = shallow(
      <Provider store={store}>
        <App />
      </Provider>
    );

    // Then
    expect(component.find("#snackbar").length).toEqual(0);
  });

  it.skip("should set a automatic closure of snackbar after 3 seconds when snack is displayed", () => {});

  it("should display success snackbar when property 'isSnackbarActive' in state is equal to true and type is equal to 'success'", () => {
    // Given
    const store = mockStore({
      watchedMovies: [],
      moviesToWatch: [],
      global: {
        snackbar: {
          isSnackbarActive: true,
          message: "Success message",
          type: SNACKBAR_SUCCESS_TYPE,
        },
      },
    });

    // When
    const component = mount(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );

    // Then
    expect(component.find("#snackbar").length).toEqual(1);

    const snackbarSuccessIcon = component.find("img").at(0);
    expect(snackbarSuccessIcon.length).toEqual(1);
    expect(snackbarSuccessIcon.props().src).toEqual(validIcon);
    expect(snackbarSuccessIcon.props().className).toEqual(
      "snackbar__icon snackbar__icon--success"
    );
  });

  it("should display error snackbar when property 'isSnackbarActive' in state is equal to true and type is equal to 'error'", () => {
    // Given
    const store = mockStore({
      watchedMovies: [],
      moviesToWatch: [],
      global: {
        snackbar: {
          isSnackbarActive: true,
          message: "Success message",
          type: SNACKBAR_ERROR_TYPE,
        },
      },
    });

    // When
    const component = mount(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );

    // Then
    expect(component.find("#snackbar").length).toEqual(1);

    const snackbarSuccessIcon = component.find("img").at(0);
    expect(snackbarSuccessIcon.length).toEqual(1);
    expect(snackbarSuccessIcon.props().src).toEqual(closeIcon);
    expect(snackbarSuccessIcon.props().className).toEqual(
      "snackbar__icon snackbar__icon--error"
    );
  });

  it.skip("should close snack when user click on close button", () => {});
});
