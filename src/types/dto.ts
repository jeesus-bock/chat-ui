export interface User {
  userId: string;
  nick: string;
  rooms: Array<string>;
  server: string;
}
export interface Room {
  name: string;
  topic: string;
}

export interface ServerData {
  name: string;
  type: string;
  url: string;
  voiceUrl: string;
  users: Array<User>;
  rooms: Array<Room>;
}
