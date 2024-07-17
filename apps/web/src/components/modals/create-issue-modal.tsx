"use client";

import React from "react";

import {
  ComboBox,
  ComboBoxContent,
  ComboBoxItem,
  ComboBoxTrigger,
  IssueModal,
  IssueModalContent,
  IssueModalHeader,
  IssueModalTrigger,
} from "@buildit/ui";

import { getTeams } from "@/lib/data/team/get-teams";
import { useQuery } from "@tanstack/react-query";
import CreateIssueForm from "../forms/create-issue-form";

export function CreateIssueModal({ children }: { children: React.ReactNode }) {
  const { data: teams } = useQuery({
    queryKey: ["teams"],
    queryFn: async () => getTeams(),
  });

  const [open, setOpen] = React.useState(false);
  const [openTeam, setOpenTeam] = React.useState(false);

  const [team, setTeam] = React.useState(teams?.[0]);

  return (
    <IssueModal open={open} onOpenChange={setOpen}>
      <IssueModalTrigger asChild>{children}</IssueModalTrigger>
      <IssueModalContent>
        <IssueModalHeader>
          {teams && teams?.length > 1 ? (
            <ComboBox open={openTeam} onOpenChange={setOpenTeam}>
              <ComboBoxTrigger>{team?.name}</ComboBoxTrigger>
              <ComboBoxContent className="w-[200px]">
                {teams.map((team) => (
                  <ComboBoxItem
                    key={team.id}
                    onSelect={() => {
                      setTeam(team);
                      setOpenTeam(false);
                    }}
                  >
                    {team.name}
                  </ComboBoxItem>
                ))}
              </ComboBoxContent>
            </ComboBox>
          ) : (
            <p className="text-sm">{team?.name}</p>
          )}
        </IssueModalHeader>
        <CreateIssueForm onOpenChange={setOpen} team={team!} />
      </IssueModalContent>
    </IssueModal>
  );
}
