import { useMemo, useState } from 'react'
import { Activity, Braces, Cloud, Database, MessageCircle, Moon, Sun } from 'lucide-react'
import './App.css'
import { ProjectPanel } from './components/ProjectPanel'
import { ProjectTabs } from './components/ProjectTabs'
import { profile, projects } from './data/portfolio'
import type { ProjectId } from './types'

const capabilityIcons = [Braces, Database, Activity, Cloud, MessageCircle]

function GitHubIcon() {
  return (
    <svg className="github-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M12 2C6.48 2 2 6.58 2 12.26c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-.88-.01-1.73-2.78.62-3.37-1.38-3.37-1.38-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.36 1.12 2.93.86.09-.67.35-1.12.63-1.38-2.22-.26-4.55-1.14-4.55-5.07 0-1.12.39-2.04 1.03-2.76-.1-.26-.45-1.31.1-2.72 0 0 .84-.28 2.75 1.05A9.3 9.3 0 0 1 12 6.98c.85 0 1.7.12 2.5.34 1.9-1.33 2.74-1.05 2.74-1.05.55 1.41.2 2.46.1 2.72.64.72 1.03 1.64 1.03 2.76 0 3.94-2.34 4.81-4.57 5.06.36.32.68.95.68 1.92 0 1.38-.01 2.5-.01 2.84 0 .27.18.59.69.49A10.22 10.22 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z"
      />
    </svg>
  )
}

function App() {
  const [activeProjectId, setActiveProjectId] = useState<ProjectId>('kokkok')
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const activeProject = useMemo(
    () => projects.find((project) => project.id === activeProjectId) ?? projects[0],
    [activeProjectId],
  )
  const titleLines = profile.title.split(' / ')
  const isDark = theme === 'dark'

  return (
    <main className="portfolio-shell" data-theme={theme}>
      <nav className="top-nav" aria-label="포트폴리오 섹션">
        <span className="nav-title">Portfolio</span>
        <div className="nav-links">
          <a href="#principles">Working Style</a>
          <a href="#projects">Projects</a>
          <button
            className="theme-toggle"
            type="button"
            onClick={() => setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'))}
            aria-label={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
            aria-pressed={isDark}
          >
            {isDark ? <Sun size={19} aria-hidden="true" /> : <Moon size={19} aria-hidden="true" />}
          </button>
          <a className="nav-icon-link" href="https://github.com/jupyohong" target="_blank" rel="noreferrer" aria-label="GitHub 프로필 열기">
            <GitHubIcon />
          </a>
        </div>
      </nav>

      <section className="summary-dashboard" id="summary" aria-labelledby="profile-title">
        <div className="summary-copy">
          <p className="eyebrow">Introduce</p>
          <h1 id="profile-title" aria-label={profile.title}>
            {titleLines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h1>
          <p>{profile.summary}</p>
        </div>
        <div className="summary-focus" aria-label="핵심 역량">
          {profile.focus.map((focus, index) => {
            const Icon = capabilityIcons[index % capabilityIcons.length]

            return (
              <div className="focus-item" key={focus}>
                <Icon size={19} aria-hidden="true" />
                <span>{focus}</span>
              </div>
            )
          })}
        </div>
      </section>

      <section className="principles-band" id="principles" aria-labelledby="principles-title">
        <div className="section-heading">
          <p className="eyebrow">Working Style</p>
          <h2 id="principles-title">업무 방식과 지향점</h2>
        </div>
        <div className="principle-list">
          {profile.principles.map((principle) => (
            <article key={principle}>
              <p>{principle}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="project-area" id="projects" aria-labelledby="projects-title">
        <div className="section-heading project-heading">
          <p className="eyebrow">Projects</p>
          <h2 id="projects-title">서비스 구조와 운영 사례</h2>
          <p>
            프로젝트별로 서비스 규모, 백엔드 역할, 아키텍처, 데이터 모델, 외부 연동 사례를 분리해 확인할 수 있습니다.
          </p>
        </div>
        <ProjectTabs projects={projects} activeProjectId={activeProjectId} onChange={setActiveProjectId} />
        <ProjectPanel project={activeProject} />
      </section>

      <footer className="site-footer" aria-label="Copyright">
        <p>© 2026 Jupyo Hong. Backend Portfolio.</p>
        <a href="#summary">Back to top</a>
      </footer>
    </main>
  )
}

export default App
