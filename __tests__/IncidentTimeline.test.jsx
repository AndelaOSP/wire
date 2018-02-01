import React from 'react';
import { MemoryRouter, Route, Switch } from 'react-router-dom';
import { mount } from 'enzyme';

import IncidentTimeline from '../src/pages/IncidentTimeline/IncidentTimeline.Component';

describe('IncidentTimeline component', () => {
  it('renders without crashing', () => {
    mount(
      <MemoryRouter>
        <Switch>
          <Route path="/timeline/:incidentId" component={IncidentTimeline} />
        </Switch>
      </MemoryRouter>
    );
  });
});
