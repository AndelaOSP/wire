import React from 'react';
import { shallow } from 'enzyme';
import shallowToJSON from 'enzyme-to-json';

import TimelineChat from './TimelineChat.Component';
import { testIncidents } from '../../../mock_endpoints/mockData';

describe('Timeline Chat component', () => {
  it('should have all the Timeline Chat content', () => {
    const timelineChat = shallow(
      <TimelineChat incident={testIncidents[0]} sendMessage={() => {}} />,
    );
    const tree = shallowToJSON(timelineChat);
    expect(tree.type).toEqual('div');
    expect(tree.props.className).toEqual('chat-container');
  });
});
