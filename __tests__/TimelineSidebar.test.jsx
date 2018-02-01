import React from 'react';
import { shallow, mount } from 'enzyme';
import shallowToJSON from 'enzyme-to-json';

import TimelineSidebar from '../src/Components/TimelineSidebar/TimelineSidebar.Component';

describe('Timeline Sidebar component', () => {
  it('should have all the Timeline Sidebar content', () => {
    const timelineSidebar = shallow(<TimelineSidebar />);
    const tree = shallowToJSON(timelineSidebar);
    expect(tree.type).toEqual('div');
    expect(tree.props.className).toEqual('sidebar-container');
  });
});
