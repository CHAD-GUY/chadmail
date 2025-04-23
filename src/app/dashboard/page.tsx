import { Header } from "@/components/features/header";
import { MailSidebar } from "@/components/features/mail-sidebar";

export default function Dashboard() {
  return (
    <div className="flex h-screen w-full flex-col bg-background">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <MailSidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="p-6 md:p-8">{/* <EmailList /> */}</div>
        </main>
      </div>
      {/* <ComposeButton /> */}
    </div>
  );
}
