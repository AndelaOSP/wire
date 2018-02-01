import React from 'react';
import shallowToJSON from 'enzyme-to-json';
import { shallow } from 'enzyme';
import { CustomMenu } from '../src/Components/CustomMenu/CustomMenu.Component';

describe('CustomMenu component', () => {
  it('Should have all the CustomMenu content', () => {
    const customMenu = shallow(<CustomMenu />);
    const tree = shallowToJSON(customMenu);
    expect(tree).toMatchSnapshot();
  });
});
