import IssueClientPage from './page-client'

/**
 * The IssuePage component is the page that displays the details of a specific issue.
 * @param props The props for the IssuePage component.
 * @param props.params The params for the IssuePage component.
 * @param props.params.id The ID of the issue.
 * @returns JSX.Element
 */
export default function IssuePage({
  params,
}: {
  params: { id: string }
}): JSX.Element {
  return <IssueClientPage issueId={params.id} />
}
