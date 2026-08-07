import { CurrentPosition } from "@/app/types/location";

const MAX_HORIZONTAL_ACCURACY = 30

export function IsTrackablePosition(position: CurrentPosition): boolean {
 if(!Number.isFinite(position.accuracy)) {
  return false
 }

  return position.accuracy <= MAX_HORIZONTAL_ACCURACY
}