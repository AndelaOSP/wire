import React from 'react';
import { shallow, mount } from 'enzyme';
import shallowToJSON from 'enzyme-to-json';

import IncidentFilter from '../src/Components/IncidentFilter/IncidentFilter.Component';

describe('IncidentFilter component', () => {
  it('should have all the IncidentFilter content', () => {
    const incidentFilter = shallow(<IncidentFilter />);
    const tree = shallowToJSON(incidentFilter);
    expect(tree.props.className).toEqual('filters-container');
    expect(tree.type).toEqual('div');
  });
});
