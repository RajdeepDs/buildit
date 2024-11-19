import Link from 'next/link'

import type { TTeam } from '@buildit/utils/types'

import { Avatar, AvatarFallback, AvatarImage } from '@buildit/ui/avatar'
import { Badge } from '@buildit/ui/badge'
import { cn } from '@buildit/ui/cn'
import { Tooltip, TooltipContent, TooltipTrigger } from '@buildit/ui/tooltip'

import { Icons } from '@/components/ui/icons'
import { formatDate, formatDateTime } from '@/lib/date'

interface TeamCardProps {
  team: Omit<TTeam, 'issues'>
  isFirst: boolean
  isLast: boolean
}
/**
 * The team card component. Displays a single team.
 * @param props TeamCardProps
 * @param props.team The team object.
 * @param props.isFirst Whether the team is the first in the list.
 * @param props.isLast Whether the team is the last in the list.
 * @returns JSX.Element
 */
export default function TeamCard({
  team,
  isFirst,
  isLast,
}: TeamCardProps): JSX.Element {
  const updatedAt = team.updatedAt ? formatDate(team.updatedAt) : undefined
  const createdAt = team.createdAt ? formatDate(team.createdAt) : undefined

  const updatedAtTime = team.updatedAt
    ? formatDateTime(team.updatedAt)
    : undefined
  const createdAtTime = team.createdAt
    ? formatDateTime(team.createdAt)
    : undefined

  return (
    <Link href={`team/${team.teamId}/active`} passHref legacyBehavior>
      <div
        className={cn(
          'flex items-center border-x p-3 bg-white hover:bg-weak/50 transition-colors duration-200',
          isFirst && 'rounded-t-lg border-t',
          isLast ? 'rounded-b-lg border-b mb-2' : 'border-b',
        )}
        role='listitem'
      >
        <div className='flex items-center space-x-4 w-full'>
          <Icons.team className='size-4 text-sub' />
          <div className='flex items-center gap-2 flex-grow select-none'>
            <span className='text-sm font-medium'>{team.name}</span>
            <Tooltip>
              <TooltipTrigger className='text-xs'>
                <Badge className='text-sub font-medium'>{team.teamId}</Badge>
              </TooltipTrigger>
              <TooltipContent>Team ID</TooltipContent>
            </Tooltip>
          </div>
          <div className='ml-auto flex items-center space-x-4 flex-shrink-0'>
            <Tooltip>
              <TooltipTrigger className='text-soft text-xs whitespace-nowrap select-none'>
                <span>{updatedAt}</span>
              </TooltipTrigger>
              <TooltipContent>{`Updated ${updatedAtTime}`}</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger className='text-soft text-xs whitespace-nowrap select-none'>
                <span>{createdAt}</span>
              </TooltipTrigger>
              <TooltipContent align='end'>{`Created ${createdAtTime}`}</TooltipContent>
            </Tooltip>
            <Tooltip>
              {team.admin && team.user && (
                <>
                  <TooltipTrigger>
                    <Avatar className='size-5'>
                      <AvatarImage
                        src={team.user.image ?? ''}
                        alt={team.user.name ?? ''}
                      />
                      <AvatarFallback>
                        {team.user.name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </TooltipTrigger>
                  <TooltipContent align='end'>
                    Admin: {team.user.name}
                  </TooltipContent>
                </>
              )}
            </Tooltip>
          </div>
        </div>
      </div>
    </Link>
  )
}
