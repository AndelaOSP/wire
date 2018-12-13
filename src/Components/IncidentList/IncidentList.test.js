import React from 'react';
import { shallow } from 'enzyme';

import IncidentList from './IncidentList.Component';

describe('IncidentList component', () => {
  it('should render incident sections', () => {
    const incidentList = shallow(<IncidentList incidents={[]} incidentsType={'All Incidents'}/>);
    expect(incidentList.find('IncidentSection').exists()).toEqual(true);
    // renders 3
    expect(incidentList.find('.all-incidents').children().length).toEqual(3);
  });
});
