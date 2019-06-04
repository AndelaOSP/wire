import React from 'react';
import { shallow } from 'enzyme';
import TimelineSidebar from './TimelineSidebar.Component';
import { incidents, testIncidents, users } from '../../../mock_endpoints/mockData';

describe('Timeline Sidebar component', () => {
  let wrapper;
  let wrapperInstance;
  const props = {
    incident: testIncidents[0],
    changeStatus: jest.fn(),
    changeAssignee: jest.fn(),
    handleCC: jest.fn(),
    staff: users,
    addNote: jest.fn(),
  };

  beforeEach(() => {
    wrapper = shallow(<TimelineSidebar {...props} />);
    wrapperInstance = wrapper.instance();
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should update assignee when updateAssignee handler is called', () => {
    wrapper.setProps({
      incident: {
        ...props.incident,
        assignees: [
          {
            id: '-KhLsOxrKcKZC8i2n888',
            email: 'mercy.muchai@andela.com',
            username: 'Mercy Muchai',
            imageUrl: 'https://lh3.googleusercontent.com/-XxYl2Ryrfns/AAAAAAAAAAI/AAAAAAAAABg/QJRPuQnerrk/photo.jpg',
            createdAt: '2018-03-20T15:45:48.778Z',
            updatedAt: '2018-03-20T15:45:48.778Z',
            roleId: 2,
            assigneeIncidents: {
              assignedRole: 'assignee',
            },
          },
        ],
      },
    });
    wrapperInstance.updateAssignee(props);
    
    expect(wrapperInstance.state.assignee).toBeDefined();
  });

  it('should change the reportDialogOpen and resolveValue states when handleStatusChange is called 3 as the value parameter', () => {
    wrapperInstance.handleStatusChange({ preventDefault: jest.fn() }, 1, 3);
    expect(wrapperInstance.state.reportDialogOpen).toBeTruthy();
    expect(wrapperInstance.state.resolveValue).toEqual(3);
  });

  it('should handle date string', () => {
    // it might fail locally since it only works with GMT timezone
    const dateString = wrapperInstance.handleDateString(new Date('2019-06-06T13:00:38.335Z'));
    expect(dateString).toEqual('Jun 6th 2019 at 1:00 pm');
  });

  it('should initiate the changeStatus action when the value parameter passed to handleStatusChange is not 3', () => {
    wrapperInstance.handleStatusChange({ preventDefault: jest.fn() }, 1, 4);
    expect(props.changeStatus).toHaveBeenCalled();
  });

  it('should change the reportText state when the handleReportTextChange method is called', () => {
    wrapperInstance.handleReportTextChange({
      preventDefault: jest.fn(),
      target: {
        value: 'some texts',
      },
    });

    expect(wrapperInstance.state.reportText).toEqual('some texts');
  });

  it('should resolve an incident when the handleResolveIncident method is calles', () => {
    wrapper.setState({
      resolveValue: 1,
    });
    wrapperInstance.handleResolveIncident({
      preventDefault: jest.fn(),
    });

    expect(props.changeStatus).toHaveBeenCalled();
  });

  it('should set the reportDialogOpen and resolveValue state when handleCloseReportDialog method is called', () => {
    wrapper.setState({
      reportDialogOpen: true,
      resolveValue: 1,
    });
    wrapperInstance.handleCloseReportDialog({
      preventDefault: jest.fn(),
    });

    expect(wrapperInstance.state.reportDialogOpen).toBeFalsy();
    expect(wrapperInstance.state.resolveValue).toEqual(0);
  });

  it('should initiate the changeAssignee action when handleChangeAssignee method is called', () => {
    const event = {
      target: {
        value: '1',
      },
      preventDefault: jest.fn(),
    };

    wrapperInstance.handleChangeAssignee(event, 1, 'cosmas');
    expect(props.changeAssignee).toHaveBeenCalled();
  });

  it('should set the selectedValues state when handleSelectCCd is called', () => {
    const event = {
      target: {
        value: ['1', '2', '3'],
      },
    };

    wrapperInstance.handleSelectCCd(event, 1, '01');
    expect(wrapperInstance.state.selectedValues).toEqual(['1', '2', '3']);
  });

  it('should initiate the handleCC action when onSelectClose method is called', () => {
    const value = ['1', '2', '3'];
    wrapperInstance.onSelectClose(value);
    expect(props.handleCC).toHaveBeenCalled();
  });

  it('should display witnesses', () => {
    wrapper.setProps({
      incident: {
        ...props.incident,
        witnesses: incidents[0].witnesses,
      },
    });

    expect(wrapper.find('.witness-image').length).toEqual(2);
  });

  it('should not display staff if staff props is null', () => {
    wrapper.setProps({
      incident: {
        ...props.incident,
        assignee: [],
        staff: [],
      },
    });

    expect(wrapper.find('WithStyles(MenuItem)').at(3).length).toEqual(1);
  });
});
