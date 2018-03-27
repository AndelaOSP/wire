import React from 'react';
import { mount } from 'enzyme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import PropTypes from 'prop-types';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import initialState from '../src/reducers/initialState';
import createRouterContext from 'react-router-test-context';
import { newTestIncidents } from '../mock_endpoints/mockData';
import { Dashboard } from '../src/pages/Dashboard/Dashboard.Component';
import CircularProgressIndicator from '../src/Components/Progress/Progress.Component';
import IncidentFilter from '../src/Components/IncidentFilter/IncidentFilter.Component';
import CustomNotification from '../src/Components/CustomNotification/CustomNotification.Component';
import CustomMenu from '../src/Components/CustomMenu/CustomMenu.Component';
import SelectField from 'material-ui/SelectField';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const state = initialState;
const context = createRouterContext();
context['muiTheme'] = getMuiTheme();

describe('Dashboard', () => {

  it('renders without crashing', () => {
    mount(
      <Dashboard
        store={mockStore(state)}
        location={{}}
        history={{}}
        incidents={[]}
        loadIncidents={() => {}}
        isLoading={false}
        isError={false}
        errorMessage={''}
      />,
      {
        context,
        childContextTypes: {
          muiTheme: PropTypes.object.isRequired,
          router: PropTypes.object
      }
    });
  });

  it('renders nothing when IS_LOADING is true', () => {
    // omitting isLoading value in props sets it to true
    let dashboard = mount(
      <Dashboard
        store={mockStore(state)}
        location={{}}
        history={{}}
        incidents={[]}
        loadIncidents={() => {}}
        isLoading
        isError={false}
        errorMessage={''}
      />,
      {
        context,
        childContextTypes: {
          muiTheme: PropTypes.object.isRequired,
          router: PropTypes.object
      }
    });

    expect(dashboard.find(CircularProgressIndicator).exists()).toBe(true);
    expect(dashboard.find(IncidentFilter).exists()).toBe(false);
  });

  it('renders custom snackbar on error', () => {
    // omitting isError value in props sets it to true
    let dashboard = mount(
      <Dashboard
        store={mockStore(state)}
        location={{}}
        history={{}}
        incidents={[]}
        loadIncidents={() => {}}
        isLoading={false}
        isError
        errorMessage={'Fake test error'}
      />,
      {
        context,
        childContextTypes: {
          muiTheme: PropTypes.object.isRequired,
          router: PropTypes.object
      }
    });

    expect(dashboard.find(CustomNotification).exists()).toBe(true);
    expect(dashboard.find(CustomNotification).text()).toEqual('Fake test error');
  });
});

describe('Filter functionality', () => {

  it('renders incidents per the filter chosen', () => {

    const mockLoadIncidents = jest.fn();

    let dashboard = mount(
      <Dashboard
        store={mockStore(state)}
        location={{}}
        history={{}}
        incidents={[]}
        loadIncidents={mockLoadIncidents}
        isLoading={false}
        isError={false}
        errorMessage={''}
      />,
      {
        context,
        childContextTypes: {
          muiTheme: PropTypes.object.isRequired,
          router: PropTypes.object
      }
    });

    expect(mockLoadIncidents.mock.calls.length).toBe(1);

    dashboard.setProps({
      incidents: newTestIncidents
    });

    expect(dashboard.find('.incidents-progress').exists()).toEqual(true);
    let pendingIncidents = dashboard.find('.incidents-progress');
    expect(pendingIncidents.find('.incident-cards').exists()).toEqual(true);
    expect(pendingIncidents.find('.incident-cards').first().text()).toContain('Theft');
    expect(pendingIncidents.find('.incident-cards').text()).toContain('Fighting');

    const menu = dashboard.find(CustomMenu);
    const countrySelect = menu.find(SelectField);
    countrySelect.props().onChange('click', 1, 'Kenya');

    expect(pendingIncidents.find('.incident-cards').text()).toContain('Theft');
    expect(pendingIncidents.find('.incident-cards').text()).not.toContain('Fighting');

    countrySelect.props().onChange('click', 1, 'Nigeria');

    expect(pendingIncidents.find('.incident-cards').text()).toContain('Fighting');
    expect(pendingIncidents.find('.incident-cards').text()).not.toContain('Theft');

    dashboard.setState({
      filterKey: 'All Countries'
    });

    const filter = dashboard.find(IncidentFilter);
    const flagSelect = filter.find(SelectField).at(1);

    flagSelect.props().onChange('click', 1, 'red');

    expect(pendingIncidents.find('.incident-cards').text()).toContain('Theft');
    expect(pendingIncidents.find('.incident-cards').text()).not.toContain('Fighting');

    flagSelect.props().onChange('click', 1, 'yellow');

    expect(pendingIncidents.find('.incident-cards').text()).toContain('Fighting');
    expect(pendingIncidents.find('.incident-cards').text()).not.toContain('Theft');
  });
});
