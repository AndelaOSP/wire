import React from 'react';
import { shallow } from 'enzyme';
import shallowToJSON from 'enzyme-to-json';

import IncidentSection from '../src/Components/IncidentList/IncidentSection.Component';

describe('IncidentCard component', () => {
  it('should render no cards when there are no incidents', () => {
    const incidentSection = shallow(<IncidentSection
      incidentStatus={'PENDING'}
      incidents={[]} 
    />);
    const tree = shallowToJSON(incidentSection);
    expect(incidentSection.find('div .incident-status').text()).toEqual('PENDING');
    expect(incidentSection.find('div .incident-count').text()).toEqual(0 + ' Incidents');
    expect(incidentSection.find('div .incident-cards > .no-incidents').text()).toEqual(' No Incidents PENDING');
    expect(incidentSection.find('IncidentCard').exists()).toEqual(false);
  });

  it('renders cards on appropriate section', () => {
    const incidentSection = shallow(<IncidentSection
      incidentStatus={'PENDING'}
      incidents={[{
        id: '12345667',
        incidentSubject: 'Stolen Phone',
        incidentReportDate: '5th Jan 2018',
        incidentTime: '4:41 PM',
        incidentHandler: 'Maureen Nyakio',
        incidentFlag: 'red',
      },{
        id: '12345678',
        incidentSubject: 'Stolen Phone',
        incidentReportDate: '5th Jan 2018',
        incidentTime: '4:41 PM',
        incidentHandler: 'Maureen Nyakio',
        incidentFlag: 'red',
      }]}
    />);
    const tree = shallowToJSON(incidentSection);
    expect(incidentSection.find('div .incident-status').text()).toEqual('PENDING');
    expect(incidentSection.find('.incident-count').text()).toEqual(2 + ' Incidents');
    expect(incidentSection.find('IncidentCard').exists()).toEqual(true);
    expect(tree.children.length).toEqual(2);
  });
});
