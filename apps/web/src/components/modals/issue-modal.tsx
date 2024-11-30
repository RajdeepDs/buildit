import Editor from '@buildit/editor'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@buildit/ui/breadcrumb'
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
import { Input } from '@buildit/ui/input'
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
import LabelsSelect from '@/components/ui/labels-select'
import {
  useAssigneeOptions,
  useProjectOptions,
  useTeamsOptions,
} from '@/configs/filter/filter-settings'
import {
  labelConfig,
  priorityConfig,
  statusConfig,
} from '@/configs/filter/issues-config'

const defaultEditorValue = [
  {
    type: 'p',
    children: [
      {
        text: '',
      },
    ],
  },
]

export const IssueModal = ({ children }: { children: React.ReactNode }) => {
  const teamsOptions = useTeamsOptions()
  const assigneeOptions = useAssigneeOptions()
  const projectOptions = useProjectOptions()

  projectOptions.unshift({
    label: 'No project',
    value: 'no project',
    icon: 'hexagon',
  })
  const localValue =
    typeof window !== 'undefined' && localStorage.getItem('editorContent')
  const content = localValue ? JSON.parse(localValue) : defaultEditorValue
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className='max-w-4xl p-3 max-h-[500px] overflow-hidden gap-2'
        isClose={false}
      >
        <DialogHeader>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                {teamsOptions.length > 1 ? (
                  <ComboBoxSelect property='Teams' options={teamsOptions} />
                ) : (
                  <BreadcrumbItem>{teamsOptions[0]?.label}</BreadcrumbItem>
                )}
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>New issue</BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <DialogTitle className='sr-only'>Create a new issue</DialogTitle>
          <DialogDescription className='sr-only'>
            Create a new issue with all the necessary details
          </DialogDescription>
        </DialogHeader>
        <div className='flex w-full'>
          <div className='flex flex-col flex-1 gap-2'>
            <Input
              className='bg-white border-none shadow-none focus-visible:ring-0 focus:ring-offset-0 p-0 text-base'
              placeholder='Issue title'
            />
            <Editor
              content={content}
              onChange={(value) => {
                localStorage.setItem('editorContent', JSON.stringify(value))
              }}
            />
          </div>
          <SidebarProvider className='w-1/4 min-h-3/4 ml-auto'>
            <Sidebar collapsible='none' className='h-fit'>
              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupLabel className='text-sub h-[30px]'>
                    Properties
                  </SidebarGroupLabel>
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
                <SidebarGroup>
                  <SidebarGroupLabel className='text-sub h-[30px]'>
                    Labels
                  </SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem className='w-full'>
                        <LabelsSelect property='Label' options={labelConfig} />
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                  <SidebarGroupLabel className='text-sub h-[30px]'>
                    Project
                  </SidebarGroupLabel>
                  <SidebarGroupContent>
                    <ComboBoxSelect
                      property='Project'
                      options={projectOptions}
                    />
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
