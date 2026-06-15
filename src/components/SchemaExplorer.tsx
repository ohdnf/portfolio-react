import { Database } from 'lucide-react'
import type { SchemaGroup } from '../types'

interface SchemaExplorerProps {
  groups: SchemaGroup[]
}

export function SchemaExplorer({ groups }: SchemaExplorerProps) {
  return (
    <section className="visual-section" aria-labelledby="schema-title">
      <div className="section-heading">
        <p className="eyebrow">Data Model</p>
        <h3 id="schema-title">데이터 스키마 요약</h3>
        <p>전체 ERD를 그대로 노출하지 않고, 서비스 흐름을 이해하는 데 필요한 도메인 경계와 핵심 엔티티 관계만 정리했습니다.</p>
      </div>

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
    </section>
  )
}
