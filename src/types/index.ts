export interface User {
  userId: string;
  nick: string;
  rooms: Array<string>;
  server: string;
}
export interface Room {
  name: string;
  topic: string;
  users: Array<string>;
}

export interface ServerData {
  name: string;
  type: string;
  url: string;
  voiceUrl: string;
}

export type SendWs = (type: string, msg: string, to: string) => void;
