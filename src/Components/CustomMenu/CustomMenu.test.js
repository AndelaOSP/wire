import React from 'react';
import shallowToJSON from 'enzyme-to-json';
import { shallow } from 'enzyme';
import Select from '@material-ui/core/Select';
import CustomMenu from './CustomMenu.Component';

describe('CustomMenu component', () => {
  it('Should have all the CustomMenu content', () => {
    const customMenu = shallow(<CustomMenu />);
    const tree = shallowToJSON(customMenu);
    expect(tree).toMatchSnapshot();
  });

  it('Should change state when filter value changes', () => {
    const changeCountryFilterMock = jest.fn();
    const event = { target: { value: '' } };
    const menu = shallow(<CustomMenu changeCountryFilter={changeCountryFilterMock} />);
    const select = menu.find(Select);
    select.props().onChange(event);
    expect(changeCountryFilterMock.mock.calls.length).toBe(1);
  });
});
