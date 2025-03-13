import { auth } from "@/auth";
import { db } from "@/lib/db";
import Link from "next/link";
import { headers } from "next/headers";
import LinkArray from "@/components/link-card";
import { Plus } from "lucide-react";
import { Metadata } from "next";
import { LinkSort } from "@/components/link-sort";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const links = await db.link.findMany({
    where: {
      userId: session?.user.id,
    },
  });

  return (
    <div className="m-4 mt-6 ">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold w-fit">List</h1>
        <LinkSort />
      </div>
      <LinkArray links={links} />

      {links.length <= 0 && (
        <div>
          <p>You don&apos;t have any links, yet</p>
          <Link href="/add">
            <span className="underline text-blue-800">Add one</span> to start
            monitoring it.
          </Link>
        </div>
      )}
      <Link href="/add">
        <button className="fixed bottom-8 z-50 right-8 p-2 shadow-lg shadow-black/60 flex items-center justify-center rounded-full transition-colors hover:bg-black/10">
          <Plus />
        </button>
      </Link>
    </div>
  );
}
