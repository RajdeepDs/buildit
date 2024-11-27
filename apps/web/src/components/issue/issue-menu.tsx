import { useRouter } from 'next/navigation'

import { Button } from '@buildit/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@buildit/ui/dropdown-menu'

import { Icons } from '@/components/ui/icons'
import { useDeleteIssue } from '@/hooks/mutations/use-delete-issue'

interface IssueMenuProps {
  id: string
}

/**
 * The IssueMenu component is the menu that is displayed on the issue page.
 * @param props The props for the IssueMenu component.
 * @param props.id The ID of the issue.
 * @returns JSX.Element
 */
export default function IssueMenu({ id }: IssueMenuProps) {
  const router = useRouter()

  const deleteMutation = useDeleteIssue()

  const handleDelete = () => {
    deleteMutation.mutate({ id: id })
    router.back()
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={'icon'} variant={'ghost'} className='size-7'>
          <Icons.horizontalMore className='size-4 text-sub' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem
          onClick={() => {
            handleDelete()
          }}
        >
          <Icons.trash2 className='size-4 text-sub' />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
