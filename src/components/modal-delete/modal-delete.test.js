import React from "react";
import { mount, shallow } from "enzyme";
import configureStore from "redux-mock-store";
import ModalDelete from "./modal-delete";
import { RESET_ON_GOING_ACTION } from "../../redux/actions";

const PROPS = {
  show: true,
  onCloseModal: jest.fn(),
};

const mockStore = configureStore([]);

const STORE = mockStore({
  onGoingAction: {
    callback: jest.fn(),
    movieId: "movieId",
  },
});

describe("Modal Delete", () => {
  it("should not render the delete modal when the props show is equal to false", () => {
    // Given
    const props = {
      show: false,
    };

    // When
    const component = shallow(<ModalDelete {...props} store={STORE} />).dive();

    // Then
    expect(component.find(".modal-delete").length).toEqual(0);
  });

  it("should close delete modal when user click outise of the modal", () => {
    // When
    const component = shallow(<ModalDelete {...PROPS} store={STORE} />)
      .dive()
      .dive();
    component.find(".modal-delete").simulate("click");

    // Then
    const actionsCalled = STORE.getActions();
    const expectedActionCalled = [
      {
        type: RESET_ON_GOING_ACTION,
        payload: null,
      },
    ];

    expect(PROPS.onCloseModal).toHaveBeenCalled();
    expect(actionsCalled).toEqual(expect.arrayContaining(expectedActionCalled));
  });

  it("should close delete modal when user click on the close button", () => {
    // When
    const component = shallow(<ModalDelete {...PROPS} store={STORE} />)
      .dive()
      .dive();
    component.find(".close").simulate("click");

    // Then
    const actionsCalled = STORE.getActions();
    const expectedActionCalled = [
      {
        type: RESET_ON_GOING_ACTION,
        payload: null,
      },
    ];

    expect(PROPS.onCloseModal).toHaveBeenCalled();
    expect(actionsCalled).toEqual(expect.arrayContaining(expectedActionCalled));
  });

  it("should call the callback of the 'onGoing' state and close modal when user click on the delete button", () => {
    // When
    const component = mount(<ModalDelete {...PROPS} store={STORE} />);
    component.find(".button__delete").simulate("click");

    // Then
    const actionsCalled = STORE.getActions();
    const expectedActionCalled = [
      {
        type: RESET_ON_GOING_ACTION,
        payload: null,
      },
    ];

    const onGoingActionProps = component.children().props().onGoingAction;
    expect(onGoingActionProps.callback).toHaveBeenCalledWith(
      onGoingActionProps.movieId
    );
    expect(PROPS.onCloseModal).toHaveBeenCalled();
    expect(actionsCalled).toEqual(expect.arrayContaining(expectedActionCalled));
  });
});
