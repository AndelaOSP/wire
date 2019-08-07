import React from 'react';
import { shallow } from 'enzyme';
import Chat from './Chat.Component';
import { allChats } from '../../../mock_endpoints/mockData';

describe('Chat Component', () => {
  let wrapper;
  let wrapperinstance;
  const props = {
    chat: allChats[0],
    handleDateString: jest.fn(),
  }

  beforeEach(() => {
    wrapper = shallow(<Chat {...props} />);
    wrapperinstance = wrapper.instance();
  })

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })

  it('should call getClass function', () => {
    expect(wrapperinstance.getClass()).toEqual('--incoming');
  })
})
