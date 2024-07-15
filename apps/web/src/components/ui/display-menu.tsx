import { useState } from "react";

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@buildit/ui";
import { Icons } from "@buildit/ui/icons";

import { groupingOptions, orderingOptions } from "@/configs/filter-settings";
import useMyIssuesStore from "@/lib/store/my-issues-store";

export default function DisplayMenu() {
  const store = useMyIssuesStore();

  const [grouping, setGrouping] = useState("noGrouping");
  const [ordering, setOrdering] = useState("noOrdering");

  const handleSelectGrouping = (group: string) => {
    store.setGroupBy(group);
    setGrouping(group);
  };
  const handleSelectOrdering = (order: string) => {
    setOrdering(order);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          StartIcon="sliders"
          color="secondary"
          size={"xs"}
          className="text-sub"
        >
          Display
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <Label className="flex items-center text-xs">
              <Icons.rows3 className="mr-1 h-4 w-4 text-sub" />
              Grouping
            </Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="w-2/4">
                <Button
                  color="secondary"
                  size="xs"
                  EndIcon="chevronDown"
                  className="flex justify-between text-xs"
                >
                  {
                    groupingOptions.find((option) => option.value === grouping)
                      ?.label
                  }
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {groupingOptions.map((option) => (
                  <DropdownMenuItem
                    key={option.value}
                    onSelect={() => handleSelectGrouping(option.value)}
                    className="font-medium text-xs"
                  >
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="hidden items-center justify-between">
            <Label className="flex items-center text-xs">
              <Icons.arrowUpDown className="mr-1 h-4 w-4 text-sub" />
              Ordering
            </Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="w-2/4">
                <Button
                  color="secondary"
                  size="xs"
                  EndIcon="chevronDown"
                  className="flex justify-between font-medium text-xs"
                >
                  {
                    orderingOptions.find((option) => option.value === ordering)
                      ?.label
                  }
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {orderingOptions.map((option) => (
                  <DropdownMenuItem
                    key={option.value}
                    onSelect={() => handleSelectOrdering(option.value)}
                    className="font-medium text-xs"
                  >
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
