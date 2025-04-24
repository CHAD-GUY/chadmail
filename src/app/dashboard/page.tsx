import { Header } from "@/components/features/header";
import { MailSidebar } from "@/components/features/mail-sidebar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Dashboard() {
  return (
    <div className="flex h-screen w-full flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <MailSidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 md:pl-0 pt-0 flex h-full">
            <Card className="flex-1 overflow-y-auto gap-4">
              <CardHeader className="border-b border-grayColor !pb-4">
                Hello
              </CardHeader>
              <CardContent className="h-full overflow-y-auto p-4 pt-0">
                <div className="bg-red-500 h-screen w-full"></div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
      {/* <ComposeButton /> */}
    </div>
  );
}
