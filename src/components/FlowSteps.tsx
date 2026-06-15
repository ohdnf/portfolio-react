import { ArrowDown } from 'lucide-react'
import { useId } from 'react'
import type { FlowDiagram } from '../types'

interface FlowStepsProps {
  flow: FlowDiagram
}

export function FlowSteps({ flow }: FlowStepsProps) {
  const titleId = useId()

  return (
    <section className="visual-section" aria-labelledby={titleId}>
      <div className="section-heading">
        <p className="eyebrow">Flow</p>
        <h3 id={titleId}>{flow.title}</h3>
        <p>{flow.description}</p>
      </div>

      <ol className="flow-steps">
        {flow.steps.map((step, index) => (
          <li key={`${step.actor}-${step.title}`}>
            <div className="flow-step-index">{String(index + 1).padStart(2, '0')}</div>
            <div>
              <span>{step.actor}</span>
              <strong>{step.title}</strong>
              <p>{step.detail}</p>
            </div>
            {index < flow.steps.length - 1 ? <ArrowDown aria-hidden="true" /> : null}
          </li>
        ))}
      </ol>
    </section>
  )
}
