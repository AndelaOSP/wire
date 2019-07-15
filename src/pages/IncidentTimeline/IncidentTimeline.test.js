import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import { testIncidents, users } from '../../../mock_endpoints/mockData';
import { IncidentTimeline, mapStateToProps, mapDispatchToProps } from './IncidentTimeline.Component';

describe('IncidentTimeline component', () => {
  const props = {
    loadIncidentDetails: jest.fn(),
    match: {
      params: {
        incidentId: '1',
      },
    },
    history: {},
    incident: testIncidents[1],
    fetchStaff: jest.fn(),
    addNote: jest.fn(),
    editNote: jest.fn(),
    archiveNote: jest.fn(),
    changeAssignee: jest.fn(),
    handleCC: jest.fn(),
    changeStatus: jest.fn(),
    sendMessage: jest.fn(),
    staff: users,
    isLoading: false,
    isError: false,
    errorMessage: 'Oops! Something went wrong. Please try again.',
  };

  describe('Component rendering and methods', () => {
    let wrapper;
    let wrapperInstance;

    beforeEach(() => {
      wrapper = shallow(<IncidentTimeline {...props} />);
      wrapperInstance = wrapper.instance();
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should handle todays date', () => {
      const today = new Date();
      const dateString = wrapperInstance.handleDateString(today);
      expect(dateString).toEqual('Today');
    });

    it('should handle yestadays date', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1)
      const dateString = wrapperInstance.handleDateString(yesterday);
      expect(dateString).toEqual('Yesterday');
    });

    it('should display circular progress indicator when isLoading is true', () => {
      wrapper.setProps({
        isLoading: true,
      });
      expect(wrapper.find('CircularProgressIndicator').length).toBe(1);
    });

    it('should return Green flag image when renderFlag method is called with Green parameter', () => {
      expect(wrapperInstance.renderFlag('Green').props.alt).toEqual('green');
    });
  
    it('should return yellow flag image when renderFlag method is called with yellow keyword parameter', () => {
      expect(wrapperInstance.renderFlag('yellow').props.alt).toEqual('yellow');
    });

    it('should return red flag image when renderFlag method is called with red keyword parameter', () => {
      expect(wrapperInstance.renderFlag('Red').props.alt).toEqual('red');
    });

    it('should change the redirect state when handleRedirect method is called', () => {
      wrapper.setState({
        redirect: false,
      });
      wrapperInstance.handleRedirect();

      expect(wrapperInstance.state.redirect).toBeTruthy();
    });
  });

  describe('The mapStateToProps', () => {
    it('should return the expected props', () => {
      const state = {
        isLoading: false,
        error: {
          status: false,
          message: 'Oops! Something went wrong. Please try again.',
        },
        staff: users,
        selectedIncident: testIncidents[1],
      };
      const props = mapStateToProps(state);
      expect(props.incident).toEqual(state.selectedIncident);
      expect(props.isError).toEqual(state.error.status);
    });
  });

  describe('The mapDispatchToProps', () => {
    it('should dispatch actions', () => {
      const dispatch = jest.fn(() => Promise.resolve());
      const props = mapDispatchToProps(dispatch);

      props.loadIncidentDetails();
      expect(dispatch).toHaveBeenCalled();
    });
  });
});
