export interface Room {
  name: string;
  topic: string;
}
export interface Server {
  userCount: number;
  rooms: Array<Room>;
}
