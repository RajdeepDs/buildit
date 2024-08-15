export const getNavigations = () => {
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

export const getTeamsNavigations = (teamId: string) => {
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
      icon: 'hexagon',
      href: `/team/${teamId}/projects`,
    },
  ]
}
