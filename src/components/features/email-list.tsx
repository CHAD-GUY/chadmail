"use client";

import { useState } from "react";
import {
  Archive,
  Clock,
  MoreHorizontal,
  Trash2,
  Tag,
  Filter,
  RefreshCcw,
  Mailbox,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EmailDetailModal } from "./email-detail-modal";
import { EmailItem } from "./email-item";
import { Card, CardHeader } from "../ui/card";
import { CardContent } from "../ui/card";
import { motion, AnimatePresence } from "framer-motion";

// Sample email data
const emails = [
  {
    id: "1",
    read: false,
    starred: true,
    from: "GitHub",
    fromEmail: "noreply@github.com",
    subject: "Your daily GitHub digest",
    preview: "You have 3 new notifications from your repositories...",
    time: "10:42 AM",
    workspace: "Work",
    hasAttachment: false,
  },
  {
    id: "2",
    read: true,
    starred: false,
    from: "Notion Team",
    fromEmail: "team@notion.so",
    subject: "What's new in Notion this month",
    preview:
      "Check out the latest features we've added to make your workflow even smoother...",
    time: "Yesterday",
    workspace: "Newsletters",
    hasAttachment: true,
  },
  {
    id: "3",
    read: false,
    starred: false,
    from: "Vercel",
    fromEmail: "notifications@vercel.com",
    subject: "Your project has been deployed",
    preview: "Your recent deployment to production completed successfully...",
    time: "Yesterday",
    workspace: "Work",
    hasAttachment: false,
  },
  {
    id: "4",
    read: true,
    starred: true,
    from: "Sarah Johnson",
    fromEmail: "sarah.j@example.com",
    subject: "Weekend plans",
    preview: "Hey! I was thinking we could meet up on Saturday for coffee...",
    time: "Jul 12",
    workspace: "Personal",
    hasAttachment: false,
  },
  {
    id: "5",
    read: true,
    starred: false,
    from: "Netflix",
    fromEmail: "info@netflix.com",
    subject: "New shows added to your list",
    preview: "We've added new shows that match your interests...",
    time: "Jul 11",
    workspace: "Newsletters",
    hasAttachment: false,
  },
  {
    id: "6",
    read: true,
    starred: false,
    from: "Bank of America",
    fromEmail: "customerservice@bofa.com",
    subject: "Your monthly statement is ready",
    preview: "Your statement for the period ending July 10 is now available...",
    time: "Jul 10",
    workspace: "Personal",
    hasAttachment: true,
  },
  {
    id: "7",
    read: true,
    starred: false,
    from: "LinkedIn",
    fromEmail: "notifications@linkedin.com",
    subject: "5 new connections for you",
    preview: "Expand your network with these connection suggestions...",
    time: "Jul 9",
    workspace: "Newsletters",
    hasAttachment: false,
  },
  {
    id: "8",
    read: true,
    starred: false,
    from: "Alex from Product Hunt",
    fromEmail: "alex@producthunt.com",
    subject: "Products you might be interested in",
    preview: "Here are some new products that match your interests...",
    time: "Jul 8",
    workspace: "Newsletters",
    hasAttachment: false,
  },
  {
    id: "9",
    read: true,
    starred: false,
    from: "Dropbox",
    fromEmail: "no-reply@dropbox.com",
    subject: "Someone shared a folder with you",
    preview: "Jane Doe has shared a folder called 'Project Assets' with you...",
    time: "Jul 7",
    workspace: "Work",
    hasAttachment: true,
  },
  {
    id: "10",
    read: true,
    starred: false,
    from: "Twitter",
    fromEmail: "info@twitter.com",
    subject: "Your weekly Twitter digest",
    preview: "See what's happening with the accounts you follow...",
    time: "Jul 6",
    workspace: "Newsletters",
    hasAttachment: false,
  },
  {
    id: "11",
    read: true,
    starred: false,
    from: "Google",
    fromEmail: "no-reply@google.com",
    subject: "Your Google Drive is ready",
    preview: "Your Google Drive is ready for use...",
    time: "Jul 5",
    workspace: "Work",
    hasAttachment: true,
  },
  {
    id: "12",
    read: true,
    starred: false,
    from: "Apple",
    fromEmail: "no-reply@apple.com",
    subject: "Your Apple ID is ready",
    preview: "Your Apple ID is ready for use...",
    time: "Jul 4",
    workspace: "Personal",
    hasAttachment: false,
  },
  {
    id: "13",
    read: true,
    starred: false,
    from: "Amazon",
    fromEmail: "no-reply@amazon.com",
    subject: "Your Amazon order is ready",
    preview: "Your order has been shipped and is on its way...",
    time: "Jul 3",
    workspace: "Work",
    hasAttachment: true,
  },
  {
    id: "14",
    read: true,
    starred: false,
    from: "Microsoft",
    fromEmail: "no-reply@microsoft.com",
    subject: "Your Microsoft account is ready",
    preview: "Your Microsoft account is ready for use...",
    time: "Jul 2",
    workspace: "Personal",
    hasAttachment: false,
  },
  {
    id: "15",
    read: true,
    starred: false,
    from: "Dropbox",
    fromEmail: "no-reply@dropbox.com",
    subject: "Someone shared a folder with you",
    preview: "Jane Doe has shared a folder called 'Project Assets' with you...",
    time: "Jul 1",
    workspace: "Work",
    hasAttachment: true,
  },
  {
    id: "16",
    read: true,
    starred: false,
    from: "Twitter",
    fromEmail: "info@twitter.com",
    subject: "Your weekly Twitter digest",
    preview: "See what's happening with the accounts you follow...",
    time: "Jul 6",
    workspace: "Newsletters",
    hasAttachment: false,
  },
  {
    id: "17",
    read: true,
    starred: false,
    from: "Google",
    fromEmail: "no-reply@google.com",
    subject: "Your Google Drive is ready",
    preview: "Your Google Drive is ready for use...",
    time: "Jul 5",
    workspace: "Work",
    hasAttachment: true,
  },
];

export function EmailList() {
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  // Add a state to track which email is being viewed in the modal
  const [selectedEmailId, setSelectedEmailId] = useState<string | null>(null);
  // Add a state to control modal visibility separately from the selected email
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleSelectAll = () => {
    if (selectedEmails.length === emails.length) {
      setSelectedEmails([]);
    } else {
      setSelectedEmails(emails.map((email) => email.id));
    }
  };

  const toggleSelectEmail = (id: string) => {
    if (selectedEmails.includes(id)) {
      setSelectedEmails(selectedEmails.filter((emailId) => emailId !== id));
    } else {
      setSelectedEmails([...selectedEmails, id]);
    }
  };

  // Add a function to handle email click (to open modal)
  const handleEmailClick = (id: string) => {
    setSelectedEmailId(id);
    setIsModalOpen(true);
  };

  // Find the selected email for the modal
  const selectedEmail = selectedEmailId
    ? emails.find((email) => email.id === selectedEmailId)
    : null;

  const isAllSelected = selectedEmails.length === emails.length;
  const isAnySelected = selectedEmails.length > 0;

  // In the return statement, after the email list div, add the EmailDetailModal
  return (
    <Card className="flex-1 overflow-y-auto gap-0 pb-0">
      <CardHeader className="border-b border-grayColor !pb-4 flex flex-col gap-2">
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
      </CardHeader>
      <CardContent className="h-full overflow-y-auto p-4 pt-0">
        <div className="flex flex-col ">
          <div className="space-y-1 pt-4">
            {emails.map((email) => (
              <EmailItem
                key={email.id}
                email={email}
                isSelected={selectedEmails.includes(email.id)}
                onSelectAction={() => toggleSelectEmail(email.id)}
                onClickAction={() => handleEmailClick(email.id)}
              />
            ))}
          </div>

          {/* Add the EmailDetailModal */}
          {selectedEmail && (
            <EmailDetailModal
              email={selectedEmail}
              isOpen={isModalOpen}
              onCloseAction={() => {
                setIsModalOpen(false);
              }}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
