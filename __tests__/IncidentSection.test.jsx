import React from 'react';
import { shallow } from 'enzyme';

import IncidentSection from '../src/Components/IncidentList/IncidentSection.Component';
import { newTestIncidents } from '../mock_endpoints/mockData';

describe('IncidentCard component', () => {
  it('should render no cards when there are no incidents', () => {
    const incidentSection = shallow(<IncidentSection incidentStatus={'PENDING'} incidents={[]} />);
    expect(incidentSection.find('div .incident-status').text()).toEqual('PENDING');
    expect(incidentSection.find('div .card-wrapper > .no-incidents').text()).toEqual(' No incidents in PENDING');
    expect(incidentSection.find('IncidentCard').exists()).toEqual(false);
  });

  it('renders cards on appropriate section', () => {
    const incidentSection = shallow(
      <IncidentSection
        incidentStatus={'IN PROGRESS'}
        incidents={newTestIncidents}
      />
    );

    expect(incidentSection.find('div .incident-status').text()).toEqual('IN PROGRESS');
    expect(incidentSection.find('IncidentCard').exists()).toEqual(true);
    expect(incidentSection.find('IncidentCard').length).toBe(2);
  });
});
