import { FilterSettings } from "@/types/config";

export const groupingOptions: FilterSettings[] = [
  {
    label: "Status",
    value: "status",
  },
  {
    label: "Priority",
    value: "priority",
  },
  // {
  //   label: "Assignee",
  //   value: "assignee",
  // },
  // {
  //   label: "Project",
  //   value: "project",
  // },
  // {
  //   label: "Label",
  //   value: "label",
  // },
  // {
  //   label: "Team",
  //   value: "team",
  // },
  {
    label: "No grouping",
    value: "noGrouping",
  },
];

export const orderingOptions: FilterSettings[] = [
  {
    label: "No ordering",
    value: "noOrdering",
  },
  {
    label: "Status",
    value: "status",
  },
  {
    label: "Priority",
    value: "priority",
  },
  {
    label: "Last updated",
    value: "lastUpdated",
  },
  {
    label: "Last created",
    value: "lastCreated",
  },
];
