import React from 'react';
import { shallow } from 'enzyme';
import shallowToJSON from 'enzyme-to-json';
import Modal from './Modal.Component';

const props = {
  handleInvite: jest.fn(),
  handleClose: jest.fn(),
  open: false,
};

describe('Modal component', () => {
  it('should render without crashing', () => {
    const modal = shallow(<Modal />);
    expect(shallowToJSON(modal)).toMatchSnapshot();
  });

  it('should handle form submit', () => {
    const modal = shallow(<Modal {...props} />);
    const form = modal.find('.modal-body');
    expect(form.length).toEqual(1);
    const spy = jest.spyOn(modal.instance().props, 'handleInvite');
    form.simulate('submit', { preventDefault: jest.fn() });
    expect(spy).toBeCalled();
  });

  it('should handle email change', () => {
    const modal = shallow(<Modal {...props} />);
    const emailInput = modal.find('#email-input');
    expect(modal.state().email).toEqual('');
    expect(emailInput.length).toEqual(1);
    emailInput.simulate('change', {
      preventDefault: jest.fn,
      target: { value: 'user@user.com', name: 'email' },
    });
    expect(modal.state().email).toEqual('user@user.com');
  });

  it('should handle location change', () => {
    const modal = shallow(<Modal {...props} />);
    const selectField = modal.find('#location-select-field');
    expect(selectField.length).toEqual(1);
    selectField.simulate('change');
    selectField.props().onChange({}, 1, 'Nigeria');
    expect(modal.state().location).toEqual('Nigeria');
  });

  it('should handle position change', () => {
    const modal = shallow(<Modal {...props} />);
    const positionField = modal.find('#position-select-field');
    expect(positionField.length).toEqual(1);
    positionField.simulate('change');
    positionField.props().onChange({}, 1, 'new position');
    expect(modal.state().position).toEqual('new position');
  });
});
