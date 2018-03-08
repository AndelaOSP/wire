import React from 'react';
import { shallow } from 'enzyme';
import shallowToJSON from 'enzyme-to-json';

import TimelineNotes from '../src/Components/TimelineNotes/TimelineNotes.Component';
import { testIncident } from '../mock_endpoints/mockData';

describe('Timeline Notes component', () => {
  it('should have all the Timeline Notes content', () => {
    const timelineNotes = shallow(
      <TimelineNotes
        incident={testIncident}
        addNote={() => {}}
        editNote={() => {}}
        archiveNote={() => {}}
        loadIncidentDetails={() => {}}
      />
    );
    const tree = shallowToJSON(timelineNotes);
    expect(tree.type).toEqual('div');
    expect(tree.props.className).toEqual('notes-container');
  });
});
