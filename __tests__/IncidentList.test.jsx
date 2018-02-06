import React from 'react';
import { shallow, mount } from 'enzyme';
import shallowToJSON from 'enzyme-to-json';

import IncidentList from '../src/Components/IncidentList/IncidentList.Component';

describe('IncidentList component', () => {
  it('should render incident sections', () => {
    const incidentList = mount(<IncidentList />);
    const tree = shallowToJSON(incidentList);
    expect(incidentList.find('IncidentSection').exists()).toEqual(true);
    // renders 3
    expect(incidentList.find('.all-incidents').children().length).toEqual(3);
  });
});
