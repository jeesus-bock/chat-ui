// Originally used the primitive, but it wouldn't work as expected out-of-the-box.
// So fallen back using bare new WebSocket
import createWebsocket from '@solid-primitives/websocket';
import { isServer } from 'solid-js/web';
export const chatWSUrl = import.meta.env.VITE_CHAT_WS_URL || 'ws://127.0.0.1:9393';
console.log('api url', chatWSUrl);
export interface Msg {
  type: string;
  from: string;
  to: string;
  msg: string;
  ts: number;
}

let ws: WebSocket;
export let sendWSMsg = (type: string, msg: string) => {
  console.log('shouldnt be running');
};

export let dcWs = () => {
  console.log('shouldnt be running');
};

export const initWS = (id: string, room: string, nick: string, rcv: (e: Msg) => void): ((type: string, msg: string) => void) => {
  if (isServer) {
    console.log("We're on server, do not start websocket2");
    return () => {};
  }
  if (nick == '') {
    console.log("We're on server, do not start websocket2");
    return () => {};
  }

  const wsUrl = chatWSUrl + '/ws/' + id + '/' + room + '?nick=' + nick;
  console.log('ws url', wsUrl);
  if (ws) ws.close();
  ws = new WebSocket(wsUrl);
  ws.onmessage = (e) => rcv(JSON.parse(e.data));
  sendWSMsg = (type: string, msg: string) => {
    if (!type) {
      type = 'msg';
    }
    const msgObj = { type: type, from: id, to: room, msg: msg, ts: Date.now() };
    console.log('Sending', msgObj);
    ws.send(JSON.stringify(msgObj));
  };
  return sendWSMsg;
};

export const initMockWS = (room: string, rcv: (e: Msg) => void): ((message: string) => void) => {
  setInterval(() => {
    const e: Msg = { type: 'msg', from: 'mock_user', to: room, msg: 'This is a test message!', ts: Date.now() };
    rcv(e);
  }, 4000);
  const send = (msg: string) => {
    console.log('WS sending msg', msg);
    rcv({ type: 'msg', from: 'self', to: room, msg: msg, ts: Date.now() });
  };
  return send;
};
