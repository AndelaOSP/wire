import React from 'react';
import { shallow, mount } from 'enzyme';
import shallowToJSON from 'enzyme-to-json';

import TimelineChat from '../src/Components/TimelineChat/TimelineChat.Component';

describe('Timeline Chat component', () => {
  it('should have all the Timeline Chat content', () => {
    const timelineChat = shallow(<TimelineChat />);
    const tree = shallowToJSON(timelineChat);
    expect(tree.type).toEqual('div');
    expect(tree.props.className).toEqual('chat-container');
  });
});
