import React from 'react';
import sinon from 'sinon';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AvailableUser from './AvailableUser.Component';

configure({ adapter: new Adapter() });

describe('should render <AvailableUser />', () => {
  let props;
  let wrapper;
  const handleRemove = sinon.spy();
  const handlePositionChange = sinon.spy();
  beforeEach(() => {
    global.alert = jest.fn();
    props = {
      id: '',
      index: 2,
      imageUrl: '',
      username: '',
      role: '',
      country: '',
      handlePositionChange,
      handleRemove,
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
  it('should render SelectField', () => {
    wrapper = shallow(<AvailableUser {...props} />);
    expect(wrapper.find('SelectField').length).toEqual(1);
  });
  it('should render MenuItems', () => {
    wrapper = shallow(<AvailableUser {...props} />);
    expect(wrapper.find('MenuItem').length).toEqual(2);
  });
  it('should renders handleRemove', () => {
    wrapper = shallow(<AvailableUser {...props} prepareStyles="" />);
    wrapper.find('div').at(4).simulate('click');
    expect(handleRemove.called).toEqual(true);
  });
  it('should renders handlePositionChange', () => {
    wrapper = shallow(<AvailableUser {...props} prepareStyles="" />);
    const event = { target: { name: 'position ', value: 'new position' } };
    wrapper.find('SelectField').simulate('change', event);
    expect(handlePositionChange.called).toEqual(true);
  });
});
