import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16/build';
import App from './App';

configure({ adapter: new Adapter() });

describe('App component', () => {
  it('Should render App component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('div').length).toEqual(1);
    expect(wrapper.find('button').props().children).toContain('Bulma Button');
  });
});
