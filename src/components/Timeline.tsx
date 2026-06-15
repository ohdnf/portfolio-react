import type { TimelineItem } from '../types'

interface TimelineProps {
  items: TimelineItem[]
}

export function Timeline({ items }: TimelineProps) {
  return (
    <section className="visual-section" aria-labelledby="timeline-title">
      <div className="section-heading">
        <p className="eyebrow">Operation Timeline</p>
        <h3 id="timeline-title">운영 이슈 분석과 개선 흐름</h3>
        <p>운영 중 발생한 DB 부하 문제를 기능, 쿼리, 서버 경계, 데이터베이스 구조 관점에서 좁혀간 과정입니다.</p>
      </div>
      <ol className="timeline">
        {items.map((item) => (
          <li key={`${item.period}-${item.title}`}>
            <span>{item.period}</span>
            <div>
              <h4>{item.title}</h4>
              <p>{item.detail}</p>
              <strong>{item.result}</strong>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
