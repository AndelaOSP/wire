import React from 'react';
import { shallow } from 'enzyme';
import InputBox from './InputBox.Component';

describe('Input Box component', () => {
  let wrapper;
  let wrapperInstance;
  const props = {
    onSubmit: jest.fn(),
    value: "",
    onChange: jest.fn(),
    hintText: "",
    ref: ""
  }

  beforeEach(() => {
    wrapper = shallow(<InputBox {...props} />);
    wrapperInstance = wrapper.instance();
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the text field', () => {
    const textField = wrapper.find('TextField');
    expect(textField.length).toEqual(1);
  });
})
