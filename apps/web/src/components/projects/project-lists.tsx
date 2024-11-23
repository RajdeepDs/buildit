'use client'

import { useMemo } from 'react'

import type { FilterQuery } from '@/lib/store/filter-store'
import type { TProject } from '@buildit/utils/types'

import ProjectCard from '@/components/projects/project-card'
import ProjectGroup from '@/components/projects/project-group'
import ProjectItem from '@/components/projects/project-item'
import EmptyState from '@/components/ui/empty-state'
import { useFilterStore } from '@/hooks/store'

interface FilterDetail {
  key: string
  operator: string
  value: string | null
}

const traverseFilterQuery = (query: FilterQuery): FilterDetail[] => {
  const result: FilterDetail[] = []

  if (!query || typeof query !== 'object') return result

  Object.entries(query).forEach(([key, value]) => {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      // This is a FilterCondition object
      Object.entries(value).forEach(([operator, conditionValue]) => {
        result.push({ key, operator, value: conditionValue })
      })
    } else if (typeof value === 'object') {
      result.push(...traverseFilterQuery(value as FilterQuery))
    }
  })

  return result
}

const applyFilterCondition = (
  project: TProject,
  filter: FilterDetail,
): boolean => {
  const { key, operator, value } = filter
  switch (key) {
    case 'team':
      return project.teamId === String(value)
    case 'lead': {
      if (operator === 'in' && Array.isArray(value)) {
        return (
          value.includes(project.leadId) ||
          (value.includes(null) && project.leadId === null)
        )
      }
      if (value === null || value === 'null') {
        return project.leadId === null
      }
      return project.leadId === String(value)
    }
    default:
      switch (operator) {
        case 'eq':
          return project[key] === value
        case 'in':
          return Array.isArray(value) && value.includes(project[key])
        default:
          return true
      }
  }
}

/**
 * The project lists component. Lists all the projects.
 * @param props The props for the component.
 * @param props.projects The list of all projects.
 * @returns React.FC component.
 */
export default function ProjectLists({
  projects,
}: {
  projects: TProject[] | undefined
}): JSX.Element {
  const { and, groupBy } = useFilterStore()

  const filteredAndGroupedProjects = useMemo(() => {
    if (!projects) return { '': [] }

    // Apply filters
    const filtered =
      and.length === 0
        ? projects
        : projects.filter((project) =>
            and.every((filterQuery) =>
              traverseFilterQuery(filterQuery).every((filter) =>
                applyFilterCondition(project, filter),
              ),
            ),
          )

    // Group filtered projects
    if (groupBy === 'No Grouping') return { '': filtered }

    return filtered.reduce<Record<string, TProject[]>>((groups, project) => {
      const groupKey =
        (project[groupBy as keyof TProject] as string) || 'Uncategorized'
      if (!groups[groupKey]) groups[groupKey] = []
      groups[groupKey].push(project)
      return groups
    }, {})
  }, [projects, and, groupBy])

  if (Object.values(filteredAndGroupedProjects).flat().length === 0) {
    return <EmptyState id='projects' />
  }

  return (
    <>
      {Object.entries(filteredAndGroupedProjects).map(([group, projects]) => (
        <ul key={group}>
          <ProjectGroup group={group} count={projects.length} />{' '}
          {projects.map((project, index) => (
            <ProjectItem project={project} key={project.id}>
              <ProjectCard
                project={project}
                isFirst={index === 0}
                isLast={index === projects.length - 1}
              />
            </ProjectItem>
          ))}
        </ul>
      ))}
    </>
  )
}
