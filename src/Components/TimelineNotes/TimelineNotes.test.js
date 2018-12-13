import React from 'react';
import { shallow } from 'enzyme';
import shallowToJSON from 'enzyme-to-json';

import TimelineNotes from './TimelineNotes.Component';
import { testIncidents } from '../../../mock_endpoints/mockData';

describe('Timeline Notes component', () => {
  let wrapper;
  let wrapperInstance;
  const props = {
    incident: testIncidents[0],
    addNote: jest.fn(),
    editNote: jest.fn(),
    archiveNote: jest.fn(),
  };

  beforeEach(() => {
    wrapper = shallow(<TimelineNotes {...props} />);
    wrapperInstance = wrapper.instance();
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should change showArchiveDialog state when handleOpenArchiveDialog method is called', () => {
    wrapperInstance.handleOpenArchiveDialog({ note: 'none' }, 1);

    expect(wrapperInstance.state.showArchiveDialog).toBeTruthy();
    expect(wrapperInstance.state.note).toEqual({ note: 'none' });
    expect(wrapperInstance.state.index).toEqual(1);
  });

  it('should change showArchiveDialog state when handleCloseArchiveDialog method is called', () => {
    wrapper.setState({
      note: {
        note: 'None',
      },
      index: 1,
      showArchiveDialog: true,
    });
    wrapperInstance.handleCloseArchiveDialog();

    expect(wrapperInstance.state.showArchiveDialog).toBeFalsy();
    expect(wrapperInstance.state.note).toEqual({});
    expect(wrapperInstance.state.index).toBeNull();
  });

  it('should change showEditDialog state when handleOpenEditDialog method is called', () => {
    wrapperInstance.handleOpenEditDialog({ note: 'none' }, 1);

    expect(wrapperInstance.state.showEditDialog).toBeTruthy();
    expect(wrapperInstance.state.note).toEqual({ note: 'none' });
    expect(wrapperInstance.state.index).toEqual(1);
  });

  it('should change showEditDialog state when handleOpenEditDialog method is called', () => {
    wrapper.setState({
      showEditDialog: true,
      note: {
        note: 'None',
      },
      index: 1,
    });
    wrapperInstance.handleCloseEditDialog();

    expect(wrapperInstance.state.showEditDialog).toBeFalsy();
    expect(wrapperInstance.state.note).toEqual({});
    expect(wrapperInstance.state.index).toBeNull();
  });

  it('should change showArchiveDialog state when handleArchiveNote method is called', () => {
    wrapper.setState({
      note: {
        id: '2',
        note: 'Note',
      },
      index: 2,
      showArchiveDialog: true,
    });
    wrapperInstance.handleArchiveNote({
      preventDefault: jest.fn(),
    });
    
    expect(props.archiveNote).toHaveBeenLastCalledWith('2', 2);
    expect(wrapperInstance.state.showArchiveDialog).toBeFalsy();
  });

  it('should change content state when handleChange method is called', () => {
    wrapperInstance.handleChange({
      preventDefault: jest.fn(),
      target: {
        value: 'Note',
      },
    });
    
    expect(wrapperInstance.state.content).toEqual('Note');
  });
  
  it('should initiate addNote action when handleAddNote method is called', () => {
    wrapper.setState({
      content: 'Some notes',
    });
    wrapperInstance.handleAddNote({
      preventDefault: jest.fn(),
    });

    expect(props.addNote).toHaveBeenLastCalledWith('Some notes', props.incident.id);
    expect(wrapperInstance.state.content).toEqual('');
  });

  it('should change the note state when handleEditNoteChange method is called', () => {
    wrapper.setState({
      note: {
        id: '1',
        note: 'important notes',
      },
    });
    wrapperInstance.handleEditNoteChange({
      preventDefault: jest.fn(),
      target: {
        value: 'Detailed notes',
      },
    });

    expect(wrapperInstance.state.note.note).toEqual('Detailed notes');
  });

  it('should initiate editNote action when handleEditNote method is called', () => {
    wrapper.setState({
      note: {
        id: '1',
        note: 'default notes',
      },
      showEditDialog: true,
      index: 1,
    });
    wrapperInstance.handleEditNote({
      preventDefault: jest.fn(),
    });

    expect(props.editNote).toHaveBeenCalledWith('default notes', '1', 1);
    expect(wrapperInstance.state.showEditDialog).toBeFalsy();
  });

  it('should return MM Do YYYY h:mm date format', () => {
    const dateStringFormat = wrapperInstance.handleDateString('2018-02-13T15:58:06.202Z');

    expect(dateStringFormat).toEqual('Feb 13th 2018 at 6:58 pm');
  });

  it('should display a list of ListItem when an incident has notes', () => {
    wrapper.setProps({
      incident: {
        ...props.incident,
        notes: [
          {
            id: '1',
            note: 'some dummy notes',
          },
        ],
      },
    });

    expect(wrapper.find('ListItem').length).toEqual(1);
  });
});
