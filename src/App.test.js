import React from "react";
import validIcon from "./shared/images/valid-snackbar-icon.png";
import closeIcon from "./shared/images/close-snackbar-icon.png";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import App from "./App";
import { mount } from "enzyme";
import {
  SNACKBAR_SUCCESS_TYPE,
  SNACKBAR_ERROR_TYPE,
} from "./shared/constants/variables";
import { BrowserRouter } from "react-router-dom";
import { CLOSE_SNACKBAR } from "./redux/actions";

const mockStore = configureStore([]);
const STORE = {
  watchedMovies: [],
  moviesToWatch: [],
  global: {
    snackbar: {
      isSnackbarActive: true,
      message: "Success message",
      type: SNACKBAR_SUCCESS_TYPE,
    },
  },
};

describe("App", () => {
  it("should hide snackbar when property 'isSnackbarActive' in state is equal to false", () => {
    // Given
    const store = mockStore({
      ...STORE,
      global: {
        snackbar: {
          isSnackbarActive: false,
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
    expect(component.find("#snackbar").length).toEqual(0);
  });

  it("should set a automatic closure of snackbar after 3 seconds when snack is displayed", () => {
    // Given
    const store = mockStore(STORE);
    jest.useFakeTimers();

    // When
    mount(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );

    // Then
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 3000);
  });

  it("should display success snackbar when property 'isSnackbarActive' in state is equal to true and type is equal to 'success'", () => {
    // Given
    const store = mockStore({
      ...STORE,
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
      ...STORE,
      global: {
        snackbar: {
          isSnackbarActive: true,
          message: "Error message",
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

  it("should close snack when user click on close button", () => {
    // Given
    const store = mockStore(STORE);

    // When
    const component = mount(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );

    component.find(".snackbar__close-icon").simulate("click");

    // Then
    const actionsCalled = store.getActions();
    const expectedActionCalled = [
      {
        type: CLOSE_SNACKBAR,
        payload: null,
      },
    ];
    expect(actionsCalled).toEqual(expect.arrayContaining(expectedActionCalled));
  });
});
