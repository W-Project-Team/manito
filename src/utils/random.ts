export function randomIndex (max: number) {
  return Math.floor(Math.random( )* max)
}

export function shuffle <T> (array: T[]) {
  array.sort(() => Math.random() - 0.5)
}
