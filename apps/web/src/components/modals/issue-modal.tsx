import { Badge } from '@buildit/ui/badge'
import { Button } from '@buildit/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@buildit/ui/dialog'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider,
} from '@buildit/ui/sidebar'

import ComboBoxSelect from '@/components/ui/combo-box-select'
import { Icons } from '@/components/ui/icons'
import { useAssigneeOptions } from '@/configs/filter/filter-settings'
import { priorityConfig, statusConfig } from '@/configs/filter/issues-config'

export const IssueModal = ({ children }: { children: React.ReactNode }) => {
  const assigneeOptions = useAssigneeOptions()
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className='max-w-4xl p-3 max-h-[500px] overflow-hidden'>
        <DialogHeader>
          <DialogTitle className='text-base text-surface flex items-center gap-2'>
            <Badge className='size-6 p-0 bg-soft items-center justify-center'>
              <Icons.newIssue className='size-4 text-surface' />
            </Badge>
            Create issue
          </DialogTitle>
          <DialogDescription className='sr-only'>
            Create a new issue with all the necessary details
          </DialogDescription>
        </DialogHeader>
        <div className='flex w-full'>
          <div className='flex flex-1 p-2'>Hello</div>
          <SidebarProvider className='w-1/4 min-h-3/4 ml-auto'>
            <Sidebar collapsible='none' className='h-fit'>
              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupLabel>Properties</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem className='w-full'>
                        <ComboBoxSelect
                          property='Status'
                          options={statusConfig}
                        />
                      </SidebarMenuItem>
                      <SidebarMenuItem className='w-full'>
                        <ComboBoxSelect
                          property='Priority'
                          options={priorityConfig}
                        />
                      </SidebarMenuItem>
                      <SidebarMenuItem className='w-full'>
                        <ComboBoxSelect
                          property='Assignee'
                          options={assigneeOptions}
                        />
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </SidebarContent>
            </Sidebar>
          </SidebarProvider>
        </div>
        <DialogFooter>
          <Button size={'sm'}>Create issue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
