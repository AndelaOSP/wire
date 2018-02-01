import React from 'react';
import { shallow, mount } from 'enzyme';
import shallowToJSON from 'enzyme-to-json';

import TimelineNotes from '../src/Components/TimelineNotes/TimelineNotes.Component';

describe('Timeline Notes component', () => {
  it('should have all the Timeline Notes content', () => {
    const timelineNotes = shallow(<TimelineNotes />);
    const tree = shallowToJSON(timelineNotes);
    expect(tree.type).toEqual('div');
    expect(tree.props.className).toEqual('notes-container');
  });
});
