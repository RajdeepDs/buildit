import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Separator,
} from "@buildit/ui";

import { priorities, statuses } from "@/configs/issue-types";
import { Icons } from "@buildit/ui/icons";

export default function CustomizeFilter({
  filterType,
  selectedFilter,
  onFilterChange,
}: {
  filterType: string;
  selectedFilter: string;
  onFilterChange: (status: string) => void;
}): JSX.Element {
  const handleSelectFilter = (filter: string) => {
    onFilterChange(filter);
  };

  let filterOptions: { label: string; value: string; icon: string }[] = [];

  if (filterType === "Status") {
    filterOptions = statuses;
  }

  if (filterType === "Priority") {
    filterOptions = priorities;
  }

  return (
    <div className="flex items-center space-x-1 rounded-md border px-1 text-sm">
      <p className="cursor-default">{filterType}</p>
      <Separator orientation="vertical" className="h-5" />
      <p className="cursor-default">is</p>
      <Separator orientation="vertical" className="h-5" />
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none">
          {selectedFilter}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {filterOptions?.map((option) => {
            const Icon = Icons[option.icon as keyof typeof Icons];

            return (
              <DropdownMenuItem
                key={option.value}
                onClick={() => handleSelectFilter(option.value)}
              >
                <Icon className="mr-2 h-4 w-4 text-sub" />
                {option.label}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
      <Separator orientation="vertical" className="h-5" />
      <Icons.canceled
        className="h-4 w-4 cursor-pointer text-sub"
        onClick={() => handleSelectFilter("")}
      />
    </div>
  );
}
