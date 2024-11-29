import { cn } from '@buildit/ui/cn'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@buildit/ui/select'

import { useTeamsOptions } from '@/configs/filter/filter-settings'

const Square = ({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) => (
  <span
    data-square
    className={cn(
      'flex size-5 items-center justify-center rounded bg-muted text-xs font-medium text-muted-foreground',
      className,
    )}
    aria-hidden='true'
  >
    {children}
  </span>
)

/**
 * The Team select component is used to select a team member from a list of options.
 * It displays a placeholder avatar and the name of the team member.
 * @returns The Team select component.
 */
export default function TeamSelect() {
  const teams = useTeamsOptions()
  return (
    <div className='space-y-2 max-w-32'>
      <Select defaultValue={teams[0]?.value ?? ''}>
        <SelectTrigger
          id='team-select'
          className='ps-2 [&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_[data-square]]:shrink-0'
        >
          <SelectValue placeholder='Select team' />
        </SelectTrigger>
        <SelectContent className='[&_*[role=option]>span]:end-2 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2 [&_*[role=option]]:pe-8 [&_*[role=option]]:ps-2'>
          <SelectGroup>
            <SelectLabel className='ps-2 text-xs text-sub'>
              Your teams
            </SelectLabel>
            {teams.map((team) => (
              <SelectItem key={team.value} value={team.value}>
                <Square className='bg-indigo-400/20 text-indigo-500'>
                  {team.label[0]}
                </Square>
                <span className='truncate'>{team.label}</span>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
