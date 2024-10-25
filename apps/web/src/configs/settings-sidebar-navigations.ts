interface TTeam {
  teamId: string
  name: string
}

export const getSettingsMyAccount = () => {
  return [
    {
      title: 'Profile',
      icon: 'userCircle2',
    },
    {
      title: 'Preferences',
      icon: 'sliders',
    },
    {
      title: 'Security',
      icon: 'lock',
    },
  ]
}

export const getSettingsWorkspace = () => {
  return [
    {
      title: 'General',
      icon: 'home',
    },
    {
      title: 'Members',
      icon: 'team',
    },
    {
      title: 'Upgrade plan',
      icon: 'inProgress',
    },
  ]
}

export const getSettingsTeamsNavigations = (teams: TTeam[]) => [
  {
    title: 'Teams',
    icon: 'users',
    items: [
      ...teams.map((team) => ({
        title: team.name,
        icon: 'home',
        button: false,
        subItems: [
          {
            title: 'General',
            href: `/settings/teams/${team.teamId}`,
          },
          {
            title: 'Members',
            href: `/settings/teams/${team.teamId}/members`,
          },
        ],
      })),
    ],
  },
]
