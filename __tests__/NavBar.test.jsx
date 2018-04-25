import React from 'react';
import { shallow } from 'enzyme';
import shallowToJSON from 'enzyme-to-json';

import { NavBar } from '../src/Common/NavBar/NavBar.Component';

describe('Navbar component', () => {
  it('should have all the Navbar content', () => {
    const navbar = shallow(<NavBar history={{}} />);
    const tree = shallowToJSON(navbar);
    expect(tree.props.className).toEqual('navbar');
    expect(tree.props.role).toEqual('navigation');
    expect(tree.props['aria-label']).toEqual('main navigation');
    expect(tree.type).toEqual('nav');
  });
});
