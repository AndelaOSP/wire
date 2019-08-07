import * as React from 'react';
import { shallow } from 'enzyme';
import { AdminDashboard, mapStateToProps, mapDispatchToProps } from './AdminDashboard.Component';
import { users, roles, locations } from '../../../mock_endpoints/mockData';

describe('AdminDashboard component', () => {
  const props = {
    isLoading: false,
    isError: false,
    errorMessage: 'Oops! Something went wrong. Please try again.',
    fetchStaff: jest.fn(),
    fetchRoles: jest.fn(),
    fetchLocations: jest.fn(),
    inviteUser: jest.fn(),
    searchUsers: jest.fn(),
    updateUser: jest.fn(),
    removeUser: jest.fn(),
    staff: users,
    roles,
    locations,
    history: {},
  };

  describe('Component rendering and methods', () => {
    let wrapper;
    let wrapperInstance;

    beforeEach(() => {
      wrapper = shallow(<AdminDashboard {...props} />);
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
  
    it('should initiate updateUser action when handlePositionChange method is called', () => {
      wrapperInstance.handlePositionChange('Admin', 1, 1);
  
      expect(props.updateUser).toHaveBeenCalledWith(1, 3, 1);
    });
  
    it('should change the countryFilter state when changeCountryFilter method is called', () => {
      wrapperInstance.changeCountryFilter()('Kenya');
  
      expect(wrapperInstance.state.countryFilter).toEqual('Kenya');
    });
  
    it('should initiate removeUser action when handleRemove method is called', () => {
      wrapperInstance.handleRemove(1, 1);
  
      expect(props.removeUser).toHaveBeenCalledWith(1, 1);
    });
  
    it('should return filtered user when filterStaff method is called', () => {
      wrapper.setState({
        countryFilter: 'Nigeria',
      });
      const expectedFilteredUsers = [
        { 
          id: 1,
          email: 'me@example.com',
          username: 'Me Example',
          imageUrl: 'https://randomuser.me/api/portraits/med/women/83.jpg',
          roleId: 2,
          Role: { name: 'Assignee' },
          Location: { name: 'Cafeteria', centre: 'Lagos', country: 'Nigeria' },
        },
        { 
          id: 3,
          email: 'methree@example.com',
          username: 'Methree Ex',
          imageUrl: 'https://randomuser.me/api/portraits/med/women/83.jpg',
          roleId: 3,
          Role: { name: 'Admin' },
          Location: { name: 'Cafeteria', centre: 'Lagos', country: 'Nigeria' },
        },
        { 
          id: 4,
          email: 'another@guy.com',
          username: 'Another Guy',
          imageUrl: 'https://randomuser.me/api/portraits/med/men/83.jpg',
          roleId: 1,
          Role: { name: 'Admin' },
          Location: { name: 'Cafeteria', centre: 'Lagos', country: 'Nigeria' },
        },
        {
          id: 5,
          email: 'another@lady.com',
          username: 'Another Lady',
          imageUrl: 'https://randomuser.me/api/portraits/med/women/05.jpg',
          roleId: 1,
          Role: { name: 'Admin' },
          Location: { name: 'Cafeteria', centre: 'Lagos', country: 'Nigeria' },
        },
      ];
  
      expect(wrapperInstance.filterStaff()).toEqual(expectedFilteredUsers);
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
        roles,
        locations,
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

    it('should dispacth fetchStaff when it is called', () => {
      props.fetchStaff();
      expect(dispatch).toHaveBeenCalled();
    });

    it('should dispatch fetchRoles when it is called', () => {
      props.fetchRoles();
      expect(dispatch).toHaveBeenCalled();
    });

    it('should dispatch fetchLocations when it is called', () => {
      props.fetchLocations();
      expect(dispatch).toHaveBeenCalled();
    });
  });
});
