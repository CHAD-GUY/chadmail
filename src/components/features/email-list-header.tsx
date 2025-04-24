import { Mailbox } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import {
  Archive,
  Clock,
  MoreHorizontal,
  Trash2,
  Tag,
  Filter,
  RefreshCcw,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { AnimatePresence, motion } from "motion/react";
import type { Email } from "@/types/email";

interface Props {
  selectedEmails: string[];
  setSelectedEmails: (emails: string[]) => void;
  emails: Email[];
}

export const EmailListHeader = ({
  selectedEmails,
  setSelectedEmails,
  emails,
}: Props) => {
  const toggleSelectAll = () => {
    if (selectedEmails.length === emails.length) {
      setSelectedEmails([]);
    } else {
      setSelectedEmails(emails.map((email) => email.id));
    }
  };
  const isAllSelected = selectedEmails.length === emails.length;
  const isAnySelected = selectedEmails.length > 0;
  return (
    <>
      <div className="flex items-center gap-1">
        <Mailbox className="text-blue-500 mr-2 h-5 w-5" />
        <div className="flex gap-2 items-end">
          <h3 className="text-lg font-medium">Inbox</h3>
          <p className="text-sm mb-[2px] text-muted-foreground">
            You have {emails.filter((e) => !e.read).length} unread messages
          </p>
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <Checkbox
          className="transition-all duration-100 cursor-pointer ml-1"
          checked={isAllSelected}
          onCheckedChange={toggleSelectAll}
        />

        <AnimatePresence mode="wait">
          {isAnySelected ? (
            <motion.div
              key="selected-actions"
              className="flex gap-2 items-center"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{
                duration: 0.1,
                ease: "easeInOut",
              }}
            >
              <Button
                variant="ghost"
                size="icon"
                title="Archive"
                className="ml-2 cursor-pointer"
              >
                <Archive className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                title="Delete"
                className="cursor-pointer"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                title="Snooze"
                className="cursor-pointer"
              >
                <Clock className="h-4 w-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="cursor-pointer"
                  >
                    <Tag className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem className="cursor-pointer">
                    Move to: Personal
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    Move to: Work
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    Move to: Projects
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    Move to: Newsletters
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="cursor-pointer"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem className="cursor-pointer">
                    Mark as read
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    Mark as unread
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    Add star
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    Remove star
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </motion.div>
          ) : (
            <motion.div
              key="default-actions"
              className="flex gap-2 items-center"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{
                duration: 0.1,
                ease: "easeOut",
              }}
            >
              <Button
                variant="ghost"
                size="icon"
                title="Refresh"
                className="cursor-pointer ml-2"
              >
                <RefreshCcw className="h-4 w-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="cursor-pointer"
                  >
                    <Filter className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem className="cursor-pointer">
                    All emails
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    Unread
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    Starred
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    With attachments
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
