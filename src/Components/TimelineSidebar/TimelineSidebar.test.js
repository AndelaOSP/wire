import React from 'react';
import { shallow } from 'enzyme';
import shallowToJSON from 'enzyme-to-json';

import TimelineSidebar from './TimelineSidebar.Component';
import { testIncidents } from '../../../mock_endpoints/mockData';

describe('Timeline Sidebar component', () => {
  it('should have all the Timeline Sidebar content', () => {
    const timelineSidebar = shallow(
      <TimelineSidebar
        staff={[]}
        incident={testIncidents[0]}
        handleCC={() => {}}
        changeAssignee={() => {}}
        changeStatus={() => {}}
      />
    );
    const tree = shallowToJSON(timelineSidebar);
    expect(tree.type).toEqual('div');
    expect(tree.props.className).toEqual('sidebar-container');
  });
});