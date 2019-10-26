import uuid from "uuid";

const setMode = ({...rest}) => ({...rest, mode: 'cors'});
const setCache = ({...rest}) => ({...rest, cache: 'no-cache'})
const createMethod = ({ type, ...rest }) => ({ ...rest, method: type.toUpperCase() });
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
const toHeaders = ({headers, ...rest}) => ({...rest, headers:new Headers(headers)});

/// will be better to use a promise based pipeline since some process requires asynchronoucity
const pipeline = (type, payload) => {
  function t(steps, input) {
    if (steps.length) {
      const o = steps.shift().apply(this, [input]);
      return t(steps, o);
    }
    return input;
  }
  return t([setMode, setCache, createMethod, createPayload, createHeaders, toHeaders], { type, payload });
};

export function createRequest(type, url, payload) {
  // TODO: integrate oAuth handshaker here
  const { mode, method, body, headers, cache } = pipeline(type, payload);
  console.log(headers, mode);
  return new Request(url, { method, body, headers, mode, cache });
}

export async function sendRequest(request) {
  // this is our way to provide interceptors and some stuff like that.
  // For now, we are only supporting text as body (use json to map fetch response).
  // We are not allowing external definition of interception
  // Check if we have to map that in a fetch
  // TODO: use async/await for implementation
  fetch(request)
    // logging interception
    .then((response) => {
      console.log("response received");
      return response;
    })
    // Error catching
    .then((response) => {
      // TODO: extends error management
      if(!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    })
    // Payload transformation
    .then(response => response.json())
    // perform others interceptions steps
    // ...
    // catch errors
    .catch((error) => {
      // TODO: mvoe that in a specific logging functions stack
      const log  = console.error ? console.error : console.log
      log("an error occurred during the saving process", error);
    });
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
