import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import IncidentCard from './IncidentCard.Component';
import { incidents } from '../../../mock_endpoints/mockData';

configure({ adapter: new Adapter() });

describe('Incident Card', () => {
  let wrapper;
  let props;
  beforeEach(() => {
    props = {
      incidentId: '1',
      incidentSubject: 'Harassment',
      incidentDescription: '',
      incidentReportDate: '',
      incidentTime: '',
      incidentFlag: 'Red',
      assignees: [],
    };
    if (wrapper) wrapper.unmount();
  });
  it('should render all div elements', () => {
    wrapper = shallow(<IncidentCard {...props} />);
    expect(wrapper.find('div').length).toEqual(9);
  });

  it('should render assignee', () => {
    wrapper = shallow(<IncidentCard {...props} />);
    expect(wrapper.find('div').at(8).props().children).toContain('Unassigned');
  });

  it('should render incidents with green flag', () => {
    props = {
      incidentId: '2',
      incidentSubject: 'Theft',
      incidentDescription: '',
      incidentReportDate: '',
      incidentTime: '',
      incidentFlag: 'Green',
      assignees: [],
    };
    wrapper = shallow(<IncidentCard {...props} />);
    expect(wrapper.find('img').prop('alt')).toEqual('green');
  });

  it('should render incidents with yellow flag', () => {
    props = {
      incidentId: '3',
      incidentSubject: 'Indiscipline',
      incidentDescription: '',
      incidentReportDate: '',
      incidentTime: '',
      incidentFlag: 'Yellow',
      assignees: [],
    };
    wrapper = shallow(<IncidentCard {...props} />);
    expect(wrapper.find('img').prop('alt')).toEqual('yellow');
  });

  it('should render assignees', () => {
    props = {
      incidentId: '10',
      incidentSubject: 'subject 10',
      incidentDescription: 'description 10',
      incidentReportDate: '',
      incidentTime: '',
      incidentFlag: 'Yellow',
      assignees: [
        {
          id: 'cjm0mhomr000001mdfyhht9w6',
          slackId: null,
          email: 'james.kimani@andela.com',
          username: 'James Kimani',
          imageUrl: null,
          createdAt: '2018-09-13T13:41:45.844Z',
          updatedAt: '2018-09-26T11:47:17.992Z',
          locationId: 'cjee22lsq0000cqxs5tmmpf1g',
          roleId: 3,
          assignedRole: 'ccd',
        },
        {
          id: 'cjlp986ri000301jlt7glyyq3',
          slackId: 'U278UF5HR',
          email: 'brian.kimokoti@andela.com',
          username: 'Brian Assignee',
          imageUrl: null,
          createdAt: '2018-09-05T14:44:59.839Z',
          updatedAt: '2018-09-26T12:57:38.521Z',
          locationId: 'cjee22lsq0000cqxs5tmmpf1g',
          roleId: 2,
          assignedRole: 'assignee',
        },
        {
          id: 'cjlp986ri000301jlt7glyyq3',
          slackId: 'U278UF5HR',
          email: 'brian.kimokoti@andela.com',
          username: 'Brian CCD',
          imageUrl: null,
          createdAt: '2018-09-05T14:44:59.839Z',
          updatedAt: '2018-09-26T12:57:38.521Z',
          locationId: 'cjee22lsq0000cqxs5tmmpf1g',
          roleId: 2,
          assignedRole: 'ccd',
        },
      ],
      categoryId: null,
    }

    wrapper = shallow(<IncidentCard {...props} />);
    expect(wrapper.find('div [className="assignee"]')).toHaveLength(3);
  });
});
