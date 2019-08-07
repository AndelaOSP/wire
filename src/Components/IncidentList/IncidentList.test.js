import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';
import IncidentList from './IncidentList.Component';
import { incidents } from '../../../mock_endpoints/mockData';

configure({ adapter: new Adapter() });

describe('IncidentList component', () => {
  let wrapper;
  let props;
  beforeEach(() => {
    props = {
      incidents: [],
      incidentsType: 'All Incidents',
    };
    if (wrapper) wrapper.unmount();
  });
  it('should render incident sections', () => {
    wrapper = shallow(<IncidentList {...props} />);
    expect(wrapper.find('IncidentSection').exists()).toEqual(true);
    expect(wrapper.find('.all-incidents').children().length).toEqual(3);
  });
  it('should render all div elements', () => {
    wrapper = shallow(<IncidentList {...props} />);
    expect(wrapper.find('div').length).toEqual(4);
  });
  it('should handle getUnderlineColor', () => {
    wrapper = shallow(<IncidentList {...props} />);
    const spied = sinon.spy(wrapper.instance(), 'getUnderlineColor');
    wrapper.update();
    wrapper.instance().getUnderlineColor();
    expect(spied.calledOnce).toBeTruthy();
  });
  it('should render <IncidentType />', () => {
    wrapper = shallow(<IncidentList {...props} incidentsType="" />);
    expect(wrapper.find('IncidentType').length).toBe(1);
  });
  it('should handle sortIncidentsByType', () => {
    wrapper = shallow(<IncidentList {...props} />);
    const spied = sinon.spy(wrapper.instance(), 'sortIncidentsByType');
    wrapper.update();
    wrapper.instance().sortIncidentsByType();
    expect(spied.calledOnce).toBeTruthy();
  });
  it('should render incidents', () => {
    props = {
      incidents,
      incidentsType: 'All Incidents',
    };
    wrapper = shallow(<IncidentList {...props} />);
  })
});
