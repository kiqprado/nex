export function FormattedStep(steps: number) {
  if(!Number.isFinite(steps) || steps < 0) {
    return '0'
  }

  return Math.floor(steps).toLocaleString('pt-BR')
}