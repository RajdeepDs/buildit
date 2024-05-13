import { getAllIssues } from "@/lib/data/issues/get-issues";

export const runtime = "edge";

export const GET = async () => {
  try {
    const allIssues = await getAllIssues();
    return Response.json(allIssues);
  } catch (e) {
    console.error("Error:", e);
    return new Response("Error", {
      status: 400,
    });
  }
};
