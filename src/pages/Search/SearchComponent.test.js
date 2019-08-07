import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import { SearchComponent, mapDispatchToProps, mapStateToProps } from './Search.Component';
import { testIncidents } from '../../../mock_endpoints/mockData';

describe('SearchComponent', () => {
  describe('Component rendering and methods', () => {
    let wrapper;
    let shallow;
    const props = {
      classes: {
        input: {},
        focused: {},
      },
      history: {
        push: jest.fn(),
      },
      incidents: testIncidents,
      searchIncidents: jest.fn(),
    };

    beforeEach(() => {
      shallow = createShallow();
      wrapper = shallow(<SearchComponent {...props} />);
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should should change the searchQuery state when handleInputChange is called', () => {
      wrapper.find('TextField').simulate('change', {
        target: { name: 'searchQuery', value: 'subject' },
      });

      expect(wrapper.instance().state.searchQuery).toEqual('subject');
    });

    it('should call the history push method when times button is clicked', () => {
      wrapper.find('.fa-times-circle').simulate('click', {
        preventDefault: jest.fn(),
      });

      expect(props.history.push).toHaveBeenCalled();
    });
  });

  describe('The mapStateToProps', () => {
    it('should return the expected props', () => {
      const state = {
        incidents: testIncidents,
      };
      const props = mapStateToProps(state);

      expect(props.incidents).toEqual(state.incidents);
    });
  });

  describe('The mapDispatchToProps', () => {
    it('should dispatch actions', () => {
      const dispatch = jest.fn(() => Promise.resolve());
      const props = mapDispatchToProps(dispatch);

      props.searchIncidents();
      expect(dispatch).toHaveBeenCalled();
    });
  });
});
