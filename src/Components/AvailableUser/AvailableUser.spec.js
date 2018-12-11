import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AvailableUser from './AvailableUser.Component';

configure({ adapter: new Adapter() });

describe('should render <AvailableUser />', () => {
  let props;
  let wrapper;
  beforeEach(() => {
    props = {
      id: '',
      index: 2,
      imageUrl: '',
      username: '',
      role: '',
      country: '',
      handlePositionChange: jest.fn(),
      handleRemove: jest.fn(),

    };
    if (wrapper) wrapper.unmount();
  });
  it('should render all div elements', () => {
    wrapper = shallow(<AvailableUser {...props} />);
    expect(wrapper.find('div').length).toEqual(5);
  });
  it('should render with 8 props', () => {
    wrapper = shallow(<AvailableUser {...props} />);
    expect(Object.keys(wrapper.instance().props).length).toEqual(8);
  });
});
