import { EmailList } from "@/components/features/email-list";
import { Header } from "@/components/features/header";
import { MailSidebar } from "@/components/features/mail-sidebar";

export default function Dashboard() {
  return (
    <div className="flex h-screen w-full flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <MailSidebar />

        <main className="flex-1 overflow-y-auto">
          <div className="p-4 md:pl-0 pt-0 flex h-full">
            <EmailList />
          </div>
        </main>
      </div>
      {/* <ComposeButton /> */}
    </div>
  );
}
