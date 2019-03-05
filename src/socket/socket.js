import io from 'socket.io-client';

/**
 * A class for managing client-side socket connections.
 */
export default class Socket {
  constructor(url) {
    // Connects to the server at teh url.
    this.socket = io(url);

    // Display a message when server is connected to
    this.socket.on('connect', () => {
      console.log(`[client] (${this.socket.id}) Connected to server!`);
      this.emitNewConnection();
    });
  }


  /**
   * Emits a message to the server when connected. The message holds a token.
   */
  emitNewConnection() {
    // Get token from cookie.
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)jwt-token\s*=\s*([^;]*).*$)|^.*$/, '$1');
    this.socket.emit('new-connection', { token });
  }

  /**
   * Subscribes to notify-cc messages from the server
   * @param func Function
   */
  subscribeToNotifyCC(func) {
    // Do something with the data recieved.
    this.socket.on('notify-cc', (data) => {
      func(data);
    });
  }
}
