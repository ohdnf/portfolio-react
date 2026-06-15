export type ProjectId = 'kokkok' | 'move' | 'express'

export type MetricTone = 'blue' | 'teal' | 'amber' | 'slate'

export interface Metric {
  label: string
  value: string
  caption: string
  tone?: MetricTone
}

export interface Profile {
  name: string
  title: string
  summary: string
  focus: string[]
  principles: string[]
  metrics: Metric[]
}

export interface ArchitectureGroup {
  id: string
  label: string
  x: number
  y: number
  width: number
  height: number
}

export interface ArchitectureNode {
  id: string
  label: string
  detail?: string
  x: number
  y: number
  width?: number
  height?: number
  tone?: MetricTone
}

export interface ArchitectureEdge {
  from: string
  to: string
  label?: string
}

export interface ArchitectureDiagram {
  title: string
  description: string
  groups: ArchitectureGroup[]
  nodes: ArchitectureNode[]
  edges: ArchitectureEdge[]
}

export interface SchemaEntity {
  name: string
  fields: string[]
  note?: string
}

export interface SchemaGroup {
  domain: string
  description: string
  entities: SchemaEntity[]
  relationships: string[]
}

export interface FlowStep {
  title: string
  actor: string
  detail: string
}

export interface FlowDiagram {
  title: string
  description: string
  steps: FlowStep[]
}

export interface TimelineItem {
  title: string
  period: string
  detail: string
  result: string
}

export interface CaseStudy {
  title: string
  problem: string
  approach: string
  result: string
}

export interface Project {
  id: ProjectId
  name: string
  period: string
  role: string
  serviceUrl?: string
  summary: string
  metrics: Metric[]
  responsibilities: string[]
  techStack: string[]
  caseStudies: CaseStudy[]
  architectureDiagrams?: ArchitectureDiagram[]
  schemaGroups?: SchemaGroup[]
  flows?: FlowDiagram[]
  timeline?: TimelineItem[]
}
