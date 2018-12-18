import React from 'react';
import { shallow } from 'enzyme';
import shallowToJSON from 'enzyme-to-json';
import RequireAdmin from './RequireAdmin.Component';
import authenticateUser from '../../helpers/auth';
import { AdminDashboard } from '../../pages/AdminDashboard/AdminDashboard.Component';

jest.mock('../../helpers/auth');

authenticateUser.isAdmin = () => true;
authenticateUser.isAuthenticated = () => true;

describe('RequireAdmin Component', () => {
  it('should render without crashing', () => {
    const requireAdmin = shallow(React.createElement(RequireAdmin(AdminDashboard)));
    const tree = shallowToJSON(requireAdmin);
    expect(tree).toMatchSnapshot();
  });
});
