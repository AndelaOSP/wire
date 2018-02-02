import React from 'react';
import { shallow, mount } from 'enzyme';
import shallowToJSON from 'enzyme-to-json';

import CustomNotification from '../src/Components/CustomNotification/CustomNotification.Component';

describe('Custom Notification component', () => {
  it('should display a success notification with the message passed', () => {
    const notification = shallow(<CustomNotification type="success" open message="A test success notification" />);
    const tree = shallowToJSON(notification);
    expect(tree.props.message).toEqual('A test success notification');
    expect(tree.props.open).toEqual(true);
    expect(tree.props.type).toEqual('success');
    expect(tree.props.className).toEqual('snackbar');
    expect(tree.props.autoHideDuration).toEqual(3000);
  });
  it('should display an error notification with the message passed', () => {
    const notification = shallow(<CustomNotification type="error" open message="A test error notification" />);
    const tree = shallowToJSON(notification);
    expect(tree.props.message).toEqual('A test error notification');
    expect(tree.props.open).toEqual(true);
    expect(tree.props.type).toEqual('error');
    expect(tree.props.className).toEqual('snackbar');
    expect(tree.props.autoHideDuration).toEqual(3000);
  });
});
