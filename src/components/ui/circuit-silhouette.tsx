type CircuitSilhouetteProps = {
  circuitId: string
  className?: string
}

// Silueta del trazado del circuito — SVGs en /public/circuits/{circuitId}.svg
// Si el archivo no existe (circuitos históricos), se oculta automáticamente
export function CircuitSilhouette({ circuitId, className }: CircuitSilhouetteProps) {
  return (
    <img
      src={`/circuits/${circuitId}.svg`}
      alt=""
      loading="lazy"
      className={className}
      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
    />
  )
}
