const {
  getIncidents,
  getIncident,
  searchIncidents,
  getIncidentNotes,
  getIncidentChats,
  addNote,
  addChat,
  editNote,
  editChat,
  archiveNote,
  archiveChat,
  changeAssignee,
  handleCCd,
  changeStatus,
  getStaff,
  getRoles,
  getLocations,
  addUser,
  editUser,
  searchUser,
  deleteUser,
  login
} = require('./mockControllers');

module.exports = {
  fetchIncidents: (req, res) => {
    setTimeout(() => {
      let query = req.query.q ? req.query.q : '';
      res.send({ data: { incidents: getIncidents(query) }, status: 'success' });
    }, 2000);
  },
  handleSearch: (req, res) => {
    setTimeout(() => {
      let query = req.query.q ? req.query.q : '';
      res.send({ data: { incidents: searchIncidents(query) }, status: 'success' });
    }, 2000);
  },
  fetchIncident: (req, res) => {
    setTimeout(() => {
      let incidentId = parseInt(req.params.id);
      if(getIncident(incidentId) === 'Incident Not Found') {
        return res.status(404).send({ error: true, message: 'Incident not found', status: 'error' });
      }
      res.send({ data: getIncident(incidentId), status: 'success' });
    }, 2000);
  },
  updateIncident: (req, res) => {
    setTimeout(() => {
      let incidentId = parseInt(req.params.id);
      if (req.body.statusId) {
        res.send({ data: changeStatus(incidentId, req.body.statusId), status: 'success' });
      } else if (req.body.assignee) {
        res.send({
          data: changeAssignee(req.body.assignee.incidentId, req.body.assignee.userId, 'assignee'),
          status: 'success'
        });
      } else if (req.body.ccd) {
        res.send({ data: handleCCd(incidentId, req.body.ccd), status: 'success' });
      }
    }, 2000);
  },
  addNoteToIncident: (req, res) => {
    setTimeout(() => {
      let incidentId = parseInt(req.params.id);
      let { userEmail, note } = req.body;
      res.send({ data: addNote(incidentId, userEmail, note), status: 'success' });
    }, 2000);
  },
  fetchIncidentNotes: (req, res) => {
    setTimeout(() => {
      res.send({ data: { notes: getIncidentNotes(parseInt(req.params.id)) }, status: 'success' });
    }, 2000);
  },
  editIncidentNote: (req, res) => {
    setTimeout(() => {
      let noteId = parseInt(req.params.id);
      res.send({ data: editNote(noteId, req.body.note), status: 'success' });
    }, 2000);
  },
  archiveIncidentNote: (req, res) => {
    setTimeout(() => {
      res.send({ data: archiveNote(parseInt(req.params.id)), status: 'success' });
    }, 2000);
  },
  addChatToIncident: (req, res) => {
    setTimeout(() => {
      let incidentId = parseInt(req.params.id);
      let { userId, chat } = req.body;
      res.send({ data: addChat(incidentId, userId, chat), status: 'success' });
    }, 2000);
  },
  fetchIncidentChats: (req, res) => {
    setTimeout(() => {
      res.send({ data: { chats: getIncidentChats(parseInt(req.params.id)) }, status: 'success' });
    }, 2000);
  },
  editIncidentChat: (req, res) => {
    setTimeout(() => {
      let chatId = parseInt(req.params.id);
      res.send({ data: editChat(chatId, req.body.chat), status: 'success' });
    }, 2000);
  },
  archiveIncidentChat: (req, res) => {
    setTimeout(() => {
      res.send({ data: archiveChat(parseInt(req.params.id)), status: 'success' });
    }, 2000);
  },
  fetchStaff: (req, res) => {
    setTimeout(() => {
      res.send({ data: { users: getStaff() }, status: 'success' });
    }, 2000);
  },
  fetchRoles: (req, res) => {
    setTimeout(() => {
      res.send({ data: { roles: getRoles() }, status: 'success' });
    }, 2000);
  },
  fetchLocations: (req, res) => {
    setTimeout(() => {
      res.send({ data: { locations: getLocations() }, status: 'success' });
    }, 2000);
  },
  addUser: (req, res) => {
    setTimeout(() => {
      let { email, roleId, locationId } = req.body;
      res.send({ data: addUser(email, roleId, locationId), status: 'success' });
    }, 2000);
  },
  searchUser: (req, res) => {
    setTimeout(() => {
      let query = req.query.q ? req.query.q : '';
      res.send({ data: { users: searchUser(query) }, status: 'success' });
    }, 2000);
  },
  editUser: (req, res) => {
    setTimeout(() => {
      let userId = parseInt(req.params.id);
      let { roleId } = req.body;
      res.send({ data: editUser(userId, roleId), status: 'success' });
    }, 2000);
  },
  deleteUser: (req, res) => {
    setTimeout(() => {
      let userId = parseInt(req.params.id);
      res.send({ data: deleteUser(userId), status: 'success' });
    }, 2000);
  },
  login: (req, res) => {
    setTimeout(() => {
      if(!login(req.body.email)) {
        return res.status(401).send({ error: true, message: 'User does not exist', status: 'error' });
      }
      res.send({userToken: login(req.body.email), status: 'success' });
    }, 2000);
  }
};
