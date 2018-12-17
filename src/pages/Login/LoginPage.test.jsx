
import React from 'react';
import { shallow } from 'enzyme';
import shallowToJSON from 'enzyme-to-json';
import { LoginPage } from './LoginPage.Component';
import authenticateUser from '../../helpers/auth';

jest.mock('../../helpers/auth');

authenticateUser.isAuthenticated = false;

const props = {
  location: {
    state: {
      from: {},
    },
  },
  isError: true,
  getToken: jest.fn(),
  hasToken: true,
};

describe('LoginPage component', () => {
  it('should render without crashing', () => {
    const loginPage = shallow(<LoginPage {...props} />);
    const raisedButton = loginPage.find('.button');

    expect(raisedButton.length).toEqual(1);
    expect(loginPage.instance().props.isError).toEqual(true);
    expect(loginPage.instance().props.hasToken).toEqual(true);
    expect(shallowToJSON(loginPage)).toMatchSnapshot();
  });
});
