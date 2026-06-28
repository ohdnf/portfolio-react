import { type KeyboardEvent, useRef } from 'react'
import { Route, Smartphone, Truck } from 'lucide-react'
import { getProjectPanelId, getProjectTabId } from '../projectA11y'
import type { Project, ProjectId } from '../types'

interface ProjectTabsProps {
  projects: Project[]
  activeProjectId: ProjectId
  onChange: (projectId: ProjectId) => void
}

const projectIcons = {
  kokkok: Smartphone,
  move: Route,
  express: Truck,
}

export function ProjectTabs({ projects, activeProjectId, onChange }: ProjectTabsProps) {
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({})

  function focusProject(projectId: ProjectId) {
    tabRefs.current[projectId]?.focus()
  }

  function selectProject(projectId: ProjectId) {
    onChange(projectId)
    window.requestAnimationFrame(() => focusProject(projectId))
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, currentIndex: number) {
    const lastIndex = projects.length - 1
    let nextIndex: number | null = null

    if (event.key === 'ArrowRight') {
      nextIndex = currentIndex === lastIndex ? 0 : currentIndex + 1
    }

    if (event.key === 'ArrowLeft') {
      nextIndex = currentIndex === 0 ? lastIndex : currentIndex - 1
    }

    if (event.key === 'Home') {
      nextIndex = 0
    }

    if (event.key === 'End') {
      nextIndex = lastIndex
    }

    if (nextIndex === null) {
      return
    }

    event.preventDefault()
    selectProject(projects[nextIndex].id)
  }

  return (
    <div className="project-tabs" role="tablist" aria-label="프로젝트 선택">
      {projects.map((project, index) => {
        const Icon = projectIcons[project.id]
        const isActive = project.id === activeProjectId

        return (
          <button
            type="button"
            role="tab"
            id={getProjectTabId(project.id)}
            aria-controls={getProjectPanelId(project.id)}
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            className={isActive ? 'active' : ''}
            onClick={() => onChange(project.id)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            ref={(element) => {
              tabRefs.current[project.id] = element
            }}
            key={project.id}
          >
            <Icon size={18} aria-hidden="true" />
            <span>{project.name}</span>
          </button>
        )
      })}
    </div>
  )
}
