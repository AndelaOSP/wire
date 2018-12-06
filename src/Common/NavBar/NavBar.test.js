import React from 'react';
import { shallow } from 'enzyme';
import shallowToJSON from 'enzyme-to-json';
import { NavBar } from './NavBar.Component';
import authenticateUser from '../../helpers/auth';

jest.mock('../../helpers/auth');
authenticateUser.isAdmin = () => true;

const props = {
  notify: true,
  showSearch: true,
};

describe('Navbar component', () => {
  it('should have all the Navbar content', () => {
    const navbar = shallow(<NavBar {...props} history={{}} />);
    const tree = shallowToJSON(navbar);
    expect(tree.props.className).toEqual('navbar');
    expect(tree.props.role).toEqual('navigation');
    expect(tree.props['aria-label']).toEqual('main navigation');
    expect(tree.type).toEqual('nav');
  });

  it('should handle sign out', () => {
    const wrapper = shallow(<NavBar history={{}} />);
    const signOutSpan = wrapper.find('.dropdown-content #logout');
    expect(signOutSpan.length).toEqual(1);
    signOutSpan.simulate('click', { preventDefault: jest.fn() });
  });

  it('should handle search', () => {
    const wrapper = shallow(<NavBar {...props} history={{ push: () => {} }} />);
    const searchInput = wrapper.find('input.search-input');
    expect(searchInput.length).toEqual(1);
    const spy = jest.spyOn(wrapper.instance().props.history, 'push');
    searchInput.simulate('focus', { preventDefault: jest.fn() });
    expect(spy).toHaveBeenCalled();
  });
});
