module.exports = {
  incidents: [
    {
      id: '1',
      createdAt: '2018-02-13T15:58:06.202Z',
      subject: 'subject 1',
      description: 'description 1',
      dateOccurred: '2018-02-13T15:58:06.202Z',
      witnesses: ['@slack_name', '@slack_name'],
      userId: 1,
      statusId: 1,
      levelId: 3,
      locationId: 1,
      updatedAt: '2018-02-13T15:58:06.202Z',
      assigneeId: 2,
      categoryId: null
    },
    {
      id: '2',
      createdAt: '2018-02-13T15:58:06.202Z',
      subject: 'subject 2',
      description: 'description 2',
      dateOccurred: '2018-02-13T15:58:06.202Z',
      witnesses: ['@slack_name', '@slack_name'],
      userId: 2,
      statusId: 2,
      levelId: 2,
      locationId: 'locationId 2',
      updatedAt: '2018-02-13T15:58:06.202Z',
      assigneeId: 5,
      categoryId: null
    },
    {
      id: '3',
      createdAt: '2018-02-13T15:58:06.202Z',
      subject: 'subject 3',
      description: 'description 3',
      dateOccurred: '2018-02-13T15:58:06.202Z',
      witnesses: ['@slack_name', '@slack_name'],
      userId: 3,
      statusId: 3,
      levelId: 1,
      locationId: 3,
      updatedAt: '2018-02-13T15:58:06.202Z',
      assigneeId: 6,
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
      roleId: 'Admin'
    },
    {
      id: 2,
      email: 'metwo@example.com',
      name: 'Metwo Example',
      imageUrl: 'https://randomuser.me/api/portraits/med/men/83.jpg',
      roleId: 'Admin'
    },
    {
      id: 3,
      email: 'methree@example.com',
      name: 'Methree Example',
      imageUrl: 'https://randomuser.me/api/portraits/med/women/83.jpg',
      roleId: 'Admin'
    }
  ],
  locations: [
    {
      id: 1,
      name: 'Amphitheatre',
      center: 'Nairobi',
      country: 'Kenya'
    },
    {
      id: 2,
      name: 'Game Room',
      center: 'Nairobi',
      country: 'Kenya'
    },
    {
      id: 3,
      name: 'Board Room',
      center: 'Nairobi',
      country: 'Kenya'
    },
    {
      id: 4,
      name: 'Quiet Room',
      center: 'Nairobi',
      country: 'Kenya'
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
      status: 'In Progress'
    },
    {
      id: 2,
      status: 'Pending'
    },
    {
      id: 3,
      status: 'Resolved'
    }
  ]
};