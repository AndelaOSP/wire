
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
  let loginPage;
  let instance;

  beforeEach(() => {
    loginPage = shallow(<LoginPage {...props} />);
    instance = loginPage.instance();
  });

  it('should render without crashing', () => {
    
    const raisedButton = loginPage.find('.button');

    expect(raisedButton.length).toEqual(1);
    expect(instance.props.isError).toEqual(true);
    expect(instance.props.hasToken).toEqual(true);
    expect(shallowToJSON(loginPage)).toMatchSnapshot();
  });

  it('should not login when token is null', () => {    
    loginPage.setProps({
      hasToken: false,
    });
    const textToFind = 'Welcome to Wire Please sign in with your Google account to proceed';
    expect(loginPage.find('.welcome-text').text()).toEqual(textToFind);
  });
});
