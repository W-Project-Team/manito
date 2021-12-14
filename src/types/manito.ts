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
  connectTo?: Nullable<Participant>;
  connectFrom?: Nullable<Participant>;
}

export interface Room {
  participants: Participant[];
  dueDate: Date;
  presidentId: UserId;
  createdAt: Date;
  id: RoomId;
  status: 'Waiting' | 'Done';
  size: number;
  title: string;
  description?: string;
}
