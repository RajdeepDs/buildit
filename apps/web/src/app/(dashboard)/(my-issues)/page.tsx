import MyIssuesClientPage from './page-client'

/**
 * My Issues page. This page is used to display all the issues that are assigned to the user or created by the user.
 * @returns Next.js RSC page.
 */
export default function MyIssuesPage(): JSX.Element {
  return (
    <div className='h-full w-full'>
      <MyIssuesClientPage />
    </div>
  )
}
