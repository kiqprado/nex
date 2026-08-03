import { CurrentPosition } from "@/app/types/location";

const MAX_HORIZONTAL_ACCURACY = 30

export function IsValidPosition(position: CurrentPosition): boolean {
  if(!Number.isFinite(position.longitude)) return false
  if(!Number.isFinite(position.latitude)) return false

  if(position.latitude < -90 || position.latitude > 90) {
    return false
  }

  if(position.longitude < -180 || position.longitude > 180) {
    return false
  }

  if(!Number.isFinite(position.accuracy) || position.accuracy > MAX_HORIZONTAL_ACCURACY) {
    return false
  }

  return true
}