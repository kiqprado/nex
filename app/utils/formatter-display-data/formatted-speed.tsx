export function FormattedSpeed(speed: number) {
  if(!Number.isFinite(speed) || speed < 0) {
    return '--'
  }

  return `${speed.toFixed(1)} km/h`
}