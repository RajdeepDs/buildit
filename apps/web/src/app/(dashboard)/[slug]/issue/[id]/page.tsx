import IssueClientPage from "./page-client";

export const runtime = "edge";

export default async function IssuePage(): Promise<JSX.Element> {
  return <IssueClientPage />;
}
