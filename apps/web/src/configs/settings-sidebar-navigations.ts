interface TTeam {
  teamId: string
  name: string
}

export const getSettingsSidebar = () => [
  {
    title: 'User',
    items: [
      {
        title: 'Profile',
        href: `/settings`,
      },
      {
        title: 'General',
        href: `/settings/general`,
      },
      {
        title: 'Members',
        href: `/settings/members`,
      },
      // {
      //   title: "Appearance",
      //   href: `/settings/appearance`,
      // },
    ],
  },
  // {
  //   title: "Security",
  //   icon: "lock",
  //   items: [
  //     {
  //       title: "Sessions",
  //       href: `/settings/sessions`,
  //     },
  //   ],
  // },
]

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
