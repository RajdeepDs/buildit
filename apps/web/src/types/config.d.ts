export type Status = {
  value: string;
  label: string;
  icon: string;
};

export type Priority = {
  value: string;
  label: string;
  icon: string;
};

export type FilterSettings = {
  value: string;
  label: string;
};

export type TSettingsSidebar = {
  title: string;
  icon?: string;
  items: {
    title: string;
    href?: string;
    icon?: string;
    button?: boolean;
    subItems?: {
      title: string;
      href: string;
    }[];
  }[];
}[];
