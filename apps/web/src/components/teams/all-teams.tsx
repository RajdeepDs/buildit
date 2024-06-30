"use client";

import { useQuery } from "@tanstack/react-query";

import { getTeams } from "@/lib/data/team/get-teams";
import Team from "./team";

export default function AllTeams(): JSX.Element {
  const { data: allTeams, error } = useQuery({
    queryKey: ["teams"],
    queryFn: async () => getTeams(),
  });
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div>
      {allTeams?.map((team) => (
        <Team key={team.id} team={team} />
      ))}
    </div>
  );
}
