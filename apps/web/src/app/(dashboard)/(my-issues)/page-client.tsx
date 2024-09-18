'use client'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@buildit/ui/breadcrumb'

import IssueList from '@/components/issues/issue-list'
import { Icons } from '@/components/ui/icons'
import SubHeader from '@/components/ui/sub-header'
import useMyIssuesStore from '@/lib/store/my-issues-store'

/**
 * The My Issues client page.
 * @returns Next.js RSC page.
 */
export default function MyIssuesClientPage(): JSX.Element {
  const store = useMyIssuesStore()
  return (
    <div className='space-y-3'>
      <nav className='flex items-center space-x-2 px-3'>
        <header className='p-2'>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <Icons.home className='h-4 w-4 text-sub' />
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>My issues</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <SubHeader store={store} />
      </nav>
      <main className='h-svh w-full space-x-4 border-t'>
        <IssueList store={store} />
      </main>
    </div>
  )
}
