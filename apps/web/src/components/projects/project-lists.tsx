import ProjectItem from '@/components/projects/project-item'
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
        <div className='flex h-1/2 w-full flex-col items-center justify-center space-y-4 rounded-lg'>
          <div className='flex flex-col items-center'>
            <h1 className='font-cal text-strong text-xl'>No project found</h1>
            <p className='text-sm text-sub'>
              There aren&apos;t any project at the moment!{' '}
            </p>
          </div>
        </div>
      ) : (
        <ul>
          {projects?.map((project) => (
            <li key={project.id}>
              <ProjectItem project={project} />{' '}
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
