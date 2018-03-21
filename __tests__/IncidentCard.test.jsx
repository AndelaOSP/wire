import React from 'react';
import { shallow } from 'enzyme';
import shallowToJSON from 'enzyme-to-json';

import IncidentCard from '../src/Components/IncidentList/IncidentCard.Component';

describe('IncidentCard component', () => {
  it('should render incident card', () => {
    const incidentCard = shallow(
      <IncidentCard
        incidentId={1}
        incidentSubject="Stolen Phone"
        incidentReportDate="5th Jan 2018"
        incidentTime="4:41 PM"
        incidentReporter="Maureen Nyakio"
        incidentFlag="red"
      />
    );
    const tree = shallowToJSON(incidentCard);
    expect(tree.props.className).toEqual('incident-card');
    expect(tree.type).toEqual('div');
    expect(incidentCard.find('.incident-subject').text()).toEqual('Stolen Phone');
    expect(incidentCard.find('.incident-report-date').text()).toEqual('5th Jan 2018');
    expect(incidentCard.find('.incident-time').text()).toEqual('4:41 PM');
    expect(incidentCard.find('.assigned-to').text()).toEqual('Maureen Nyakio');
  });
});
