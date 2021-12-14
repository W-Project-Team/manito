import { Nullable } from '@/types/base'

export declare namespace Manito {
  type UserId = string;
  type RoomId = string;
  type Status = 'Waiting' | 'Done'

  interface Participant {
    name: string;
    profileImage: string;
    connectWho: Nullable<Participant>;
    id: UserId;
  }

  interface Room {
    participants: Participant[];
    dueDate: Date;
    createdAt: Date;
    id: RoomId;
    status: 'Waiting' | 'Done';
    size: number;
    title: string;
    description?: string;
  }
}
