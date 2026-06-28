import type { ProjectId } from './types'

export function getProjectTabId(projectId: ProjectId) {
  return `project-tab-${projectId}`
}

export function getProjectPanelId(projectId: ProjectId) {
  return `project-panel-${projectId}`
}
