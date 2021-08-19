export const dateFromSeconds = (time: number) => {
  const minutes = Math.floor(time / 60)

  const seconds = time - minutes*60

  return `${minutes}m ${seconds}s`
}