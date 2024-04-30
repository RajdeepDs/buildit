import { db, eq } from "@buildit/db";
import { workspaces } from "@buildit/db/src/schema";

type getWorkspaceProps = {
  slug: string;
};

export const getWorkspaceBySlug = async ({ slug }: getWorkspaceProps) => {
  try {
    const workspace = await db.query.workspaces.findFirst({
      where: eq(workspaces.slug, slug),
    });
    return workspace;
  } catch {
    return null;
  }
};
