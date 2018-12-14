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
});
