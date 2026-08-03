import { CurrentPosition } from "@/app/types/location";

const EARTH_RADIUS_METERS = 6_371_000

export function CalculateDistance(from: CurrentPosition, to: CurrentPosition): number {
  const latitude1 = (from.latitude * Math.PI) / 180
  const latitude2 = (to.latitude * Math.PI) / 180

  const deltaLatitude = ((to.latitude - from.latitude) * Math.PI) / 180
  const deltaLongitude = ((to.longitude - from.longitude) * Math.PI) / 180

  const a = Math.sin(deltaLatitude / 2) ** 2 +
  Math.cos(latitude1) * Math.cos(latitude2) * Math.sin(deltaLongitude / 2) ** 2

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return EARTH_RADIUS_METERS * c
}