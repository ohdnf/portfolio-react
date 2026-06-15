import { useId } from 'react'
import type { ArchitectureDiagram, ArchitectureNode } from '../types'

interface ArchitectureMapProps {
  diagram: ArchitectureDiagram
}

const nodeDefaults = {
  width: 104,
  height: 50,
}

function centerOf(node: ArchitectureNode) {
  return {
    x: node.x + (node.width ?? nodeDefaults.width) / 2,
    y: node.y + (node.height ?? nodeDefaults.height) / 2,
  }
}

function wrapLabel(label: string) {
  return label.split('\n')
}

function wrapDetail(detail: string) {
  if (!detail.includes(' / ')) {
    return [detail]
  }

  const parts = detail.split(' / ')
  const midpoint = Math.ceil(parts.length / 2)

  return [parts.slice(0, midpoint).join(' / '), parts.slice(midpoint).join(' / ')].filter(Boolean)
}

export function ArchitectureMap({ diagram }: ArchitectureMapProps) {
  const titleId = useId()
  const markerId = useId()
  const nodesById = new Map(diagram.nodes.map((node) => [node.id, node]))

  return (
    <section className="visual-section" aria-labelledby={titleId}>
      <div className="section-heading">
        <p className="eyebrow">Architecture</p>
        <h3 id={titleId}>{diagram.title}</h3>
        <p>{diagram.description}</p>
      </div>

      <div className="architecture-frame">
        <svg className="architecture-map" viewBox="0 0 960 460" role="img" aria-label={diagram.title}>
          <defs>
            <marker id={markerId} markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" className="edge-arrow" />
            </marker>
          </defs>

          {diagram.groups.map((group) => (
            <g className="arch-group" key={group.id}>
              <rect x={group.x} y={group.y} width={group.width} height={group.height} rx="8" />
              <text x={group.x + 16} y={group.y + 28}>
                {group.label}
              </text>
            </g>
          ))}

          {diagram.edges.map((edge) => {
            const from = nodesById.get(edge.from)
            const to = nodesById.get(edge.to)

            if (!from || !to) {
              return null
            }

            const start = centerOf(from)
            const end = centerOf(to)
            const controlGap = Math.max(56, Math.abs(end.x - start.x) / 2)
            const path = `M ${start.x} ${start.y} C ${start.x + controlGap} ${start.y}, ${end.x - controlGap} ${end.y}, ${end.x} ${end.y}`
            const labelX = (start.x + end.x) / 2
            const labelY = (start.y + end.y) / 2 - 8

            return (
              <g className="arch-edge" key={`${edge.from}-${edge.to}`}>
                <path d={path} markerEnd={`url(#${markerId})`} />
                {edge.label ? (
                  <text x={labelX} y={labelY}>
                    {edge.label}
                  </text>
                ) : null}
              </g>
            )
          })}

          {diagram.nodes.map((node) => {
            const width = node.width ?? nodeDefaults.width
            const height = node.height ?? nodeDefaults.height
            const labelLines = wrapLabel(node.label)
            const detailLines = node.detail ? wrapDetail(node.detail) : []
            const firstLineY = node.y + (node.detail ? 20 : height / 2 - (labelLines.length - 1) * 7)
            const firstDetailY = node.y + height - 10 - (detailLines.length - 1) * 11

            return (
              <g className={`arch-node tone-${node.tone ?? 'slate'}`} key={node.id}>
                <title>
                  {node.label.replace('\n', ' ')}
                  {node.detail ? ` - ${node.detail}` : ''}
                </title>
                <rect x={node.x} y={node.y} width={width} height={height} rx="8" />
                {labelLines.map((line, index) => (
                  <text className="node-label" x={node.x + width / 2} y={firstLineY + index * 15} key={`${line}-${index}`}>
                    {line}
                  </text>
                ))}
                {detailLines.map((line, index) => (
                  <text className="node-detail" x={node.x + width / 2} y={firstDetailY + index * 11} key={`${line}-${index}`}>
                    {line}
                  </text>
                ))}
              </g>
            )
          })}
        </svg>
      </div>
    </section>
  )
}
