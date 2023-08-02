export function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function getRandomArray(size: number) {
  const array = [0, 100]
  while (array.length < size)
    array.push(randomInt(10, 90))
  return array.sort((a, b) => a - b)
}

export function getRandomSubarray(arr: number[], size: number) {
  const shuffled = arr.slice(0)
  let i = arr.length
  const min = i - size
  let temp
  let index
  while (i-- > min) {
    index = Math.floor((i + 1) * Math.random())
    temp = shuffled[index]
    shuffled[index] = shuffled[i]
    shuffled[i] = temp
  }
  return shuffled.slice(min)
}
