"use client";

import type React from "react";

import { useState } from "react";
import { Star, Paperclip } from "lucide-react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";

interface Email {
  id: string;
  read: boolean;
  starred: boolean;
  from: string;
  fromEmail: string;
  subject: string;
  preview: string;
  time: string;
  workspace: string;
  hasAttachment: boolean;
}

interface EmailItemProps {
  email: Email;
  isSelected: boolean;
  onSelectAction: () => void;
  onClickAction: () => void;
}

export function EmailItem({
  email,
  isSelected,
  onSelectAction,
  onClickAction,
}: EmailItemProps) {
  const [isStarred, setIsStarred] = useState(email.starred);
  const [isHovering, setIsHovering] = useState(false);

  const toggleStar = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsStarred(!isStarred);
  };

  const getWorkspaceColor = (workspace: string) => {
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

  const handleEmailClick = (e: React.MouseEvent) => {
    if (
      !(e.target as HTMLElement).closest("button") &&
      !(e.target as HTMLElement).closest('[role="checkbox"]')
    ) {
      onClickAction();
    }
  };

  return (
    <div
      className="flex items-center gap-3 pl-3"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{
          opacity: isSelected || isHovering ? 1 : 0,
          scale: isSelected || isHovering ? 1 : 0.5,
        }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="mr-2"
      >
        <Checkbox
          checked={isSelected}
          onCheckedChange={onSelectAction}
          onClick={(e) => e.stopPropagation()}
          aria-label={`Select email from ${email.from}`}
          className="translate-y-[1px] cursor-pointer"
        />
      </motion.div>

      <div
        className={cn(
          "group flex cursor-pointer flex-1 items-center gap-3 rounded-md border border-transparent p-2 px-3 transition-colors hover:bg-accent/50 hover:border-border",
          !email.read && "bg-accent/50",
          isSelected && "border-border bg-accent/30",
          isHovering && "bg-accent/70 border-border"
        )}
        onClick={handleEmailClick}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={toggleStar}
            className="text-muted-foreground focus:outline-none"
            aria-label={isStarred ? "Unstar" : "Star"}
          >
            <Star
              className={cn(
                "h-4 w-4",
                isStarred
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-transparent"
              )}
            />
          </button>
        </div>

        <div className="flex flex-1 items-center gap-3 overflow-hidden">
          <div
            className={cn(
              "min-w-[180px] max-w-[180px] truncate text-sm",
              !email.read ? "font-semibold" : "font-normal text-gray-600"
            )}
          >
            {email.from}
          </div>

          <div className="flex flex-1 items-center gap-3 overflow-hidden">
            <div className="flex-1 truncate">
              <span
                className={cn(
                  "text-sm",
                  !email.read ? "font-semibold" : "font-normal text-gray-600"
                )}
              >
                {email.subject}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "h-2 w-2 rounded-full",
                    getWorkspaceColor(email.workspace)
                  )}
                />
                <span className="hidden text-xs text-muted-foreground md:inline-block">
                  {email.workspace}
                </span>
              </div>

              {email.hasAttachment && (
                <Paperclip className="h-4 w-4 text-muted-foreground" />
              )}

              <span
                className={cn(
                  "whitespace-nowrap text-xs",
                  !email.read
                    ? "font-medium text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {email.time}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
