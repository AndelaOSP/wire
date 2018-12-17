import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16/build';
import IncidentCard from './IncidentCard.Component';

configure({ adapter: new Adapter() });

describe('Incident Card', () => {
  let wrapper;
  let props;
  const renderFlag = sinon.spy();
  beforeEach(() => {
    props = {
      incidentId: '',
      incidentSubject: '',
      incidentDescription: '',
      incidentReportDate: '',
      incidentTime: '',
      incidentFlag: '',
      assignees: [],
    };
  });
  it('should render all div elements', () => {
    wrapper = shallow(<IncidentCard {...props} />);
    expect(wrapper.find('div').length).toEqual(9);
  });
  it('should render renderFlag', () => {
    wrapper = shallow(<IncidentCard {...props} />);
    const spied = sinon.spy(wrapper.instance(), 'renderFlag');
    wrapper.update();
    wrapper.instance().renderFlag();
    expect(spied.calledOnce).toBeTruthy();
  });
});
