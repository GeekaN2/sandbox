// worker
const WebSocket = require('ws');
// worker

const generateContext = () => {
  const lyrics = ['Never gonna give you up', 'Never gonna let you down', 'Never gonna run around and desert you', 'Never gonna make you cry', 'Never gonna say goodbye', 'Never gonna tell a lie and hurt you', 'Never gonna give you up', 'Never gonna let you down', 'Never gonna run around and desert you', 'Never gonna make you cry', 'Never gonna say goodbye', 'Never gonna tell a lie and hurt you'];

  return lyrics[Math.floor(Math.random() * lyrics.length)];
}

const getErrorFormatted = () => ({
  "token": "eyJpbnRlZ3JhdGlvbklkIjoiOWMzZjkxODQtZmI1ZS00MmJjLWE0Y2UtYzFlNjQwOWIzOTdhIiwic2VjcmV0IjoiYjE2MjU1MDAtY2IyYi00NjhlLWI2MzgtODViYzlmN2EwZTU0In0=",
  "catcherType": "errors/javascript",
  "payload": {
    "title": "Test many error",
    "type": "TypeError",
    "release": null,
    "context": {
      "rootContextSample": generateContext(),
    },
    "user": {
      "id": "FmDjGOx9fDZJtfQp073qCuRxpkWMIpaGMMUJedxT"
    },
    "addons": {
      "window": {
        "innerWidth": 950,
        "innerHeight": 799
      },
      "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:99.0) Gecko/20100101 Firefox/99.0",
      "url": "file:///Users/demo-workspace/example/index.html"
    },
    "backtrace": [
      {
        "file": "file:///Users/demo-workspace/example/sample-errors.js",
        "line": 46,
        "column": 22,
        "sourceCode": null,
        "function": "HTMLButtonElement.sendManyErrors"
      }
    ]
  }
})

const getIntegrationId = () => {
  try {
    const decodedIntegrationToken = JSON.parse(atob(getErrorFormatted().token));
    const { integrationId } = decodedIntegrationToken;

    if (!integrationId || integrationId === '') {
      throw new Error();
    }

    return integrationId;
  } catch {
    throw new Error('Invalid integration token.');
  }
}

class Socket {
  url;
  onMessage;
  onOpen;
  onClose;
  eventsQueue;
  ws;
  reconnectionTimer;
  reconnectionTimeout;
  reconnectionAttempts;

  constructor({
    collectorEndpoint,
    onMessage = (message) => { },
    onClose = () => { },
    onOpen = () => { },
    reconnectionAttempts = 5,
    reconnectionTimeout = 10000, // 10 * 1000 ms = 10 sec
  }) {
    this.url = collectorEndpoint;
    this.onMessage = onMessage;
    this.onClose = onClose;
    this.onOpen = onOpen;
    this.reconnectionTimeout = reconnectionTimeout;
    this.reconnectionAttempts = reconnectionAttempts;

    this.eventsQueue = [];
    this.ws = null;

    this.init()
      .then(() => {
        this.sendQueue();
      })
      .catch((error) => {
        console.log('WebSocket error', 'error', error);
      });
  }

  /**
   * Send an event to the Collector
   *
   * @param message - event data in Hawk Format
   */
  async send(message) {
    if (this.ws === null) {
      this.eventsQueue.push(message);

      return this.init();
    }

    switch (this.ws.readyState) {
      case WebSocket.OPEN:
        return this.ws.send(JSON.stringify(message));

      case WebSocket.CLOSED:
        this.eventsQueue.push(message);

        return this.reconnect();

      case WebSocket.CONNECTING:
      case WebSocket.CLOSING:
        this.eventsQueue.push(message);
    }
  }

  /**
   * Create new WebSocket connection and setup event listeners
   */
  init() {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(this.url);

      /**
       * New message handler
       */
      if (typeof this.onMessage === 'function') {
        this.ws.onmessage = this.onMessage;
      }

      /**
       * Connection closing handler
       *
       * @param event - websocket event on closing
       */
      this.ws.onclose = (event) => {
        if (typeof this.onClose === 'function') {
          this.onClose(event);
        }
      };

      /**
       * Error handler
       *
       * @param event - websocket event on error
       */
      this.ws.onerror = (event) => {
        reject(event);
      };

      this.ws.onopen = (event) => {
        if (typeof this.onOpen === 'function') {
          this.onOpen(event);
        }

        resolve();
      };
    });
  }

  /**
   * Tries to reconnect to the server for specified number of times with the interval
   *
   * @param {boolean} [isForcedCall] - call function despite on timer
   * @returns {Promise<void>}
   */
  async reconnect(isForcedCall = false) {
    if (this.reconnectionTimer && !isForcedCall) {
      return;
    }

    this.reconnectionTimer = null;

    try {
      await this.init();

      console.log('Successfully reconnected.', 'info');
    } catch (error) {
      this.reconnectionAttempts--;

      if (this.reconnectionAttempts === 0) {
        return;
      }

      this.reconnectionTimer = setTimeout(() => {
        this.reconnect(true);
      }, this.reconnectionTimeout);
    }
  }

  /**
   * Sends all queued events one-by-one
   */
  sendQueue() {
    while (this.eventsQueue.length) {
      this.send(this.eventsQueue.shift())
        .catch((sendingError) => {
          console.log('WebSocket sending error', 'error', sendingError);
        });
    }
  }
}

let transport = new Socket({
  collectorEndpoint: `wss://${getIntegrationId()}.k1.hawk.so:443/ws`,
  reconnectionAttempts: 1,
  reconnectionTimeout: 5000,
  onClose() {
    console.log(
      'Connection lost. Connection will be restored when new errors occurred',
      'info'
    );
  },
});

const numberOfError = Math.floor(Math.random() * 20) + 1;

for (let i = 0; i < numberOfError; i++) {
  const errorFormatted = getErrorFormatted();

  transport.send(errorFormatted)
    .catch((sendingError) => {
      console.log('WebSocket sending error', 'error', sendingError);
    });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(() => { process.exit(1)}, ms));
}

sleep(10000);

