const fuzzysearch = require('fuzzysearch');

let { incidents, chats, notes, users, statuses, levels } = require('./mockData');

module.exports = {
  getIncident: incidentId => {
    let incident = incidents.find(incident => {
      return incident.id === incidentId;
    });
    incident['Assignee'] =
      users.find(user => {
        return user.id === incident.assigneeId;
      }) || null;
    incident['User'] =
      users.find(user => {
        return user.id === incident.userId;
      }) || null;
    incident['Status'] =
      statuses.find(status => {
        return status.id === incident.statusId;
      }) || null;
    incident['Level'] =
      levels.find(level => {
        return level.id === incident.levelId;
      }) || null;
    return incident;
  },
  getIncidents: query => {
    return incidents.filter(incident => fuzzysearch(query, incident.subject.toLowerCase()) === true).map(incident => {
      incident['Assignee'] =
        users.find(user => {
          return user.id === incident.assigneeId;
        }) || null;
      incident['User'] =
        users.find(user => {
          return user.id === incident.userId;
        }) || null;
      incident['Status'] =
        statuses.find(status => {
          return status.id === incident.statusId;
        }) || null;
      incident['Level'] =
        levels.find(level => {
          return level.id === incident.levelId;
        }) || null;
      return incident;
    });
  },
  getIncidentNotes: incidentId => {
    let incidentNotes = notes.filter(note => {
      return note.incidentId == incidentId;
    });
    incidentNotes.map(
      note =>
        (note['User'] = users.find(user => {
          return user.id === note.userId;
        }))
    );
    return incidentNotes;
  },
  getIncidentChats: incidentId => {
    let incidentChats = chats.filter(chat => {
      return chat.incidentId == incidentId;
    });
    incidentChats.map(chat => {
      chat['User'] = users.find(user => {
        return user.id === chat.userId;
      });
    });
    return incidentChats;
  },
  changeStatus: (incidentId, statusId) => {
    return this.getIncident(incidentId);
  },
  changeAssignee: (incidentId, assigneeId) => {
    return this.getIncident(incidentId);
  },
  addNote: (incidentId, userId, note) => {
    let newNote = {
      id: chats.length++,
      incidentId,
      userId,
      note
    };
    notes.push(newNote);
    return newNote;
  },
  editNote: (noteId, note) => {
    let noteToEdit = notes.find(note => {
      return note.id == noteId;
    });
    noteToEdit.note = note;
    noteToEdit['User'] = users.find(user => {
      return user.id === noteToEdit.userId;
    });
    return noteToEdit;
  },
  archiveNote: noteId => {
    return notes.filter(note => {
      return note.id != noteId;
    });
  },
  getChat: chatId => {
    return chats.find(chat => {
      return chat.id == chatId;
    });
  },
  addChat: (incidentId, userId, chat) => {
    let newChat = {
      id: chats.length++,
      incidentId,
      userId,
      chat
    };
    chats.push(newChat);
    return newChat;
  },
  editChat: (chatId, chat) => {
    let chatToEdit = chats.find(chat => {
      return chat.id == chatId;
    });
    chatToEdit.chat = chat;
    chatToEdit['User'] = users.find(user => {
      return user.id === chatToEdit.userId;
    });
    return chatToEdit;
  },
  archiveChat: chatId => {
    return chats.filter(chat => {
      return chat.id != chatId;
    });
  }
};
