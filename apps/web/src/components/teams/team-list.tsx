'use client'

import { api } from '@/lib/trpc/react'

import TeamItem from './team-item'

/**
 * The team list component. Lists all the teams.
 * @returns JSX.Element
 */
export default function TeamList(): JSX.Element {
  const { data: allTeams } = api.team.get_teams.useQuery()
  return (
    <div>{allTeams?.map((team) => <TeamItem key={team.id} team={team} />)}</div>
  )
}
