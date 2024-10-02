export interface Navigation {
  name: string
  icon: string
  href: string
}

export const getNavigations = (): Navigation[] => {
  return [
    {
      name: 'My issues',
      icon: 'issues',
      href: `/`,
    },
    {
      name: 'Projects',
      icon: 'hexagon',
      href: `/projects`,
    },
    {
      name: 'Teams',
      icon: 'team',
      href: `/teams`,
    },
  ]
}

export const getTeamNavigations = ({
  teamId,
}: {
  teamId: string
}): Navigation[] => {
  return [
    {
      name: 'Active issues',
      icon: 'issues',
      href: `/team/${teamId}/active`,
    },
    {
      name: 'Backlog issues',
      icon: 'backlog',
      href: `/team/${teamId}/backlog`,
    },
    {
      name: 'Projects',
      icon: 'projects',
      href: `/team/${teamId}/projects`,
    },
  ]
}
