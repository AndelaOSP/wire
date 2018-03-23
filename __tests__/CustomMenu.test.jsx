import React from 'react';
import shallowToJSON from 'enzyme-to-json';
import { shallow } from 'enzyme';
import CustomMenu from '../src/Components/CustomMenu/CustomMenu.Component';
import SelectField from 'material-ui/SelectField';

describe('CustomMenu component', () => {
  it('Should have all the CustomMenu content', () => {
    const customMenu = shallow(<CustomMenu />);
    const tree = shallowToJSON(customMenu);
    expect(tree).toMatchSnapshot();
  });

  it('Should change state when filter value changes', () => {
    const changeCountryFilterMock = jest.fn()
    const menu = shallow(<CustomMenu changeCountryFilter={changeCountryFilterMock}/>)
    const select = menu.find(SelectField);
    select.props().onChange()
    menu.setState({value: 'Kenya'})
    menu.update()
    expect(menu.instance().state.value).toEqual('Kenya');
    expect(changeCountryFilterMock.mock.calls.length).toBe(1);
  });
});
