"use client";

import {
  ComboBox,
  ComboBoxContent,
  ComboBoxItem,
  ComboBoxTrigger,
  ProjectModal,
  ProjectModalContent,
  ProjectModalHeader,
  ProjectModalTrigger,
} from "@buildit/ui";

import { getTeams } from "@/lib/data/team/get-teams";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import NewProjectForm from "../forms/new-project-form";

export const NewProjectModal = ({
  children,
}: { children: React.ReactNode }) => {
  const { data: teams } = useQuery({
    queryKey: ["teams"],
    queryFn: async () => getTeams(),
  });

  const [open, setOpen] = React.useState(false);
  const [openTeam, setOpenTeam] = React.useState(false);

  const [team, setTeam] = React.useState(teams?.[0]);

  return (
    <ProjectModal open={open} onOpenChange={setOpen}>
      <ProjectModalTrigger asChild>{children}</ProjectModalTrigger>
      <ProjectModalContent>
        <ProjectModalHeader>
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
        </ProjectModalHeader>
        <NewProjectForm team={team!} onOpenChange={setOpen} />
      </ProjectModalContent>
    </ProjectModal>
  );
};
