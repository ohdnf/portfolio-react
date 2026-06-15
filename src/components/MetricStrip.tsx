import type { Metric } from '../types'

interface MetricStripProps {
  metrics: Metric[]
}

export function MetricStrip({ metrics }: MetricStripProps) {
  return (
    <div className="metric-strip" aria-label="핵심 지표">
      {metrics.map((metric) => (
        <article className={`metric-card tone-${metric.tone ?? 'slate'}`} key={`${metric.label}-${metric.value}`}>
          <span className="metric-label">{metric.label}</span>
          <strong>{metric.value}</strong>
          <p>{metric.caption}</p>
        </article>
      ))}
    </div>
  )
}
