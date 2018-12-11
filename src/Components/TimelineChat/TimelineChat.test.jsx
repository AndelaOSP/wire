import React from 'react';
import { shallow } from 'enzyme';
import shallowToJSON from 'enzyme-to-json';
import TimelineChat from './TimelineChat.Component';
import { testIncidents } from '../../../mock_endpoints/mockData';

testIncidents[0].chats = [{
  User: {
    username: 'user123',
  },
  chat: 'hello',
}];

describe('Timeline Chat component', () => {
  it('should have all the Timeline Chat content', () => {
    const timelineChat = shallow(
      <TimelineChat incident={testIncidents[0]} sendMessage={() => {}} />,
    );
    const tree = shallowToJSON(timelineChat);
    expect(shallowToJSON(tree)).toMatchSnapshot();
  });

  it('should handle post message', () => {
    const timelineChat = shallow(
      <TimelineChat incident={testIncidents[0]} sendMessage={() => {}} />,
    );
    timelineChat.instance().refs = {
      messageInput: {
        getValue: jest.fn(),
      },
    };
    timelineChat.setState({ message: 'hello' });
    expect(timelineChat.state().message).toEqual('hello');
    const form = timelineChat.find('form');
    expect(form.length).toEqual(1);
    form.simulate('submit', { preventDefault: jest.fn() });
    expect(timelineChat.state().message).toEqual('');
  });

  it('should handle change', () => {
    const timelineChat = shallow(
      <TimelineChat incident={testIncidents[0]} sendMessage={() => {}} />,
    );
    timelineChat.instance().refs = {
      messageInput: {
        getValue: jest.fn(),
      },
    };
    const textField = timelineChat.find('.text-input');
    expect(textField.length).toEqual(1);
    textField.simulate('change', { preventDefault: jest.fn(), target: { value: 'hello' } });
    expect(timelineChat.state().message).toEqual('hello');
  });
});
