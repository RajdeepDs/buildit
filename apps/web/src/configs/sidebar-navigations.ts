export const getNavigations = (slug: string) => {
  return [
    {
      name: "My issues",
      icon: "issues",
      href: `/${slug}/my-issues`,
    },
    {
      name: "Projects",
      icon: "hexagon",
      href: `/${slug}/projects`,
    },
    {
      name: "Teams",
      icon: "team",
      href: `/${slug}/teams`,
    },
  ];
};

export const getTeamsNavigations = (slug: string, teamId: string) => {
  return [
    {
      name: "Active issues",
      icon: "issues",
      href: `/${slug}/team/${teamId}/active`,
    },
    {
      name: "Backlog issues",
      icon: "backlog",
      href: `/${slug}/team/${teamId}/backlog`,
    },
    {
      name: "Projects",
      icon: "hexagon",
      href: `/${slug}/team/${teamId}/projects`,
    },
  ];
};

export const getFooterNavigations = (slug: string) => {
  return [
    {
      name: "Invite people",
      icon: "plus",
      href: "/invite",
    },
    {
      name: "Settings",
      icon: "settings",
      href: `/${slug}/settings`,
    },
    {
      name: "Github",
      icon: "github",
      href: "https://github.com/RajdeepDs/buildit",
    },
    {
      name: "Documentations",
      icon: "book",
      href: "",
    },
  ];
};
