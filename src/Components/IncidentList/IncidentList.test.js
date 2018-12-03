import React from 'react';
import { mount } from 'enzyme';

import IncidentList from './IncidentList.Component';

describe('IncidentList component', () => {
  it('should render incident sections', () => {
    const incidentList = mount(<IncidentList incidents={[]} incidentsType={'All Incidents'}/>);
    expect(incidentList.find('IncidentSection').exists()).toEqual(true);
    // renders 3
    expect(incidentList.find('.all-incidents').children().length).toEqual(3);
  });
});
