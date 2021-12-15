import { collection, doc, getDoc, getFirestore, setDoc, addDoc, updateDoc, arrayUnion, Timestamp } from 'firebase/firestore'
import { MyInfo, Participant, Room, RoomId, UserId } from '@/types/manito'
import { Nullable } from '@/types/base'
import { randomIndex, shuffle } from '@/utils/random'

const PATH = {
  MY_INFO: 'MyInfo',
  ROOMS: 'Rooms'
}

function getUserInfoRef (userId: UserId) {
  const db = getFirestore()
  return doc(collection(db, PATH.MY_INFO), userId)
}

function getRoomRef (roomId: RoomId) {
  const db = getFirestore()
  return doc(collection(db, PATH.ROOMS), roomId)
}

export async function fetchMyInfo (userId: UserId) {
  const db = getFirestore()
  const myInfoRef = doc(collection(db, 'MyInfo'), userId)
  const snapshot = await getDoc(myInfoRef)
  if (!snapshot.exists()) {
    throw new Error('유저 정보가 존재하지 않습니다.')
  }
  return snapshot.data() as MyInfo
}

export async function updateMyInfo (userId: UserId, data: Partial<MyInfo>) {
  const db = getFirestore()
  const myInfoRef = doc(collection(db, 'MyInfo'), userId)
  const snapshot = await getDoc(myInfoRef)

  if (!snapshot.exists()) {
    throw new Error('유저 정보가 존재하지 않습니다.')
  }

  const currentMyInfo = snapshot.data() as MyInfo
  await updateDoc(myInfoRef,{
    ...currentMyInfo,
    ...data
  })
}

export async function addNewRoom (userId: string, title: string, description: string, size: number, dueDate: Date) {
  const db = getFirestore()
  const doc = await addDoc(collection(db, PATH.ROOMS), {
    title,
    description,
    dueDate,
    size,
    presidentId: userId,
    createdAt: new Date(),
    status: 'Waiting',
    participants: []
  })

  await updateDoc(doc, {
    id: doc.id
  })

  return doc.id
}

export async function isParticipatedInRoom (roomId: RoomId, userId: UserId) {
  const isRegistered = await isRegisteredUser(userId)

  if (!isRegistered) {
    throw new Error('회원가입 되지 않았습니다.')
  }

  const roomInfo = await fetchRoom(roomId)

  return roomInfo.participants.some(x => x.id === userId)
}

export async function registerUserOnRoom (roomId: RoomId, userId: UserId) {
  const isRegistered = await isRegisteredUser(userId)

  if (!isRegistered) {
    throw new Error('회원가입 되지 않았습니다.')
  }

  const isParticipated = await isParticipatedInRoom(roomId, userId)
  if (isParticipated) {
    throw new Error('이미 해당 방에 등록되어 있습니다.')
  }

  const recentRoom = await fetchRoom(roomId)
  const myInfo = await fetchMyInfo(userId)

  const roomRef = getRoomRef(roomId)
  await updateDoc(roomRef, {
    participants: [...recentRoom.participants, {
      name: myInfo.nickName,
      id: userId,
      profileImage: myInfo.profileImage,
      connectTo: null,
      connectFrom: null
    }]
  })

  await updateMyInfo(userId, {
    participated: [roomId]
  })
}

export async function registerNewUser (userId: UserId, nickName: string, profileImage: string): Promise<void> {
  const myInfoRef = getUserInfoRef(userId)
  await setDoc(myInfoRef, { nickName, profileImage, participated: [] })
}

export async function isRegisteredUser (userId: UserId): Promise<boolean> {
  const myInfoRef = getUserInfoRef(userId)
  const snapshot = await getDoc(myInfoRef)

  return snapshot.exists()
}

export async function fetchRoom (roomId: RoomId): Promise<Room> {
  const roomRef = getRoomRef(roomId)
  const snapshot = await getDoc(roomRef)

  if (!snapshot.exists()) {
    throw new Error(`방 (${roomId})이 존재하지 않습니다.`)
  }

  const data = snapshot.data()
  data.dueDate = data.dueDate.toDate()
  return data as Room
}

export async function startManito (roomId: RoomId) {
  const room = await fetchRoom(roomId)

  shuffle<Participant>(room.participants)

  for (let index = 0; index < room.participants.length; index++) {
    const isLast = room.participants.length - 1 === index

    const me = room.participants[index]
    const target = isLast ? room.participants[0] : room.participants[index + 1]
    me.connectTo = { id: target.id, name: target.name, profileImage: target.profileImage }
  }

  room.status = 'Done'
  const db = getFirestore()

  await updateDoc(doc(collection(db, PATH.ROOMS), roomId), {
    status: 'Done',
    participants: room.participants
  })
}
