import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16/build';
import IncidentType from './IncidentType.Component';

configure({ adapter: new Adapter() });

describe('Incident Card', () => {
  let wrapper;
  let props;
  beforeEach(() => {
    props = {
      incidentStatus: '',
      underLineColor: '#fff',
      incidents: [],
    };
  });
  it('should render all div elements', () => {
    wrapper = shallow(<IncidentType {...props} />);
    expect(wrapper.find('div').length).toEqual(4);
  });
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
