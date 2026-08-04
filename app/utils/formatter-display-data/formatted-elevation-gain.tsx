export function FormattedElevationGain(elevation: number) {
  if(!Number.isFinite(elevation) || elevation < 0) {
    return '0 m'
  }

  return `${Math.round(elevation)} m`
}