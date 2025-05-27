import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-5 items-center justify-center h-screen w-full">
      <div>
        <h1 className="text-4xl font-bold text-center">
          Welcome to Chadmail template
        </h1>
        <p className="text-center text-gray-500">
          This is a template for a simple email campaign.
        </p>
      </div>

      <Button>
        <Link href="/auth/login">Get Started</Link>
      </Button>
    </div>
  );
}
