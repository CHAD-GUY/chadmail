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
} from "@/components/ui/dropdown-menu";

const sidebarItems = [
  { icon: Mailbox, label: "Inbox", id: "inbox", color: "text-blue-500" },
  { icon: Inbox, label: "All Mail", id: "all-mail", color: "text-purple-500" },
  { icon: Star, label: "Favorites", id: "favorites", color: "text-yellow-500" },
  { icon: Send, label: "Sent", id: "sent", color: "text-green-500" },
  { icon: File, label: "Drafts", id: "drafts", color: "text-orange-500" },
  { icon: Archive, label: "Archive", id: "archive", color: "text-indigo-500" },
  { icon: Trash2, label: "Trash", id: "trash", color: "text-red-500" },
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

  const toggleLabel = (label: string) => {
    setExpandedLabels((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  // Función para determinar si el botón debe ser visible
  const shouldShowButton = () => {
    return isDropdownOpen || isButtonHovered || hoveredItem !== null;
  };

  return (
    <Sidebar className="border-r" collapsible="icon">
      <SidebarHeader className="p-4">
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
      </SidebarHeader>
      <SidebarContent className="px-4">
        <SidebarMenu className="pt-4">
          <h3 className="text-xs font-medium text-grayColor">Views</h3>
          <div className="relative">
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
                  // Si el dropdown se cierra, el botón debería ocultarse
                  // a menos que el cursor esté encima del ítem o del botón
                }}
              >
                <DropdownMenuTrigger asChild>
                  <div
                    className="rounded-md scale-75 hover:cursor-pointer bg-secondary h-8 w-8 p-1 flex items-center justify-center border border-grayColor transition-all duration-200 hover:bg-gray-200"
                    onMouseEnter={() => {
                      setIsButtonHovered(true);
                      // Mantener el hover en el ítem cuando el cursor está sobre el botón
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

            {sidebarItems.map((item, index) => (
              <SidebarMenuItem key={item.label}>
                <div
                  className={cn(
                    "relative",
                    hoveredItem === item.id && "bg-[#F1F5F9] rounded-md"
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
                    // Solo eliminar el hoveredItem si no estamos encima del botón o el dropdown no está abierto
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
                      "flex w-full items-center gap-2 justify-between border border-transparent text-grayColor rounded-md px-3 py-2 transition-all duration-200",
                      activeItem === item.id &&
                        "bg-[#EAEAE9] text-darkColor border-grayColor font-medium"
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
        </SidebarMenu>

        <div className="pt-4">
          <h3 className="mb-2 text-xs font-medium text-grayColor">Folders</h3>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                className="flex w-full items-center gap-2 rounded-md px-3 py-2"
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
                    <SidebarMenuButton className="flex w-full items-center gap-2 rounded-md px-3 py-2 pl-8">
                      <CornerDownRight className="h-4 w-4 text-grayColor" />
                      <span>Prisma</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="flex w-full items-center gap-2 rounded-md px-3 py-2 pl-8">
                      <CornerDownRight className="h-4 w-4 text-grayColor" />
                      <span>React</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </motion.div>
              )}
            </AnimatePresence>
            <SidebarMenuItem>
              <SidebarMenuButton
                className="flex w-full items-center gap-2 rounded-md px-3 py-2"
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
                    <SidebarMenuButton className="flex w-full items-center gap-2 rounded-md px-3 py-2 pl-8">
                      <CornerDownRight className="h-4 w-4 text-grayColor" />
                      <span>Projects</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="flex w-full items-center gap-2 rounded-md px-3 py-2 pl-8">
                      <CornerDownRight className="h-4 w-4 text-grayColor" />
                      <span>Meetings</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </motion.div>
              )}
            </AnimatePresence>
            <SidebarMenuItem>
              <SidebarMenuButton className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-muted-foreground">
                <Plus className="h-4 w-4" />
                <span>Add folder</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <div className="text-xs text-muted-foreground">
          <p>Footer</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
