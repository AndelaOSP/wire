import React from 'react';
import { shallow } from 'enzyme';
import shallowToJSON from 'enzyme-to-json';
import { PrivateRoute } from './PrivateRoute.Component';
import authenticateUser from '../../helpers/auth';
import { AdminDashboard } from '../../pages/AdminDashboard/AdminDashboard.Component';

jest.mock('../../helpers/auth');

authenticateUser.isAuthenticated = true;

describe('PrivateRoute Component', () => {
  it('should render without crashing', () => {
    const privateRoute = shallow(<PrivateRoute component={AdminDashboard} statusCode={200} location="Nigeria" />);
    const tree = shallowToJSON(privateRoute);
    expect(privateRoute.props().location).toEqual('Nigeria');
    expect(privateRoute.props().statusCode).toEqual(200);
    expect(tree).toMatchSnapshot();
  });
});
