'use client'

import { toast } from '@buildit/ui/toast'

import TeamItem from '@/components/teams/team-item'
import EmptyState from '@/components/ui/empty-state'
import { api } from '@/lib/trpc/react'

/**
 * The team list component. Lists all the teams.
 * @returns JSX.Element
 */
export default function TeamList(): JSX.Element {
  const { data: allTeams, error } = api.team.get_teams.useQuery()

  if (allTeams?.length === 0) {
    return <EmptyState id='teams' />
  }

  if (error) {
    toast({
      title: 'Error',
      description: 'Failed to fetch teams',
      variant: 'destructive',
    })
  }
  return (
    <div>{allTeams?.map((team) => <TeamItem key={team.id} team={team} />)}</div>
  )
}
