import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import IncidentCard from './IncidentCard.Component';

configure({ adapter: new Adapter() });

describe('Incident Card', () => {
  let wrapper;
  let props;
  beforeEach(() => {
    props = {
      incidentId: '1',
      incidentSubject: 'Harassment',
      incidentDescription: '',
      incidentReportDate: '',
      incidentTime: '',
      incidentFlag: 'Pending',
      assignees: [],
    };
    if (wrapper) wrapper.unmount();
  });
  it('should render all div elements', () => {
    wrapper = shallow(<IncidentCard {...props} />);
    expect(wrapper.find('div').length).toEqual(9);
  });

  it('should render assignee', () => {
    wrapper = shallow(<IncidentCard {...props} />);
    expect(wrapper.find('div').at(8).props().children).toContain('Unassigned');
  });
});
