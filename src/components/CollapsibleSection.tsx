import { ChevronDown, ChevronRight } from 'lucide-react'
import { type ReactNode, useId, useState } from 'react'

interface CollapsibleSectionProps {
  eyebrow: string
  title: string
  description: string
  defaultOpen?: boolean
  children: ReactNode
}

export function CollapsibleSection({ eyebrow, title, description, defaultOpen = false, children }: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const titleId = useId()
  const panelId = useId()
  const Icon = isOpen ? ChevronDown : ChevronRight

  return (
    <section className="visual-section collapsible-section" aria-labelledby={titleId}>
      <button
        className="collapsible-trigger"
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen((current) => !current)}
      >
        <span className="collapsible-copy">
          <span className="eyebrow">{eyebrow}</span>
          <strong id={titleId}>{title}</strong>
          <span>{description}</span>
        </span>
        <span className="collapsible-action">
          <Icon size={20} aria-hidden="true" />
          {isOpen ? '접기' : '펼치기'}
        </span>
      </button>

      {isOpen ? (
        <div className="collapsible-panel" id={panelId}>
          {children}
        </div>
      ) : null}
    </section>
  )
}
