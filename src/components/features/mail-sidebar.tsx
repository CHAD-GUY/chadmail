"use client";

import {
  Archive,
  File,
  Inbox,
  Send,
  Star,
  Trash2,
  Plus,
  Search,
  Folder,
  FolderOpen,
  CornerDownRight,
  Mailbox,
  MoreVertical,
  SquarePen,
  Check,
  ChevronDown,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Input } from "../ui/input";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const sidebarItems = [
  { icon: Mailbox, label: "Inbox", id: "inbox", color: "text-blue-500" },
  { icon: Inbox, label: "All Mail", id: "all-mail", color: "text-purple-500" },
  { icon: Star, label: "Favorites", id: "favorites", color: "text-yellow-500" },
  { icon: Send, label: "Sent", id: "sent", color: "text-green-500" },
  { icon: File, label: "Drafts", id: "drafts", color: "text-orange-500" },
  { icon: Archive, label: "Archive", id: "archive", color: "text-indigo-500" },
  { icon: Trash2, label: "Trash", id: "trash", color: "text-red-500" },
];

const accounts = [
  {
    id: 1,
    name: "Alejo Pequeño",
    email: "alejopequeno25@gmail.com",
    platform: "Gmail",
    avatar: "/avatars/alejo-pequeno.jpg",
    color: "bg-red-100",
  },
  {
    id: 2,
    name: "Chad Smith",
    email: "chad@outlook.com",
    platform: "Outlook",
    avatar: "/avatars/chad-smith.png",
    color: "bg-blue-100",
  },
];

export function MailSidebar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeItem, setActiveItem] = useState("inbox");
  const [expandedLabels, setExpandedLabels] = useState<string[]>([]);
  const [buttonPosition, setButtonPosition] = useState({
    top: 0,
    right: 0,
    opacity: 0,
    item: null as string | null,
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(accounts[0]);

  const toggleLabel = (label: string) => {
    setExpandedLabels((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  const shouldShowButton = () => {
    return isDropdownOpen || isButtonHovered || hoveredItem !== null;
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part: string) => part[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Sidebar
      className="border-none"
      collapsible="icon"
      onMouseLeave={() => setHoveredItem(null)}
    >
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full flex items-center justify-between p-2 h-auto gap-2 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Avatar className={cn("h-8 w-8", selectedAccount.color)}>
                    <AvatarImage
                      src={selectedAccount.avatar}
                      alt={selectedAccount.name}
                    />
                    <AvatarFallback>
                      {getInitials(selectedAccount.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start text-sm">
                    <span className="font-medium">{selectedAccount.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {selectedAccount.platform}
                    </span>
                  </div>
                </div>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              {accounts.map((account) => (
                <DropdownMenuItem
                  key={account.id}
                  className="py-2 px-3 cursor-pointer"
                  onClick={() => setSelectedAccount(account)}
                >
                  <div className="flex items-center gap-2 w-full">
                    <Avatar className={cn("h-8 w-8", account.color)}>
                      <AvatarImage src={account.avatar} alt={account.name} />
                      <AvatarFallback>
                        {getInitials(account.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{account.name}</span>
                        {selectedAccount.id === account.id && (
                          <Check className="h-4 w-4" />
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground truncate w-[calc(100%-10px)]">
                        {account.email}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {account.platform}
                      </span>
                    </div>
                  </div>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <div className="flex items-center gap-2 text-sm">
                  <Plus className="h-4 w-4" />
                  <span>Add account</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center gap-2 justify-between">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon" className="cursor-pointer">
            <SquarePen className="h-5 w-5" />
          </Button>
        </div>
      </SidebarHeader>
      <SidebarContent
        className="px-4"
        onMouseLeave={() => setHoveredItem(null)}
      >
        <SidebarMenu className="pt-4">
          <h3 className="text-xs mb-2 font-medium text-grayColor">Views</h3>
          <div className="relative" onMouseLeave={() => setHoveredItem(null)}>
            <motion.div
              initial={{ opacity: 0, top: 0, right: 0 }}
              animate={{
                ...buttonPosition,
                opacity: shouldShowButton() ? 1 : 0,
              }}
              transition={{
                ease: "linear",
                duration: 0.2,
              }}
              className="absolute z-10"
            >
              <DropdownMenu
                open={isDropdownOpen}
                onOpenChange={(open) => {
                  setIsDropdownOpen(open);
                }}
              >
                <DropdownMenuTrigger asChild>
                  <div
                    className="rounded-md scale-75 hover:cursor-pointer bg-secondary h-8 w-8 p-1 flex items-center justify-center border border-grayColor transition-all duration-200 dark:bg-[#191919] dark:hover:bg-[#1e1e1e]"
                    onMouseEnter={() => {
                      setIsButtonHovered(true);
                      if (buttonPosition.item) {
                        setHoveredItem(buttonPosition.item);
                      }
                    }}
                    onMouseLeave={() => setIsButtonHovered(false)}
                  >
                    <MoreVertical className="h-4 w-4 text-muted-foreground" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="hover:cursor-pointer">
                    Mark all as read
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:cursor-pointer">
                    Empty folder
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </motion.div>

            <div
              onMouseLeave={() => setHoveredItem(null)}
              className="flex flex-col gap-1"
            >
              {sidebarItems.map((item, index) => (
                <SidebarMenuItem
                  key={item.label}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <div
                    className={cn(
                      "relative",
                      hoveredItem === item.id && "rounded-md"
                    )}
                    onMouseEnter={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const parentRect =
                        e.currentTarget.parentElement?.parentElement?.getBoundingClientRect();
                      const topOffset = parentRect
                        ? rect.top - parentRect.top
                        : index * 40;

                      setButtonPosition({
                        top: topOffset,
                        right: 0,
                        opacity: 1,
                        item: item.id,
                      });
                      setHoveredItem(item.id);
                    }}
                    onMouseLeave={() => {
                      if (!isButtonHovered && !isDropdownOpen) {
                        setHoveredItem(null);
                      }
                    }}
                  >
                    <SidebarMenuButton
                      isActive={activeItem === item.id}
                      tooltip={item.label}
                      onClick={() => setActiveItem(item.id)}
                      className={cn(
                        "flex w-full items-center gap-2 justify-between border border-transparent rounded-md px-3 py-2 transition-all duration-200 cursor-pointer dark:hover:bg-[#191919]",
                        activeItem === item.id
                          ? "border-gray-200 dark:border-[#414141] font-medium dark:bg-[#1e1e1e]"
                          : "opacity-85"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <item.icon
                          className={cn(
                            "h-4 w-4 transition-all duration-200",
                            item.color,
                            activeItem !== item.id && "opacity-60"
                          )}
                        />
                        <span>{item.label}</span>
                      </div>
                      <span className="text-xs text-darkColor">{3}</span>
                    </SidebarMenuButton>
                  </div>
                </SidebarMenuItem>
              ))}
            </div>
          </div>
        </SidebarMenu>

        <div className="pt-4">
          <h3 className="mb-2 text-xs font-medium text-grayColor">Folders</h3>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                className="flex w-full items-center gap-2 rounded-md px-3 py-2 cursor-pointer transition-all duration-200 dark:hover:bg-[#191919]"
                onClick={() => toggleLabel("studies")}
              >
                {expandedLabels.includes("studies") ? (
                  <FolderOpen className="h-4 w-4 text-grayColor" />
                ) : (
                  <Folder className="h-4 w-4 text-grayColor" />
                )}
                <span>Studies</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <AnimatePresence>
              {expandedLabels.includes("studies") && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ overflow: "hidden" }}
                >
                  <SidebarMenuItem>
                    <SidebarMenuButton className="flex w-full items-center gap-2 rounded-md px-3 py-2 pl-8 cursor-pointer transition-all duration-200 dark:hover:bg-[#191919]">
                      <CornerDownRight className="h-4 w-4 text-grayColor" />
                      <span>Prisma</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="flex w-full items-center gap-2 rounded-md px-3 py-2 pl-8 cursor-pointer transition-all duration-200 dark:hover:bg-[#191919]">
                      <CornerDownRight className="h-4 w-4 text-grayColor" />
                      <span>React</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </motion.div>
              )}
            </AnimatePresence>
            <SidebarMenuItem>
              <SidebarMenuButton
                className="flex w-full items-center gap-2 rounded-md px-3 py-2 cursor-pointer transition-all duration-200 dark:hover:bg-[#191919]"
                onClick={() => toggleLabel("work")}
              >
                {expandedLabels.includes("work") ? (
                  <FolderOpen className="h-4 w-4 text-grayColor" />
                ) : (
                  <Folder className="h-4 w-4 text-grayColor" />
                )}
                <span>Work</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <AnimatePresence>
              {expandedLabels.includes("work") && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ overflow: "hidden" }}
                >
                  <SidebarMenuItem>
                    <SidebarMenuButton className="flex w-full items-center gap-2 rounded-md px-3 py-2 pl-8 cursor-pointer transition-all duration-200 dark:hover:bg-[#191919]">
                      <CornerDownRight className="h-4 w-4 text-grayColor" />
                      <span>Projects</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="flex w-full items-center gap-2 rounded-md px-3 py-2 pl-8 cursor-pointer transition-all duration-200 dark:hover:bg-[#191919]">
                      <CornerDownRight className="h-4 w-4 text-grayColor" />
                      <span>Meetings</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </motion.div>
              )}
            </AnimatePresence>
            <SidebarMenuItem>
              <SidebarMenuButton className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-muted-foreground dark:text-[#a5a5a5] cursor-pointer transition-all duration-200 dark:hover:bg-[#191919]">
                <Plus className="h-4 w-4" />
                <span>Add folder</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="flex w-full items-center gap-2 rounded-md px-3 py-2 cursor-pointer transition-all duration-200 dark:hover:bg-[#191919]">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
