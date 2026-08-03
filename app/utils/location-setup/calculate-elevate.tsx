import { CurrentPosition } from "@/app/types/location";

const MIN_ELEVATION_CHANGE_METERS = 2
const MAX_ALTITUDE_ACCURACY_METERS = 20

export function CalculateElevate(from: CurrentPosition, to: CurrentPosition): number {
  if(from.altitude === null || to.altitude === null) {
    return 0 
  }

  if(from.altitudeAccuracy === null || to.altitudeAccuracy === null) {
    return 0 
  }

  if(from.altitudeAccuracy > MAX_ALTITUDE_ACCURACY_METERS ||
    to.altitude > MAX_ALTITUDE_ACCURACY_METERS) {
    return 0
  }

  const elevationChange = to.altitude - from.altitude

  if(elevationChange < MIN_ELEVATION_CHANGE_METERS) {
    return 0
  }

  return elevationChange
}