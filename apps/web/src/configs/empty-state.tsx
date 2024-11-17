import type { TEmptyStateContent } from '@buildit/utils/types/configs'

import { Button } from '@buildit/ui/button'

import { NewIssueModal } from '@/components/modals/new-issue-modal'
import { NewProjectModal } from '@/components/modals/new-project-modal'
import { Icons } from '@/components/ui/icons'

export const emptyStateContent: TEmptyStateContent = {
  myIssues: {
    icon: 'issues',
    title: 'Nothing to see here!',
    description: `This is where you'll see all the issues assigned to you. As you take ownership of issues or collaborate with your team, they'll appear here, helping you stay organized and focused on what matters most. Start by exploring your projects or creating new issues to get things moving.`,
    primary: (
      <NewIssueModal>
        <Button
          size='sm'
          variant='default'
          className='h-8'
          aria-label='Create new issue'
        >
          <Icons.plus className='size-4 mr-2' />
          Create Issue
        </Button>
      </NewIssueModal>
    ),
  },
  projects: {
    icon: 'hexagon',
    title: 'No Projects Yet!',
    description: `Projects serve as the backbone of your work organization, enabling you to structure tasks, set milestones, and monitor progress effectively. By creating a project, you can centralize your team's efforts, ensure clear communication, and track outcomes seamlessly.`,
    primary: (
      <NewProjectModal>
        <Button variant={'default'} size={'sm'} className='h-7'>
          <Icons.plus className='size-4 mr-1' />
          Create project
        </Button>
      </NewProjectModal>
    ),
  },
  teams: {
    icon: 'team',
    title: 'No Teams Found',
    description:
      'Teams allow you to collaborate effectively. Create a new team to start assigning roles and tasks.',
    primary: (
      <Button variant={'default'} size={'sm'} className='h-7'>
        <Icons.plus className='size-4  mr-1' />
        Add team
      </Button>
    ),
  },
  // Add more entries as needed...
}
