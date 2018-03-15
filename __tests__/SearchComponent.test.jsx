import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import PropTypes from 'prop-types';
import moxios from 'moxios';

import SearchComponent from '../src/pages/Search/Search.Component';

describe('SearchComponent', () => {
  beforeEach(() => {});

  it('renders without crashing', () => {
    mount(<SearchComponent history={{}} />, {
      context: {
        muiTheme: getMuiTheme()
      },
      childContextTypes: {
        muiTheme: PropTypes.object.isRequired
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
    const searchInput = mount(
      <MemoryRouter>
        <SearchComponent history={{}} />
      </MemoryRouter>,
      {
        context: {
          muiTheme: getMuiTheme()
        },
        childContextTypes: {
          muiTheme: PropTypes.object.isRequired
        }
      }
    );
    expect(searchInput.find('div .incident-cards').text()).toEqual('');
  });

  it('renders results when there is a search query', done => {
    const searchComponent = mount(
      <MemoryRouter>
        <SearchComponent history={{}} />
      </MemoryRouter>,
      {
        context: {
          muiTheme: getMuiTheme()
        },
        childContextTypes: {
          muiTheme: PropTypes.object.isRequired
        }
      }
    );

    const searchInput = searchComponent.find('input');
    searchInput.instance().value = 'stolen';
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
                  subject: 'Stolen Phone',
                  dateOccurred: '2017-02-11T00:00:00.000Z',
                  createdAt: '2018-02-14T12:26:03.792Z',
                  reporter: { username: 'Maureen Nyakio' },
                  Level: { name: 'red' }
                }
              ]
            }
          }
        })
        .then(() => {
          expect(searchComponent.find('.incident-cards').text()).toContain('Stolen Phone');
          done();
        });
    });
  });
});
