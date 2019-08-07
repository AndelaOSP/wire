import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16/build';
import IncidentType from './IncidentType.Component';
import { wrap } from 'module';
import { testIncidents } from '../../../mock_endpoints/mockData';

configure({ adapter: new Adapter() });

describe('Incident Card', () => {
  let wrapper;
  let props;
  beforeEach(() => {
    props = {
      incidentStatus: '',
      underLineColor: '#fff',
      incidents: testIncidents,
    };
  });

  it('should match snapshot', () => {
    wrapper = shallow(<IncidentType {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should render all div elements', () => {
    wrapper = shallow(<IncidentType {...props} />);
    expect(wrapper.find('div').length).toEqual(4);
  });
  it('should render Incident Card', () => {
    wrapper = shallow(<IncidentType {...props} />)
    let incidentCard = wrapper.find('IncidentCard');
    expect(incidentCard.length).toEqual(2);
  })
  it('should handle getTime', () => {
    wrapper = shallow(<IncidentType {...props} />);
    const spied = sinon.spy(wrapper.instance(), 'getTime');
    wrapper.update();
    wrapper.instance().getTime();
    expect(spied.calledOnce).toBeTruthy();
  });
  it('should handle getDate', () => {
    wrapper = shallow(<IncidentType {...props} />);
    const spied = sinon.spy(wrapper.instance(), 'getDate');
    wrapper.update();
    wrapper.instance().getDate();
    expect(spied.calledOnce).toBeTruthy();
  });
});
