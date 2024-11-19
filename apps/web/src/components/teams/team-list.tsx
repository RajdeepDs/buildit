'use client'

import type { TTeam } from '@buildit/utils/types'

import TeamCard from '@/components/teams/team-card'
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
  return (
    <>
      {teams?.map((team, index) => (
        <TeamItem key={team.id} team={team}>
          <TeamCard
            team={team}
            isFirst={index === 0}
            isLast={index === teams.length - 1}
          />
        </TeamItem>
      ))}
    </>
  )
}
