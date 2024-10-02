import { useMemo } from 'react'

import type { Navigation } from '@/configs/layout-navigations'

import {
  getNavigations,
  getTeamNavigations,
} from '@/configs/layout-navigations'

interface NavigationResult {
  currentNavigation: Navigation | undefined
  isTeamPage: boolean
}

/**
 * Use navigation Hook - optimized.
 * Determines the current navigation based on the pathname.
 * @param pathname - The current pathname.
 * @returns The current navigation and whether the user is on a team page.
 */
export const useNavigation = (pathname: string): NavigationResult => {
  const teamId = useMemo(() => pathname.split('/')[2], [pathname])

  return useMemo(() => {
    if (teamId) {
      const teamNavigations = getTeamNavigations({ teamId })
      const currentNavigation = teamNavigations.find(
        (nav) => nav.href === pathname,
      )
      return { currentNavigation, isTeamPage: true }
    }

    const defaultNavigations = getNavigations()
    const currentNavigation = defaultNavigations.find(
      (nav) => nav.href === pathname,
    )
    return { currentNavigation, isTeamPage: false }
  }, [pathname, teamId])
}
