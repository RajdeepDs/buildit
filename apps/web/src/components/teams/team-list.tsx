'use client'

import type { TTeam } from '@buildit/utils/types'

import TeamItem from '@/components/teams/team-item'

/**
 * The team list component. Lists all the teams.
 * @param props The team list props.
 * @param props.teams The teams to list.
 * @returns JSX.Element
 */
export default function TeamList({
  teams,
}: {
  teams: TTeam[] | undefined
}): JSX.Element {
  return <>{teams?.map((team) => <TeamItem key={team.id} team={team} />)}</>
}
