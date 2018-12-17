import React from 'react';
import { configure, shallow } from 'enzyme';
import shallowToJSON from 'enzyme-to-json';
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16/build';
import IncidentFilter from './IncidentFilter.Component';

configure({ adapter: new Adapter() });

describe('IncidentFilter component', () => {
  let wrapper;
  it('should have all the IncidentFilter content', () => {
    const incidentFilter = shallow(<IncidentFilter />);
    const tree = shallowToJSON(incidentFilter);
    expect(tree.props.className).toEqual('filters-container');
    expect(tree.type).toEqual('div');
  });
  it('should render all div elements', () => {
    wrapper = shallow(<IncidentFilter />);
    expect(wrapper.find('div').length).toEqual(4);
  });
  it('should render SelectField', () => {
    wrapper = shallow(<IncidentFilter />);
    expect(wrapper.find('SelectField').length).toEqual(2);
  });
  it('should render MenuItem', () => {
    wrapper = shallow(<IncidentFilter />);
    expect(wrapper.find('MenuItem').length).toEqual(8);
  });
  it('should handle flag change', () => {
    wrapper = shallow(<IncidentFilter />);
    const value = '';
    const spied = sinon.spy(wrapper.instance(), 'handleFlagChange');
    wrapper.update();
    wrapper.setState({ flagFilterValue: value });
    wrapper.instance().handleFlagChange();
    expect(spied.calledOnce).toBeTruthy();
  });
  it('should handle type change', () => {
    wrapper = shallow(<IncidentFilter />);
    const value = '';
    const spied = sinon.spy(wrapper.instance(), 'handleTypeChange');
    wrapper.update();
    wrapper.setState({ flagFilterType: value });
    wrapper.instance().handleTypeChange();
    expect(spied.calledOnce).toBeTruthy();
  });
  it('should handle time change', () => {
    wrapper = shallow(<IncidentFilter />);
    const spied = sinon.spy(wrapper.instance(), 'handleTimeChange');
    wrapper.instance().handleTimeChange();
    expect(spied.calledOnce).toBeTruthy();
  });
  it('should handle mine all change', () => {
    wrapper = shallow(<IncidentFilter />);
    const value = '';
    const spied = sinon.spy(wrapper.instance(), 'handleMineAllChange');
    wrapper.update();
    wrapper.setState({ assignedToMe: value });
    wrapper.instance().handleMineAllChange();
    expect(spied.calledOnce).toBeTruthy();
  });
  it('should render Toggle', () => {
    wrapper = shallow(<IncidentFilter />);
    expect(wrapper.find('Toggle').length).toEqual(1);
  });
  it('should handle onToggle', () => {
    wrapper = shallow(<IncidentFilter />);
    const spied = sinon.spy(wrapper.instance(), 'handleMineAllChange');
    const event = { target: { name: 'position ', value: 'new position' } };
    wrapper.find('Toggle').simulate('toggle', event);
    expect(spied.called).toEqual(true);
  });
  it('should render Button', () => {
    wrapper = shallow(<IncidentFilter />);
    expect(wrapper.find('button').length).toEqual(4);
  });
  it('should handle onClick for button', () => {
    wrapper = shallow(<IncidentFilter />);
    const spied = sinon.spy(wrapper.instance(), 'handleTimeChange');
    const event = { target: { name: 'Day ', value: 'Monday' } };
    wrapper.find('button').at(0).simulate('click', event);
    wrapper.find('button').at(1).simulate('click', event);
    wrapper.find('button').at(2).simulate('click', event);
    wrapper.find('button').at(3).simulate('click', event);
    expect(spied.called).toEqual(true);
  });
});
