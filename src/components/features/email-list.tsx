"use client";

import { useState } from "react";
import { EmailDetailModal } from "./email-detail-modal";
import { EmailItem } from "./email-item";
import { Card, CardHeader } from "../ui/card";
import { CardContent } from "../ui/card";
import { EmailListHeader } from "./email-list-header";
import { emails } from "@/constants";
import { useEmailStore } from "@/store/email-store";
import { EmailDetailRightbar } from "./email-detail-rightbar";

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

      <EmailDetailRightbar
        viewMode={viewMode}
        selectedEmail={selectedEmail!}
        isModalOpen={isModalOpen}
        handleCloseDetail={handleCloseDetail}
      />
    </>
  );
}
