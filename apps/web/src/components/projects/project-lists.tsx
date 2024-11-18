import { useMemo } from 'react'

import type { TProject } from '@buildit/utils/types'

import ProjectCard from '@/components/projects/project-card'
import ProjectGroup from '@/components/projects/project-group'
import ProjectItem from '@/components/projects/project-item'
import EmptyState from '@/components/ui/empty-state'
import { useFilterStore } from '@/hooks/store'

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
  const { groupBy } = useFilterStore()

  const filteredAndGroupedProjects = useMemo(() => {
    if (!projects) return { '': [] }

    // TODO: Implement the filter logic

    if (groupBy === 'No Grouping') return { '': projects }

    return projects.reduce<Record<string, TProject[]>>((groups, project) => {
      const groupKey =
        (project[groupBy as keyof TProject] as string) || 'Uncategorized'
      if (!groups[groupKey]) groups[groupKey] = []
      groups[groupKey].push(project)
      return groups
    }, {})
  }, [projects, groupBy])

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
