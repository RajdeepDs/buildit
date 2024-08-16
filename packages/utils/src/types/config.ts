export interface Status {
  value: string
  label: string
  icon: string
}

export interface Priority {
  value: string
  label: string
  icon: string
}

export interface FilterSettings {
  value: string
  label: string
}

export type TSettingsSidebar = {
  title: string
  icon?: string
  items: {
    title: string
    href?: string
    icon?: string
    button?: boolean
    subItems?: {
      title: string
      href: string
    }[]
  }[]
}[]
