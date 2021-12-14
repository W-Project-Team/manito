import { Nullable } from '@/types/base'

export type UserId = string;
export type RoomId = string;
export type Status = 'Waiting' | 'Done'

export interface MyInfo {
  nickName: string;
  profileImage: string;
  participated: RoomId[];
}

export interface Participant {
  name: string;
  id: UserId;
  profileImage: string;
  connectWho: Nullable<Participant>;
}

export interface Room {
  participants: Participant[];
  dueDate: Date;
  createdAt: Date;
  id: RoomId;
  status: 'Waiting' | 'Done';
  size: number;
  title: string;
  description?: string;
}

export const mockRoom: Room[] = [
  { participants: [
      { id: '1', name: 'hads', connectWho: null },
      { id: '2', name: 'qweqwe', connectWho: null },
      { id: '3', name: 'qweqweasdasd', connectWho: null },
  ], dueDate: new Date(), createdAt: new Date(), id: 'fei4532', status: 'Waiting', size: 12, title: 'hello World', description: 'hello World'}
]