import React from 'react';
import { shallow } from 'enzyme';
import shallowToJSON from 'enzyme-to-json';
import moment from 'moment';
import TimelineChat from './TimelineChat.Component';
import { testIncidents, allChats } from '../../../mock_endpoints/mockData';

testIncidents[0].chats = allChats;

describe('Timeline Chat component', () => {
  const props = {
    getSlackchat: jest.fn(),
  };

  it('should have all the Timeline Chat content', () => {
    const timelineChat = shallow(
      <TimelineChat {...props} incident={testIncidents[0]} sendMessage={() => {}} />,
    );
    const tree = shallowToJSON(timelineChat);
    expect(shallowToJSON(tree)).toMatchSnapshot();
  });

  it('should handle post message', () => {
    const timelineChat = shallow(
      <TimelineChat {...props} incident={testIncidents[0]} sendMessage={() => {}} />,
    );
    timelineChat.instance().refs = {
      messageInput: {
        getValue: jest.fn(),
      },
    };
    timelineChat.setState({ message: 'hello' });
    expect(timelineChat.state().message).toEqual('hello');
    const form = timelineChat.find('InputBox');
    expect(form.length).toEqual(1);
    form.simulate('submit', { preventDefault: jest.fn() });
    expect(timelineChat.state().message).toEqual('');
  });

  it('should dispay all chats', () => {
    const timelineChat = shallow(
      <TimelineChat {...props} incident={testIncidents[0]} sendMessage={() => {}} />,
    );
    const chat = timelineChat.find('Chat');
    expect(chat.length).toEqual(4);
  });

  it('should handle change', () => {
    const timelineChat = shallow(
      <TimelineChat {...props} incident={testIncidents[0]} sendMessage={() => {}} />,
    );
    timelineChat.instance().refs = {
      messageInput: {
        getValue: jest.fn(),
      },
    };
    const textField = timelineChat.find('InputBox');
    expect(textField.length).toEqual(1);
    textField.simulate('change', { preventDefault: jest.fn(), target: { value: 'hello' } });
    expect(timelineChat.state().message).toEqual('hello');
  });

  it('should handle date formating', () => {
    const timelineChat = shallow(
      <TimelineChat {...props} incident={testIncidents[0]} sendMessage={() => {}} />,
    );
    const expectedTimeFormat = moment('2019-03-08 15:54:51.71+01').format('[at] h:mm a');

    expect(timelineChat.instance().handleDateString('2019-03-08 15:54:51.71+01'))
      .toEqual(expectedTimeFormat);
  });

  it('should test date grouping function', () => {
    const timelineChat = shallow(
      <TimelineChat {...props} incident={testIncidents[0]} sendMessage={() => {}} />,
    );
    
    expect(timelineChat.instance().groupedChatsDate(moment()))
      .toEqual('Today');
    expect(timelineChat.instance().groupedChatsDate(moment().subtract(1, 'days')))
      .toEqual('Yesterday');
  });
});
