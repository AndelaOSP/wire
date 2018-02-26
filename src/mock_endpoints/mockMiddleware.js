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
  changeStatus
} = require('./mockControllers');

module.exports = {
  fetchIncidents: (req, res) => {
    setTimeout(() => {
      res.send({ data: { incidents: getIncidents() }, status: 'success' });
    }, 2000);
  },
  fetchIncident: (req, res) => {
    setTimeout(() => {
      let incidentId = req.params.id;
      res.send({ data: getIncident(incidentId), status: 'success' });
    }, 2000);
  },
  updateIncident: (req, res) => {
    setTimeout(() => {
      let incidentId = req.params.id;
      if (req.body.statusId) {
        res.send({ data: changeStatus(incidentId, req.body.statusId), status: 'success' });
      } else if (req.body.assigneeId) {
        res.send({ data: changeAssignee(incidentId, req.body.assigneeId), status: 'success' });
      }
    }, 2000);
  },
  addNoteToIncident: (req, res) => {
    setTimeout(() => {
      let incidentId = req.params.id;
      let { userId, note } = req.body;
      res.send({ data: addNote(incidentId, userId, note), status: 'success' });
    }, 2000);
  },
  fetchIncidentNotes: (req, res) => {
    setTimeout(() => {
      res.send({ data: { Notes: getIncidentNotes(req.params.id) }, status: 'success' });
    }, 2000);
  },
  editIncidentNote: (req, res) => {
    setTimeout(() => {
      let noteId = req.params.id;
      res.send({ data: editNote(noteId, req.body.note), status: 'success' });
    }, 2000);
  },
  archiveIncidentNote: (req, res) => {
    setTimeout(() => {
      res.send({ data: archiveNote(req.params.id), status: 'success' });
    }, 2000);
  },
  addChatToIncident: (req, res) => {
    setTimeout(() => {
      let incidentId = req.params.id;
      let { userId, chat } = req.body;
      res.send({ data: addChat(incidentId, userId, chat), status: 'success' });
    }, 2000);
  },
  fetchIncidentChats: (req, res) => {
    setTimeout(() => {
      res.send({ data: { Chats: getIncidentChats(req.params.id) }, status: 'success' });
    }, 2000);
  },
  editIncidentChat: (req, res) => {
    setTimeout(() => {
      let chatId = req.params.id;
      res.send({ data: editChat(chatId, req.body.chat), status: 'success' });
    }, 2000);
  },
  archiveIncidentChat: (req, res) => {
    setTimeout(() => {
      res.send({ data: archiveChat(req.params.id), status: 'success' });
    }, 2000);
  }
};
