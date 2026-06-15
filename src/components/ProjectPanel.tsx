import { CheckCircle2, ExternalLink, GitPullRequest, Layers, Server } from 'lucide-react'
import type { Project } from '../types'
import { ArchitectureMap } from './ArchitectureMap'
import { FlowSteps } from './FlowSteps'
import { MetricStrip } from './MetricStrip'
import { SchemaExplorer } from './SchemaExplorer'
import { Timeline } from './Timeline'

interface ProjectPanelProps {
  project: Project
}

export function ProjectPanel({ project }: ProjectPanelProps) {
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

      <MetricStrip metrics={project.metrics} />

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
            <h3>기술 스택</h3>
          </div>
          <div className="tech-stack">
            {project.techStack.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
        </div>
      </section>

      {project.architectureDiagrams?.map((diagram) => <ArchitectureMap diagram={diagram} key={diagram.title} />)}

      {project.schemaGroups ? <SchemaExplorer groups={project.schemaGroups} /> : null}

      {project.flows?.map((flow) => <FlowSteps flow={flow} key={flow.title} />)}

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
