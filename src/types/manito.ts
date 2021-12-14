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
