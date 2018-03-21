module.exports = {
  incidents: [
    {
      id: 1,
      createdAt: '2018-02-13T15:58:06.202Z',
      subject: 'subject 1',
      description: null,
      dateOccurred: '2018-02-13T15:58:06.202Z',
      witnesses: ['@slack_name', '@slack_name'],
      statusId: 1,
      reporterId: 1,
      levelId: 3,
      locationId: 1,
      updatedAt: '2018-02-13T15:58:06.202Z',
      assignees: [
        {
          id: '-KhLsOxrKcKZC8i2n888',
          email: 'mercy.muchai@andela.com',
          name: 'Mercy Muchai',
          imageUrl: 'https://lh3.googleusercontent.com/-XxYl2Ryrfns/AAAAAAAAAAI/AAAAAAAAABg/QJRPuQnerrk/photo.jpg',
          roleId: 2,
          assignedRole: 'assignee'
        },
        {
          id: '-KhLsOxrKcKZC8i2n889',
          email: 'carol.nkirote@andela.com',
          name: 'Carol Nkirote',
          imageUrl: 'https://lh3.googleusercontent.com/-XxYl2Ryrfns/AAAAAAAAAAI/AAAAAAAAABg/QJRPuQnerrk/photo.jpg',
          roleId: 2,
          assignedRole: 'ccd'
        }
      ],
      categoryId: null
    },
    {
      id: 2,
      createdAt: '2018-02-13T15:58:06.202Z',
      subject: 'subject 2',
      description: 'description 2',
      dateOccurred: '2018-02-13T15:58:06.202Z',
      witnesses: ['@slack_name', '@slack_name'],
      statusId: 2,
      reporterId: 2,
      levelId: 2,
      locationId: 2,
      updatedAt: '2018-02-13T15:58:06.202Z',
      assignees: [],
      categoryId: null
    },
    {
      id: 3,
      createdAt: '2018-02-13T15:58:06.202Z',
      subject: 'subject 3',
      description: 'description 3',
      dateOccurred: '2018-02-13T15:58:06.202Z',
      witnesses: ['@slack_name', '@slack_name'],
      statusId: 3,
      reporterId: 3,
      levelId: 1,
      locationId: 3,
      updatedAt: '2018-02-13T15:58:06.202Z',
      assignees: [],
      categoryId: null
    },
    {
      id: 4,
      createdAt: '2018-02-13T15:58:06.202Z',
      subject: 'subject 4',
      description: 'description 3',
      dateOccurred: '2018-02-13T15:58:06.202Z',
      witnesses: ['@slack_name', '@slack_name'],
      statusId: 3,
      reporterId: 4,
      levelId: 1,
      locationId: 4,
      updatedAt: '2018-02-13T15:58:06.202Z',
      assignees: [],
      categoryId: null
    }
  ],
  notes: [
    {
      id: 1,
      createdAt: '2018-02-13T15:58:06.202Z',
      updatedAt: '2018-02-13T15:58:06.202Z',
      note: 'A note',
      userId: 1,
      incidentId: 1
    },
    {
      id: 2,
      createdAt: '2018-02-13T15:58:06.202Z',
      note: 'A note',
      userId: 1,
      incidentId: 1
    },
    {
      id: 3,
      createdAt: '2018-02-13T15:58:06.202Z',
      note: 'A note',
      userId: 1,
      incidentId: 2
    },
    {
      id: 4,
      createdAt: '2018-02-13T15:58:06.202Z',
      note: 'A note',
      userId: 1,
      incidentId: 3
    }
  ],
  chats: [
    {
      id: 1,
      chat: 'A chat',
      userId: 1,
      incidentId: 1,
      createdAt: '2018-02-13T15:58:06.202Z',
      updatedAt: '2018-02-13T15:58:06.202Z'
    },
    {
      id: 2,
      chat: 'A second chat',
      userId: 2,
      incidentId: 1,
      createdAt: '2018-02-13T15:58:06.202Z',
      updatedAt: '2018-02-13T15:58:06.202Z'
    },
    {
      id: 3,
      chat: 'Another chat',
      userId: 2,
      incidentId: 1,
      createdAt: '2018-02-13T15:58:06.202Z',
      updatedAt: '2018-02-13T15:58:06.202Z'
    }
  ],
  users: [
    {
      id: 1,
      email: 'me@example.com',
      name: 'Me Example',
      imageUrl: 'https://randomuser.me/api/portraits/med/women/83.jpg',
      roleId: 2
    },
    {
      id: 2,
      email: 'metwo@example.com',
      name: 'Metwo Ex',
      imageUrl: 'https://randomuser.me/api/portraits/med/men/83.jpg',
      roleId: 2
    },
    {
      id: 3,
      email: 'methree@example.com',
      name: 'Methree Ex',
      imageUrl: 'https://randomuser.me/api/portraits/med/women/83.jpg',
      roleId: 3
    },
    {
      id: 4,
      email: 'another@guy.com',
      name: 'Another Guy',
      imageUrl: 'https://randomuser.me/api/portraits/med/men/05.jpg',
      roleId: 1
    },
    {
      id: 5,
      email: 'another@lady.com',
      name: 'Another Lady',
      imageUrl: 'https://randomuser.me/api/portraits/med/women/05.jpg',
      roleId: 1
    },
    {
      id: '-KhLsOxrKcKZC8i2n888',
      email: 'mercy.muchai@andela.com',
      name: 'Mercy Muchai',
      imageUrl: 'https://lh3.googleusercontent.com/-XxYl2Ryrfns/AAAAAAAAAAI/AAAAAAAAABg/QJRPuQnerrk/photo.jpg',
      roleId: 2
    },
    {
      id: '-KhLsOxrKcKZC8i2n889',
      email: 'carol.nkirote@andela.com',
      name: 'Carol Nkirote',
      imageUrl: 'https://lh3.googleusercontent.com/-XxYl2Ryrfns/AAAAAAAAAAI/AAAAAAAAABg/QJRPuQnerrk/photo.jpg',
      roleId: 2
    },
    {
      id: '-KkqiPVabgde_hvNDi0A',
      email: 'robley.gori@',
      name: 'Robley Gori',
      imageUrl: 'https://lh6.googleusercontent.com/-tVq8OIwPjOw/AAAAAAAAAAI/AAAAAAAAAAo/t3GsqCgqrNk/photo.jpg?sz=50',
      roleId: 3
    }
  ],
  locations: [
    {
      id: 1,
      name: 'Amphitheatre',
      centre: 'Nairobi',
      country: 'Kenya'
    },
    {
      id: 2,
      name: 'Game Room',
      centre: 'Lagos',
      country: 'Nigeria'
    },
    {
      id: 3,
      name: 'Board Room',
      centre: 'New York',
      country: 'USA'
    },
    {
      id: 4,
      name: 'Quiet Room',
      centre: 'Kampala',
      country: 'Uganda'
    }
  ],
  categories: [],
  levels: [
    {
      id: 1,
      name: 'Red'
    },
    {
      id: 2,
      name: 'Yellow'
    },
    {
      id: 3,
      name: 'Green'
    }
  ],
  statuses: [
    {
      id: 1,
      status: 'Pending'
    },
    {
      id: 2,
      status: 'In Progress'
    },
    {
      id: 3,
      status: 'Resolved'
    }
  ],
  testIncident: {
    id: 1,
    createdAt: '2018-02-13T15:58:06.202Z',
    subject: 'subject 1',
    description: 'description 1',
    dateOccurred: '2018-02-13T15:58:06.202Z',
    witnesses: ['@slack_name', '@slack_name'],
    statusId: 1,
    levelId: 3,
    locationId: 1,
    updatedAt: '2018-02-13T15:58:06.202Z',
    categoryId: null,
    assignees: [
      {
        id: '-KhLsOxrKcKZC8i2n888',
        email: 'mercy.muchai@andela.com',
        name: 'Mercy Muchai',
        imageUrl: 'https://lh3.googleusercontent.com/-XxYl2Ryrfns/AAAAAAAAAAI/AAAAAAAAABg/QJRPuQnerrk/photo.jpg',
        roleId: 2,
        assignedRole: 'assignee'
      },
      {
        id: '-KhLsOxrKcKZC8i2n889',
        email: 'carol.nkirote@andela.com',
        name: 'Carol Nkirote',
        imageUrl: 'https://lh3.googleusercontent.com/-XxYl2Ryrfns/AAAAAAAAAAI/AAAAAAAAABg/QJRPuQnerrk/photo.jpg',
        roleId: 2,
        assignedRole: 'ccd'
      }
    ],
    Level: { name: 'Red' },
    reporter: {
      name: 'Test User'
    },
    Status: {
      status: 'Pending'
    },
    Assignee: {
      id: 1,
      name: 'Test Assignee'
    },
    notes: [],
    chats: []
  }
};
