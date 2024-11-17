import ProjectCard from '@/components/projects/project-card'
import ProjectItem from '@/components/projects/project-item'
import EmptyState from '@/components/ui/empty-state'
import { api } from '@/lib/trpc/react'

/**
 * The project lists component. Lists all the projects.
 * @returns React.FC component.
 */
export default function ProjectLists() {
  const { data: projects } = api.project.get_projects.useQuery()

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
