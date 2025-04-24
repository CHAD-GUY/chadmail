import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getWorkspaceColor = (workspace: string) => {
  switch (workspace) {
    case "Personal":
      return "bg-blue-500";
    case "Work":
      return "bg-green-500";
    case "Projects":
      return "bg-yellow-500";
    case "Newsletters":
      return "bg-purple-500";
    default:
      return "bg-gray-500";
  }
};
