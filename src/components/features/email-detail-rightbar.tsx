import { AnimatePresence, motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import type { Email } from "@/types/email";
import { Button } from "../ui/button";
import {
  Archive,
  Forward,
  MoreHorizontal,
  Paperclip,
  Reply,
  Star,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getWorkspaceColor } from "@/lib/utils";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface Props {
  viewMode: "right" | "center";
  selectedEmail: Email;
  isModalOpen: boolean;
  handleCloseDetail: () => void;
}

const emailContent = `
<p>Hey there,</p>
<p>
  Thanks for using <strong>Chadmail</strong> — the only mailing app that makes your inbox look like a runway.<br/>
  <br/>
  This is just a sample message, but if it were real, it would include spicy memes, legendary GIFs, and attachments that slap harder than your Monday coffee.<br/>
  <br/>
  People who use Chadmail don’t just send emails... they transmit pure swagger.<br/>
  Certified CHADS. Ultra cool. Unbothered. Dripping in productivity. 😎💼🔥
</p><br/>
<p>
  Big digital hug,<br/>
  The ridiculously cool Chadmail Team 💌🕶️
</p>
`;

export const EmailDetailRightbar = ({
  viewMode,
  selectedEmail,
  isModalOpen,
  handleCloseDetail,
}: Props) => {
  const [isStarred, setIsStarred] = useState(selectedEmail?.starred);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleCloseDetail();
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [handleCloseDetail]);

  const toggleStar = () => {
    setIsStarred(!isStarred);
  };
  return (
    <AnimatePresence mode="wait">
      {viewMode === "right" && selectedEmail && isModalOpen && (
        <motion.div
          initial={{ opacity: 0, x: 20, width: 0 }}
          animate={{ opacity: 1, x: 0, width: "50%" }}
          exit={{ opacity: 0, x: 20, width: 0 }}
          transition={{ duration: 0.2 }}
          className="ml-4"
        >
          <Card className="h-full relative py-0">
            <CardHeader className="!p-4 border-b gap-0">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-semibold">
                  {selectedEmail.subject}
                </CardTitle>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleCloseDetail}
                  className="cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="flex-1 overflow-auto p-6">
              <div className="mb-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={`/avatars/chad-smith.png`}
                        alt={selectedEmail.from}
                      />
                      <AvatarFallback>
                        {selectedEmail.from.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">
                          {selectedEmail.from}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          &lt;{selectedEmail.fromEmail}&gt;
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{selectedEmail.time}</span>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <span
                            className={cn(
                              "h-2 w-2 rounded-full",
                              getWorkspaceColor(selectedEmail.workspace)
                            )}
                          />
                          <span>{selectedEmail.workspace}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleStar}
                      className="cursor-pointer"
                    >
                      <Star
                        className={cn(
                          "h-4 w-4",
                          isStarred
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-transparent"
                        )}
                      />
                    </Button>
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
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="cursor-pointer">
                          Mark as unread
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          Print
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          Block sender
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {selectedEmail.hasAttachment && (
                  <div className="mb-4 rounded-md border p-3 cursor-pointer transition-all duration-200 hover:bg-gray-100">
                    <div className="flex items-center gap-2">
                      <Paperclip className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">
                        attachment.pdf
                      </span>
                      <span className="text-xs text-muted-foreground">
                        245 KB
                      </span>
                    </div>
                  </div>
                )}

                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: emailContent }}
                />
              </div>
            </CardContent>

            <CardFooter className="border-t !p-4 flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="gap-1 cursor-pointer"
              >
                <Reply className="h-4 w-4" />
                <span>Reply</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-1 cursor-pointer"
              >
                <Forward className="h-4 w-4" />
                <span>Forward</span>
              </Button>
              <div className="ml-auto flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 cursor-pointer"
                >
                  <Archive className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 cursor-pointer"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
