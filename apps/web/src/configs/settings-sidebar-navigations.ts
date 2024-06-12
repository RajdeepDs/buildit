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
  {
    title: "Teams",
    icon: "users",
    items: [
      {
        title: "TeamName",
        icon: "home",
        button: false,
        subItems: [
          {
            title: "General",
            href: `/${slug}/settings/team/general`,
          },
          {
            title: "Members",
            href: `/${slug}/settings/team/members`,
          },
        ],
      },
      {
        title: "Add team",
        icon: "plus",
        button: true,
      },
    ],
  },
];
