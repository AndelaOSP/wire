const {
  getIncidents,
  getIncident,
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
  getStaff
} = require('./mockControllers');

module.exports = {
  fetchIncidents: (req, res) => {
    setTimeout(() => {
      let query = req.query.q ? req.query.q : '';
      res.send({ data: { incidents: getIncidents(query) }, status: 'success' });
    }, 2000);
  },
  fetchIncident: (req, res) => {
    setTimeout(() => {
      let incidentId = parseInt(req.params.id);
      res.send({ data: getIncident(incidentId), status: 'success' });
    }, 2000);
  },
  updateIncident: (req, res) => {
    setTimeout(() => {
      let incidentId = parseInt(req.params.id);
      if (req.body.statusId) {
        res.send({ data: changeStatus(incidentId, req.body.statusId), status: 'success' });
      } else if (req.body.assignee) {
        res.send({ data: changeAssignee(req.body.assignee.incidentId, req.body.assignee.userId, 'assignee'), status: 'success' });
      } else if (req.body.ccd) {
        res.send({ data: handleCCd(incidentId, req.body.ccd), status: 'success' });
      }
    }, 2000);
  },
  addNoteToIncident: (req, res) => {
    setTimeout(() => {
      let incidentId = parseInt(req.params.id);
      let { userId, note } = req.body;
      res.send({ data: addNote(incidentId, userId, note), status: 'success' });
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
      res.send({ users: getStaff(), status: 'success' });
    }, 2000);
  }
};
