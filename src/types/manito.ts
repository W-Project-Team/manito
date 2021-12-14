import { Nullable } from '@/types/base'

export declare namespace Manito {
  type UserId = string;
  type RoomId = string;
  type Status = 'Waiting' | 'Done'

  interface Member {
    name: string;
    profileImage: string;
    connectWho: Nullable<Member>;
    id: UserId;
  }

  interface Room {
    participants: Member[];
    dueDate: Date;
    createdAt: Date;
    id: RoomId;
    status: 'Waiting' | 'Done';
    size: number;
    title: string;
    description?: string;
  }
}
