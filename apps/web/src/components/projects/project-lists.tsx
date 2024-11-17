import type { TProject } from '@buildit/utils/types'

import ProjectCard from '@/components/projects/project-card'
import ProjectItem from '@/components/projects/project-item'
import EmptyState from '@/components/ui/empty-state'

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
  return (
    <>
      {projects?.length === 0 ? (
        <EmptyState id='projects' />
      ) : (
        <ul>
          {projects?.map((project, index) => (
            <ProjectItem project={project} key={project.id}>
              <ProjectCard
                project={project}
                isFirst={index === 0}
                isLast={index === projects.length - 1}
              />
            </ProjectItem>
          ))}
        </ul>
      )}
    </>
  )
}
