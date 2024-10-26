import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@buildit/ui/select'

import SubHeader from '@/components/settings/sub-header'

/**
 * The preferences component. This component is used to display the user's preferences.
 * @returns The preferences component.
 */
export default function Preferences(): JSX.Element {
  return (
    <div className='flex flex-col space-y-4'>
      <SubHeader
        title='Appearance'
        description='Select or customize your interface.'
      >
        <Select>
          <SelectTrigger className='w-[180px] h-8'>
            <SelectValue placeholder='System settings' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='system'>System settings</SelectItem>
            <SelectItem value='light'>Light</SelectItem>
          </SelectContent>
        </Select>
      </SubHeader>
    </div>
  )
}
