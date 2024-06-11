export const getNavigations = (slug: string) => {
  return [
    {
      name: "Inbox",
      icon: "inbox",
      href: `/${slug}/inbox`,
    },
    {
      name: "My issues",
      icon: "issues",
      href: `/${slug}/my-issues`,
    },
  ];
};

export const getSubNavigations = (slug: string) => {
  return [
    {
      name: "Issues",
      href: `/${slug}/issues`,
    },
    {
      name: "Projects",
      href: `/${slug}/projects`,
    },
    {
      name: "Team members",
      href: `/${slug}/team-members`,
    },
  ];
};

export const getFooterNavigations = (slug: string) => {
  return [
    {
      name: "Invite people",
      icon: "plus",
      href: "/invite",
      externalLink: false,
    },
    {
      name: "Settings",
      icon: "settings",
      href: `/${slug}/settings`,
      externalLink: false,
    },
    {
      name: "Github",
      icon: "github",
      href: "https://github.com/RajdeepDs/buildit",
      externalLink: true,
    },
    {
      name: "Documentations",
      icon: "book",
      href: "",
      externalLink: true,
    },
  ];
};
