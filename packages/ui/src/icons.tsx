import {
  ChevronDown,
  ChevronLeft,
  CircleDotDashed,
  HelpCircle,
  Inbox,
  Maximize2,
  Minimize2,
  PenBox,
  Search,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Icon = LucideIcon;

export const Icons = {
  chevronDown: ChevronDown,
  chevronLeft: ChevronLeft,
  search: Search,
  inbox: Inbox,
  issues: CircleDotDashed,
  newIssue: PenBox,
  info: HelpCircle,
  maximize: Maximize2,
  minimize: Minimize2,
};
