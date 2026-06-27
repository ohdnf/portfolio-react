import { Database } from 'lucide-react'
import type { SchemaGroup } from '../types'

interface SchemaExplorerProps {
  groups: SchemaGroup[]
}

export function SchemaExplorer({ groups }: SchemaExplorerProps) {
  return (
    <div className="schema-grid">
      {groups.map((group) => (
        <article className="schema-domain" key={group.domain}>
          <div className="schema-domain-header">
            <Database size={20} aria-hidden="true" />
            <div>
              <h4>{group.domain}</h4>
              <p>{group.description}</p>
            </div>
          </div>
          <div className="entity-list">
            {group.entities.map((entity) => (
              <div className="entity-table" key={entity.name}>
                <strong>{entity.name}</strong>
                <ul>
                  {entity.fields.map((field) => (
                    <li key={field}>{field}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <ul className="relationship-list">
            {group.relationships.map((relationship) => (
              <li key={relationship}>{relationship}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  )
}
