import { CheckCircle2, ExternalLink, GitPullRequest, Layers, Server } from 'lucide-react'
import type { Metric, Project } from '../types'
import { ArchitectureMap } from './ArchitectureMap'
import { CollapsibleSection } from './CollapsibleSection'
import { FlowSteps } from './FlowSteps'
import { SchemaExplorer } from './SchemaExplorer'
import { Timeline } from './Timeline'

interface ProjectPanelProps {
  project: Project
}

const metricSuffixByLabel: Partial<Record<string, string>> = {
  Downloads: '다운로드',
  Users: '가입자',
  Requests: '요청',
  Launch: '출시',
}

function formatMetricSummary(metric: Metric) {
  const suffix = metricSuffixByLabel[metric.label]

  if (!suffix) {
    return metric.value
  }

  return `${metric.value} ${suffix}`
}

export function ProjectPanel({ project }: ProjectPanelProps) {
  const briefItems = [
    { label: 'Problem', title: '문제', detail: project.brief.problem },
    { label: 'Action', title: '내 역할', detail: project.brief.action },
    { label: 'Result', title: '결과', detail: project.brief.result },
  ]
  const metricSummary = project.metrics.map(formatMetricSummary).join(' · ')

  return (
    <article className="project-panel">
      <header className="project-header">
        <div>
          <p className="eyebrow">Selected Project</p>
          <h2>{project.name}</h2>
          <p className="project-summary">{project.summary}</p>
        </div>
        <dl className="project-meta">
          <div>
            <dt>기간</dt>
            <dd>{project.period}</dd>
          </div>
          <div>
            <dt>역할</dt>
            <dd>{project.role}</dd>
          </div>
          <div>
            <dt>규모/구조</dt>
            <dd>{metricSummary}</dd>
          </div>
          {project.serviceUrl ? (
            <div>
              <dt>서비스 링크</dt>
              <dd>
                <a className="project-link" href={project.serviceUrl} target="_blank" rel="noreferrer">
                  서비스 페이지
                  <ExternalLink size={14} aria-hidden="true" />
                </a>
              </dd>
            </div>
          ) : null}
        </dl>
      </header>

      <section className="brief-grid" aria-label={`${project.name} 핵심 요약`}>
        {briefItems.map((item) => (
          <article className="brief-card" key={item.label}>
            <span>{item.label}</span>
            <h3>{item.title}</h3>
            <p>{item.detail}</p>
          </article>
        ))}
      </section>

      <section className="project-section contribution-section" aria-labelledby={`${project.id}-contributions`}>
        <div className="section-heading compact">
          <p className="eyebrow">Contribution</p>
          <h3 id={`${project.id}-contributions`}>개인 기여</h3>
        </div>
        <div className="contribution-grid">
          {project.contributionHighlights.map((highlight) => (
            <article className={`contribution-card tone-${highlight.tone ?? 'slate'}`} key={highlight.title}>
              <h4>{highlight.title}</h4>
              <p>{highlight.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="project-section split-layout">
        <div>
          <div className="section-heading compact">
            <p className="eyebrow">Role</p>
            <h3>주요 담당 업무</h3>
          </div>
          <ul className="responsibility-list">
            {project.responsibilities.map((responsibility) => (
              <li key={responsibility}>
                <CheckCircle2 size={18} aria-hidden="true" />
                <span>{responsibility}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="section-heading compact">
            <p className="eyebrow">Stack</p>
            <h3>기술 선택 이유</h3>
          </div>
          <div className="tech-decision-list">
            {project.techDecisions.map((techDecision) => (
              <article className="tech-decision" key={techDecision.name}>
                <strong>{techDecision.name}</strong>
                <p>{techDecision.reason}</p>
              </article>
            ))}
          </div>
          <p className="stack-caption">전체 스택</p>
          <div className="tech-stack">
            {project.techStack.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
        </div>
      </section>

      {project.architectureDiagrams?.length ? (
        <CollapsibleSection
          key={`${project.id}-architecture`}
          eyebrow="Architecture"
          title="아키텍처"
          description="공개 가능한 수준으로 재구성한 애플리케이션 구조와 배포 구조를 정리했습니다."
        >
          {project.architectureDiagrams.map((diagram) => (
            <ArchitectureMap diagram={diagram} key={diagram.title} />
          ))}
        </CollapsibleSection>
      ) : null}

      {project.schemaGroups ? (
        <CollapsibleSection
          key={`${project.id}-schema`}
          eyebrow="Data Model"
          title="데이터 스키마 요약"
          description="전체 ERD를 그대로 노출하지 않고, 서비스 흐름을 이해하는 데 필요한 도메인 경계와 핵심 엔티티 관계만 정리했습니다."
        >
          <SchemaExplorer groups={project.schemaGroups} />
        </CollapsibleSection>
      ) : null}

      {project.flows?.length ? (
        <CollapsibleSection
          key={`${project.id}-flows`}
          eyebrow="Flow"
          title="외부 연동/서비스 플로우"
          description="결제, POS, 실시간 운송처럼 상태 전이가 중요한 흐름을 단계별로 정리했습니다."
        >
          {project.flows.map((flow) => (
            <FlowSteps flow={flow} key={flow.title} />
          ))}
        </CollapsibleSection>
      ) : null}

      {project.timeline ? <Timeline items={project.timeline} /> : null}

      <section className="project-section" aria-labelledby={`${project.id}-cases`}>
        <div className="section-heading">
          <p className="eyebrow">Key Points</p>
          <h3 id={`${project.id}-cases`}>프로젝트 수행 시 고민했던 부분</h3>
          <p>구현 과정에서 마주한 문제와 접근 방식, 운영 관점에서 남긴 개선 포인트를 정리했습니다.</p>
        </div>
        <div className="case-grid">
          {project.caseStudies.map((caseStudy) => (
            <article className="case-card" key={caseStudy.title}>
              <div className="case-card-icon">
                {project.id === 'kokkok' ? <Layers size={18} /> : null}
                {project.id === 'move' ? <Server size={18} /> : null}
                {project.id === 'express' ? <GitPullRequest size={18} /> : null}
              </div>
              <h4>{caseStudy.title}</h4>
              <dl>
                <div>
                  <dt>문제</dt>
                  <dd>{caseStudy.problem}</dd>
                </div>
                <div>
                  <dt>접근</dt>
                  <dd>{caseStudy.approach}</dd>
                </div>
                <div>
                  <dt>결과</dt>
                  <dd>{caseStudy.result}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </section>
    </article>
  )
}
