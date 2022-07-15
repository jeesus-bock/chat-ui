import createWebsocket from '@solid-primitives/websocket';

export interface Msg {
  type: string;
  from: string;
  to: string;
  msg: string;
  ts: number;
}

function initWS2(rcv: (e: Msg) => void): (msg: string) => void {
  const [connect, disconnect, send, state] = createWebsocket(
    'wss://demo.piesocket.com/v3/channel_1?api_key=oCdCMcMPQpbvNjUIzqtvF1d2X2okWpDQj4AwARJuAgtjhzKxVEjQU6IdCjwm&notify_self',
    (msg) => rcv(JSON.parse(msg.data)),
    (msg: Event) => {
      throw new Error(msg['error']);
    },
    [],
    5,
    5000
  );
  return send;
}

function initWS(rcv: (e: Msg) => void): (message: string) => void {
  setInterval(() => {
    const e: Msg = { type: 'msg', from: 'mock_user', to: 'mock_chan', msg: 'This is a test message!', ts: Date.now() };
    rcv(e);
  }, 2000);
  const send = (msg: string) => {
    console.log('WS sending msg', msg);
  };
  return send;
}
