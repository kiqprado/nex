export function FormattedElapsedTimer(timer: number) {
  const hours = Math.floor(timer / 3600)
  const minutes = Math.floor((timer % 3600) / 60)
  const seconds = Math.floor(timer % 60)

  if(hours === 0) {
    return [
      minutes.toString().padStart(2, '0'),
      seconds.toString().padStart(2, '0'),
    ].join(':')
  }

  return [
    hours.toString().padStart(2, '0'),
    minutes.toString().padStart(2, '0'),
    seconds.toString().padStart(2, '0'),
  ].join(':')
}