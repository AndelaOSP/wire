import React from 'react';
import { shallow } from 'enzyme';
import UserFilter from './UserFilter.Component';
import { users } from '../../../mock_endpoints/mockData';

describe('UserFilter component', () => {
  let wrapper;
  let wrapperInstance;
  const props = {
    staff: users,
    handleSearch: jest.fn(),
    handleInvite: jest.fn(),
    changeCountryFilter: jest.fn(),
  };

  beforeEach(() => {
    wrapper = shallow(<UserFilter {...props} />);
    wrapperInstance = wrapper.instance();
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should change open state to true when the handleOpen method is called', () => {
    wrapperInstance.handleOpen();

    expect(wrapperInstance.state.open).toBeTruthy();
  });

  it('should change the open state to false when the handleClose method is called', () => {
    wrapper.setState({
      open: true,
    });
    wrapperInstance.handleClose();

    expect(wrapperInstance.state.open).toBeFalsy();
  });

  it('should initiate the changeCountryFilter action when the handleCountryChange method is called', () => {
    const event = {
      target: {
        value: 'Kenya',
      },
    };
    wrapperInstance.handleCountryChange(event);
    expect(wrapperInstance.state.countryFilter).toEqual('Kenya');
    expect(props.changeCountryFilter).toHaveBeenCalledWith('Kenya');
  });

  it('should initiate the handleSearch action when handleInputChange method is called', () => {
    wrapperInstance.handleInputChange({
      target: {
        value: 'Nigeria',
      },
    });
    expect(props.handleSearch).toHaveBeenCalledWith('Nigeria');
  });

  it('should initiate the handleInvite action when handleInvite method is called', () => {
    wrapperInstance.handleInvite('cosmas.billa@andela.com', 'developer', 'Nairobi');
    expect(props.handleInvite).toHaveBeenCalledWith('cosmas.billa@andela.com', 'developer', 'Nairobi');
  });
});
