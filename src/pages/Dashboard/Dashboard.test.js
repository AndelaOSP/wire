import React from 'react';
import { shallow } from 'enzyme';
import { testIncidents } from '../../../mock_endpoints/mockData';
import { Dashboard, mapStateToProps, mapDispatchToProps } from './Dashboard.Component';
import { LocalStorageMock } from '../../testHelpers';

global.localStorage = new LocalStorageMock();

describe('Dashboard component', () => {
  describe('Component rendering and methods', () => {
    let wrapper;
    let wrapperInstance;
    const props = {
      incidents: testIncidents,
      loadIncidents: jest.fn(),
      location: {},
      isLoading: false,
      isError: false,
      errorMessage: 'Oops! Something went wrong. Please try again.',
      history: {},
    };

    beforeEach(() => {
      wrapper = shallow(<Dashboard {...props} />);
      wrapperInstance = wrapper.instance();
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should display circular progress indicator when isLoading is true', () => {
      wrapper.setProps({
        isLoading: true,
      });
      expect(wrapper.find('CircularProgressIndicator').length).toBe(1);
    });

    it('should change the filterKey state when the changeFilter method is called', () => {
      wrapperInstance.changeFilter()('Kenya');

      expect(wrapperInstance.state.filterKey).toEqual('Kenya');
    });

    it('should change the flagFilterKey state when the changeFlagFilter is called', () => {
      wrapperInstance.changeFlagFilter()('Yellow');

      expect(wrapperInstance.state.flagFilterKey).toEqual('Yellow');
    });

    it('should reset the typeFilter state when changeTypeFilter method is called', () => {
      wrapperInstance.changeTypeFilter()('All Incidents');

      expect(wrapperInstance.state.typeFilter).toEqual('All Incidents');
    });

    it('should reset the timeFilter state when changeTimeFilter method is called', () => {
      wrapperInstance.changeTimeFilter()('Month');

      expect(wrapperInstance.state.timeFilter).toEqual('Month');
    });

    it('should change assignedToMe state when changeAssignedToMeFilter method is called', () => {
      wrapperInstance.changeAssignedToMeFilter()(true);

      expect(wrapperInstance.state.assignedToMe).toBeTruthy();
    });

    it('should filter incidents by countries', () => {
      wrapper.setState({
        filterKey: 'Nigeria',
        typeFilter: 'All Incidents',
      });
      
      expect(wrapperInstance.filterIncidents()).toEqual([testIncidents[1]]);
    });

    it('should filter incidents by day', () => {
      const date = wrapperInstance.getDate(new Date());
      const newIncident = [
        {
          ...testIncidents[0],
          dateOccurred: date,
        },
      ];
      wrapper.setState({
        timeFilter: 'Day',
        typeFilter: 'All Incidents',
      });
      wrapper.setProps({
        incidents: newIncident,
      });

      expect(wrapperInstance.filterIncidents()).toEqual(newIncident);
    });

    it('should filter incidents by week', () => {
      const date = wrapperInstance.getDate(new Date());
      const newIncident = [
        {
          ...testIncidents[0],
          dateOccurred: date,
        },
      ];
      wrapper.setState({
        timeFilter: 'Week',
        typeFilter: 'All Incidents',
      });
      wrapper.setProps({
        incidents: newIncident,
      });

      expect(wrapperInstance.filterIncidents()).toEqual(newIncident);
    });

    it('should filter incidents by month', () => {
      const date = wrapperInstance.getDate(new Date());
      const newIncident = [
        {
          ...testIncidents[0],
          dateOccurred: date,
        },
      ];
      wrapper.setState({
        timeFilter: 'Month',
        typeFilter: 'All Incidents',
      });
      wrapper.setProps({
        incidents: newIncident,
      });

      expect(wrapperInstance.filterIncidents()).toEqual(newIncident);
    });
    it('should filter incidents by assignedToMe', () => {
      localStorage.setItem('email', 'caroline.nkirote@andela.com');
      wrapper.setState({
        filterKey: 'All Countries',
        typeFilter: 'All Incidents',
        assignedToMe: true,
      });
    
      expect(wrapperInstance.filterIncidents()).toEqual(testIncidents);
    });

    it('should filter incidents by incidents flag', () => {
      wrapper.setState({
        flagFilterKey: 'Yellow',
        typeFilter: 'All Incidents',
      });
      
      expect(wrapperInstance.filterIncidents()).toEqual([testIncidents[1]]);
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
        incidents: testIncidents,
      };
      const props = mapStateToProps(state);

      expect(props.isLoading).toEqual(state.isLoading);
      expect(props.isError).toEqual(state.error.status);
    });
  });

  describe('The mapDispatchToProps', () => {
    let dispatch;
    let props;

    beforeEach(() => {
      dispatch = jest.fn(() => Promise.resolve());
      props = mapDispatchToProps(dispatch);
    });

    it('should dispatch actions', () => {
      props.loadIncidents();
      expect(dispatch).toHaveBeenCalled();
    });
  });
});
