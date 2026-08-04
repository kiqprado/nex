export function CalculateSpeed(distanceInMeters: number, durationInSeconds: number): number {
  if(distanceInMeters <= 0 || durationInSeconds <= 0) {
    return 0
  }

  const distanceInKilometers = distanceInMeters / 1000
  const durationInHours = durationInSeconds / 3600

  return distanceInKilometers / durationInHours
}