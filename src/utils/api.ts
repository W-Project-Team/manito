import { collection, doc, getDoc, getFirestore, setDoc, addDoc, updateDoc, arrayUnion, Timestamp } from 'firebase/firestore'
import { MyInfo, Room, RoomId, UserId } from '@/types/manito'

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

export async function addNewRoom (title: string, description: string, size: number, dueDate: Date) {
  const db = getFirestore()
  const doc = await addDoc(collection(db, PATH.ROOMS), {
    title,
    description,
    dueDate,
    size,
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
      connectTo: null
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

  return snapshot.data() as Room
}

export function fetchMockRoom (roomId: RoomId): Room {
  const mock = mockRoom[0]
  return mock
}