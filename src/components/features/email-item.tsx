"use client";
import type React from "react";
import { useState } from "react";
import { Star, Paperclip } from "lucide-react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";

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

  const toggleStar = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsStarred(!isStarred);
  };

  const handleEmailClick = () => {
    onClickAction();
  };

  return (
    <div
      className={cn(
        "group flex cursor-pointer items-center justify-between rounded-md p-3 transition-colors hover:bg-secondary/50 w-full",
        !email.read && "bg-secondary/30",
        isSelected && "bg-secondary"
      )}
      onClick={handleEmailClick}
    >
      {/* Left section with checkbox, sender, and subject */}
      <div className="flex items-center gap-4 overflow-hidden flex-1">
        <div className="flex items-center gap-2 flex-shrink-0">
          <Checkbox
            checked={isSelected}
            onCheckedChange={onSelectAction}
            onClick={(e) => e.stopPropagation()}
            aria-label={`Select email from ${email.from}`}
            className="translate-y-[1px]"
          />
          {/* Notification dot - only show if needed */}
          <div className="w-1 h-1 rounded-full bg-blue-500 flex-shrink-0"></div>
        </div>

        {/* Sender name column with fixed width */}
        <div className="w-40 flex-shrink-0 truncate">
          <span className="text-sm font-medium">{email.from}</span>
        </div>

        {/* Email subject/content that grows and shrinks */}
        <div className="flex-1 overflow-hidden truncate">
          <span className="text-sm">{email.subject}</span>
          {email.preview && (
            <span className="text-sm text-muted-foreground ml-2">
              {email.preview}
            </span>
          )}
        </div>
      </div>

      {/* Right section with time */}
      <div className="flex items-center gap-3 flex-shrink-0 pl-4">
        {email.hasAttachment && (
          <Paperclip className="h-4 w-4 text-muted-foreground" />
        )}
        <button
          onClick={toggleStar}
          className="text-muted-foreground focus:outline-none"
          aria-label={isStarred ? "Unstar" : "Star"}
        >
          <Star
            className={cn(
              "h-4 w-4",
              isStarred ? "fill-primary text-primary" : "fill-transparent"
            )}
          />
        </button>
        <span className="text-sm text-muted-foreground whitespace-nowrap">
          {email.time}
        </span>
      </div>
    </div>
  );
}
