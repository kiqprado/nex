export function FormattedPace(pace: number) {
  if(!Number.isFinite(pace) || pace <= 0 ) {
    return '--:--'
  }

  const minutes = Math.floor(pace / 60)
  const seconds = Math.floor(pace % 60)

  return `${minutes}:${seconds.toString().padStart(2, '0')} km`
}