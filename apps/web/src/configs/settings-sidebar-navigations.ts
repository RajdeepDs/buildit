type TTeam = {
  teamId: string;
  name: string;
};

export const getSettingsSidebar = (slug: string) => [
  {
    title: "User",
    items: [
      {
        title: "Profile",
        href: `/${slug}/settings`,
      },
      {
        title: "General",
        href: `/${slug}/settings/general`,
      },
      {
        title: "Members",
        href: `/${slug}/settings/members`,
      },
      {
        title: "Appearance",
        href: `/${slug}/settings/appearance`,
      },
    ],
  },
  {
    title: "Security",
    icon: "lock",
    items: [
      {
        title: "Sessions",
        href: `/${slug}/settings/sessions`,
      },
      {
        title: "Password",
        href: `/${slug}/settings/password`,
      },
      {
        title: "Two factor auth",
        href: `/${slug}/settings/two-factor-auth`,
      },
    ],
  },
];

export const getSettingsTeamsNavigations = (slug: string, teams: TTeam[]) => [
  {
    title: "Teams",
    icon: "users",
    items: [
      ...teams.map((team) => ({
        title: team?.name,
        icon: "home",
        button: false,
        subItems: [
          {
            title: "General",
            href: `/${slug}/settings/teams/${team.teamId}`,
          },
          {
            title: "Members",
            href: `/${slug}/settings/team/${team.teamId}/members`,
          },
        ],
      })),
    ],
  },
];
