import { Route, Smartphone, Truck } from 'lucide-react'
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
  return (
    <div className="project-tabs" role="tablist" aria-label="프로젝트 선택">
      {projects.map((project) => {
        const Icon = projectIcons[project.id]
        const isActive = project.id === activeProjectId

        return (
          <button
            type="button"
            role="tab"
            aria-selected={isActive}
            className={isActive ? 'active' : ''}
            onClick={() => onChange(project.id)}
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
