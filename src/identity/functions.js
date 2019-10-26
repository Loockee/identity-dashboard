import uuid from "uuid";

const createMethod = ({ type, ...rest }) => ({ ...rest, method: type });
const createPayload = ({ payload, ...rest }) => ({
  ...rest,
  body: payload ? JSON.stringify(payload) : ""
});
const createHeaders = ({ headers, ...rest }) => ({
  ...rest,
  headers: {
    ...headers,
    "Content-Type": "application/json",
    "x-request-id": uuid.v4(),
    "x-sender-id": "react-tyne-0.0.1"
  }
});

/// will be better to use a promise based pipeline since some process requires asynchronoucity
const pipeline = (type, payload) => {
  // [createPayload, createHeaders, createMethod]
  function t(steps, input) {
    if (steps.length) {
      const o = steps.shift().apply(this, [input]);
      return t(steps, o);
    }
    return input;
  }
  return t([createPayload, createHeaders, createMethod], { type, payload });
};

export function createRequest(type, url, payload) {
  // TODO: integrate oAuth handsaker here
  let req = null;
  const { method, body, headers } = pipeline(type, payload); // TODO: complete;
  req = new Request(url, { method, body, headers });
  return new Request(url, req);
}

export async function sendRequest(request) {
  // the way to previde interceptors and some stuff like that
  // ffor now, we are only supporting text as body (use json to map fetch response)
  console.log("sending request", request);
  return Promise.resolve(true);
  /*
  // Check if we have to map that in a fetch
  // use async/await for implementation
  fetch(request)
    .then(response => response.json)
    // perform others interceptions steps
    .then(() => {
      console.log("posted");
    })
    // catch errors
    .catch(() => {
      console.log("an error occurred during the saving process");
    });
    */
}

let connected = false; // to bypass the bug due to my missunderstanding of hooks and react lifecycle

const noop = () => {};

// use rxjs here, this is just a bassic test to be fast
export function sockPubSub(onMessage) {
  if (connected) {
    return { close: noop, send: noop };
  }
  connected = true;
  const channelId = "8372441ab1f0b0a043c0";
  const roomId = "1";
  const wsUri = `wss://connect.websocket.in/${channelId}?room_id=${roomId}`;
  const webSocket = new WebSocket(wsUri);
  webSocket.onopen = () => {
    console.log("websocket opened");
  };
  webSocket.onerror = e => {
    console.log("an error occurred ont he websocket layer");
  };
  webSocket.onclose = () => {
    console.log("closing the websocket");
    connected = false;
  };
  webSocket.onmessage = m => {
    onMessage(m);
  };

  return {
    close: () => {
      webSocket.close();
    },
    send: message => {
      webSocket.send(message);
    }
  };
}
