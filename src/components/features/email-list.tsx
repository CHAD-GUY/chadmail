"use client";

import { useState } from "react";
import { EmailDetailModal } from "./email-detail-modal";
import { EmailItem } from "./email-item";
import { Card, CardHeader } from "../ui/card";
import { CardContent } from "../ui/card";
import { EmailListHeader } from "./email-list-header";
import { emails } from "@/constants";
import { useEmailStore } from "@/store/email-store";
import { AnimatePresence, motion } from "framer-motion";

export function EmailList() {
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [selectedEmailId, setSelectedEmailId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { viewMode } = useEmailStore();

  const toggleSelectEmail = (id: string) => {
    if (selectedEmails.includes(id)) {
      setSelectedEmails(selectedEmails.filter((emailId) => emailId !== id));
    } else {
      setSelectedEmails([...selectedEmails, id]);
    }
  };

  const handleEmailClick = (id: string) => {
    setSelectedEmailId(id);
    setIsModalOpen(true);
  };

  const handleCloseDetail = () => {
    setSelectedEmailId(null);
    setIsModalOpen(false);
  };

  const selectedEmail = selectedEmailId
    ? emails.find((email) => email.id === selectedEmailId)
    : null;

  return (
    <>
      <Card className="flex-1 overflow-y-auto gap-0 pb-0">
        <CardHeader className="border-b border-grayColor !pb-4 flex flex-col gap-2">
          <EmailListHeader
            selectedEmails={selectedEmails}
            setSelectedEmails={setSelectedEmails}
            emails={emails}
          />
        </CardHeader>
        <CardContent className="h-full overflow-y-auto p-4 pt-0">
          <div className="flex flex-col ">
            <div className="space-y-1 pt-4">
              {emails.map((email) => (
                <EmailItem
                  key={email.id}
                  email={email}
                  isModalOpen={isModalOpen}
                  isSelected={selectedEmails.includes(email.id)}
                  onSelectAction={() => toggleSelectEmail(email.id)}
                  onClickAction={() => handleEmailClick(email.id)}
                />
              ))}
            </div>

            {viewMode === "center" && selectedEmail && (
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

      <AnimatePresence mode="wait">
        {viewMode === "right" && selectedEmail && isModalOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20, width: 0 }}
            animate={{ opacity: 1, x: 0, width: "50%" }}
            exit={{ opacity: 0, x: 20, width: 0 }}
            transition={{ duration: 0.3 }}
            className="ml-4"
          >
            <Card className="h-full relative">
              <button
                onClick={handleCloseDetail}
                className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-200 transition-colors"
                aria-label="Cerrar detalles"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
              <CardHeader>
                <h2 className="text-xl font-bold">{selectedEmail.subject}</h2>
                <p className="text-sm text-gray-500">
                  From: {selectedEmail.from}
                </p>
              </CardHeader>
              <CardContent>
                <div>{selectedEmail.preview}</div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
