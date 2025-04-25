"use client";

import type React from "react";

import { useState } from "react";
import { Star, Paperclip } from "lucide-react";
import { cn, getWorkspaceColor } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { AnimatePresence, motion } from "framer-motion";
import { useEmailStore } from "@/store/email-store";
import type { Email } from "@/types/email";

interface EmailItemProps {
  email: Email;
  isSelected: boolean;
  isModalOpen: boolean;
  onSelectAction: () => void;
  onClickAction: () => void;
}

export function EmailItem({
  email,
  isSelected,
  isModalOpen,
  onSelectAction,
  onClickAction,
}: EmailItemProps) {
  const [isStarred, setIsStarred] = useState(email.starred);
  const [isHovering, setIsHovering] = useState(false);
  const { viewMode } = useEmailStore();

  const toggleStar = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsStarred(!isStarred);
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
          className="translate-y-[1px] cursor-pointer transition-all duration-100"
        />
      </motion.div>

      <div
        className={cn(
          "group flex cursor-pointer flex-1 items-center gap-3 rounded-md border border-transparent p-2 px-3 transition-colors hover:bg-accent/50 hover:border-border dark:hover:bg-[#1e1e1ece]",
          !email.read && "bg-accent/50 dark:bg-[#1e1e1e]",
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
            <AnimatePresence mode="wait">
              {viewMode === "right" && isModalOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <span
                    className={cn(
                      "text-sm block mt-1",
                      !email.read
                        ? "font-semibold"
                        : "font-normal text-gray-600"
                    )}
                  >
                    {email.subject}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex flex-1 items-center gap-3 overflow-hidden justify-end">
            <AnimatePresence mode="wait">
              {(viewMode === "right" && !isModalOpen) ||
              viewMode === "center" ? (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-1 truncate overflow-hidden"
                >
                  <span
                    className={cn(
                      "text-sm block",
                      !email.read
                        ? "font-semibold"
                        : "font-normal text-gray-600"
                    )}
                  >
                    {email.subject}
                  </span>
                </motion.div>
              ) : null}
            </AnimatePresence>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <span
                  className={cn(
                    "h-1 w-1 rounded-full",
                    getWorkspaceColor(email.workspace)
                  )}
                />
                <span
                  className={`text-xs ${
                    !email.read
                      ? "text-black dark:text-white font-medium"
                      : "text-muted-foreground"
                  }`}
                >
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
