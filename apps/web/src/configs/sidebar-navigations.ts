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

export const getTeamsNavigations = (slug: string) => {
  return [
    {
      name: "Active issues",
      href: `/${slug}/issues/active`,
    },
    {
      name: "Backlog issues",
      href: `/${slug}/issues/backlog`,
    },
    {
      name: "Projects",
      href: `/${slug}/projects`,
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
