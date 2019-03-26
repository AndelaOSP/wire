/* eslint-disable no-console */
/**
 * A class for managing server-side socket connections.
 * */
class Socket {
  constructor(server) {
    // Connect socket to running server
    // eslint-disable-next-line global-require
    this.io = require('socket.io')(server);

    // Add cors for socket
    this.io.origins('*:*');

    // Client associations { userId: [socketId, token], ... }
    // REVIEW: Should this be stored in the Db?
    this.clients = {};

    // Set up connections
    this.establishConnection();
  }

  /**
   * Sets up what happens when there is a new connection or disconnection.
   * */
  establishConnection() {
    // Using promise to get the socket value
    this.connection = new Promise((resolve) => {
      // The following happens when a new connection is established.
      this.io.on('connection', (socket) => {
        // Handle new connections
        this.handleNewConnection(socket);

        // Handle disconnections
        this.handleDisconnection(socket);

        // Make socket the Promise data
        resolve(socket);
      });
    });
  }

  /**
   * Handles new client connections
   * @param socket object
   * */
  handleNewConnection(socket) {
    console.log(`[server] A client (${socket.id}) just connected!`);
    // Do something with the data recieved.
    socket.on('new-connection', ({ token }) => {
      // If token is provided
      if (token) {
        // Authenticate user and register to list of connected clients.
        const userDetails = this.getUserDetails(token, socket);

        // Register client
        this.registerClient(userDetails);
      }
    });
  }

  /**
   * Registers client details in this.clients
   * @param userDetails object
   * */
  registerClient(userDetails) {
    userDetails.then(({ socket, user, token }) => {
      this.clients[user.id] = [socket.id, token];
    });
  }


  /**
   * Authenticates a new connected client
   * @param token string
   * @param socket object
   * */
  // eslint-disable-next-line class-methods-use-this
  authenticate(token, socket) {
    return new Promise(resolve => resolve({ socket, user: { id: 1 }, token }));
  }

  /**
   * Does cleanup when a client disconnects
   * @param socket object
   * */
  handleDisconnection(socket) {
    socket.on('disconnect', () => console.log(`[server] A client (${socket.id}) just disconnected!`));

    // Remove client from list of connected clients.
    const entries = Object.entries(this.clients).filter(
      ([, value]) => value[0] !== socket.id,
    );

    this.clients = entries.reduce((prev, [key, value]) => {
      // eslint-disable-next-line no-param-reassign
      prev[key] = value;
      return prev;
    }, {});
  }

  /**
   * Sends a response back to the client to update its UI on notify-cc
   * @param userIds array
   * @param message string
   * */
  notifyCCChange(userIds, message) {
    this.connection.then(() => {
      // Notify each user affected
      this.messageToUsers(userIds, 'notify-cc', message);
    });
  }

  /**
   * Sends a response back to the client to update its UI on notify-cc
   * @param userIds array
   * @param message string
   * */
  messageToUsers(userIds, eventName, message) {
    userIds.forEach((id) => {
      const client = this.clients[id];
      if (client) {
        this.io.to(`${client[0]}`).emit(eventName, { message });
      }
    });
  }
}

module.exports = server => new Socket(server);
