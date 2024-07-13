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

export default function DisplayMenu() {
  const [grouping, setGrouping] = useState("noGrouping");
  const [ordering, setOrdering] = useState("noOrdering");

  const handleSelectGrouping = (group: string) => {
    setGrouping(group);
  };
  const handleSelectOrdering = (order: string) => {
    setOrdering(order);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button color="minimal" size={"icon"}>
          <Icons.horizontalMore className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <Label>Grouping</Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button color="secondary" size="sm">
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
                  >
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex items-center justify-between">
            <Label>Ordering</Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button color="secondary" size="sm">
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
