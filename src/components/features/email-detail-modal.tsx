"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Reply,
  Forward,
  Trash2,
  Archive,
  Star,
  MoreHorizontal,
  Paperclip,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, getWorkspaceColor } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Email } from "@/types/email";

interface EmailDetailModalProps {
  email: Email;
  isOpen: boolean;
  onCloseAction: () => void;
}

export function EmailDetailModal({
  email,
  isOpen,
  onCloseAction,
}: EmailDetailModalProps) {
  const [isStarred, setIsStarred] = useState(email.starred);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCloseAction();
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onCloseAction]);

  const toggleStar = () => {
    setIsStarred(!isStarred);
  };

  // Sample email content - in a real app, this would come from the server
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

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCloseAction}
            key="backdrop"
          />
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key="modal-container"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{
                type: "spring",
                damping: 20,
                stiffness: 300,
                exit: { duration: 0.2 },
              }}
              className="w-full h-full max-w-[1000px] max-h-[85vh] p-4"
              onClick={(e) => e.stopPropagation()}
              key="modal-content"
            >
              <Card className="h-full overflow-hidden flex flex-col p-0 gap-0">
                <CardHeader className="!p-4 border-b gap-0">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-semibold">
                      {email.subject}
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={onCloseAction}
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
                            alt={email.from}
                          />
                          <AvatarFallback>
                            {email.from.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{email.from}</span>
                            <span className="text-xs text-muted-foreground">
                              &lt;{email.fromEmail}&gt;
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{email.time}</span>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                              <span
                                className={cn(
                                  "h-2 w-2 rounded-full",
                                  getWorkspaceColor(email.workspace)
                                )}
                              />
                              <span>{email.workspace}</span>
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

                    {email.hasAttachment && (
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
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
