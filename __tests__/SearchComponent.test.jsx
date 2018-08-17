import React from 'react';
import createRouterContext from 'react-router-test-context';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import initialState from '../src/reducers/initialState';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import PropTypes from 'prop-types';
import moxios from 'moxios';

import SearchComponent from '../src/pages/Search/Search.Component';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const state = initialState;
const context = createRouterContext();
context['muiTheme'] = getMuiTheme();

describe('SearchComponent', () => {
  beforeEach(() => {});

  it('renders without crashing', () => {
    mount(<SearchComponent store={mockStore(state)} history={{}} />, {
      context,
      childContextTypes: {
        muiTheme: PropTypes.object.isRequired,
        router: PropTypes.object
      }
    });
  });
});

describe('Search functionality', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('renders no results when there is no search query', () => {
    const searchInput = mount(<SearchComponent store={mockStore(state)} history={{}} />, {
      context,
      childContextTypes: {
        muiTheme: PropTypes.object.isRequired,
        router: PropTypes.object
      }
    });
    expect(searchInput.find('div .incident-cards').text()).toEqual('');
  });

  it('renders results when there is a search query', done => {
    const searchComponent = mount(<SearchComponent store={mockStore(state)} incidents={[]} history={{}} />, {
      context,
      childContextTypes: {
        muiTheme: PropTypes.object.isRequired,
        router: PropTypes.object
      }
    });

    const searchInput = searchComponent.find('input');
    searchInput.instance().value = 'Theft';
    searchInput.simulate('change', searchInput.instance());

    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request
        .respondWith({
          status: 200,
          response: {
            status: 'success',
            data: {
              incidents: [
                {
                  id: '12345667',
                  subject: 'Theft and so on',
                  dateOccurred: '2017-02-11T00:00:00.000Z',
                  createdAt: '2018-02-14T12:26:03.792Z',
                  reporter: { username: 'Maureen Nyakio' },
                  Level: { name: 'red' },
                  assignees: [{ username: 'Peter Musonye' }]
                }
              ]
            }
          }
        })
        .then(() => {
          let lastAction = searchComponent.instance().store.getActions()[0];
          expect(request.url).toContain('q=theft');
          expect(lastAction.incidents[0].subject).toBe('Theft and so on');
          expect(lastAction.type).toEqual('SEARCH_INCIDENTS');
          done();
        });
    });
  });
});
