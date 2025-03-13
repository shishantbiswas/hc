"use client";

import { signOut, useSession } from "@/lib/auth-client";
import { LogInIcon, Plus, Power } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const session = useSession();
  const router = useRouter();
  return (
    <nav className="fixed max-w-3xl w-full top-4 px-4">
      <div className="flex p-3 max-w-3xl mx-auto bg-black/10 rounded  items-center justify-between">
        <div>
          <Link href="/">
            <img className="size-5 p-0.5" src="/favicon.ico" alt="icon" />
          </Link>
        </div>
        <div className="flex text-sm items-center gap-1 ">
          {!session.isPending ? (
            session.data?.session ? (
              <>
                <Link
                  className="p-[12px] text-xs rounded-lg disabled:opacity-30 not-disabled:hover:bg-black/10 transition-colors flex items-center leading-0 gap-1"
                  href="/dashboard"
                >
                  <span>Dashboard</span>
                </Link>
                <Link
                  className="p-2 text-xs  rounded-lg disabled:opacity-30 not-disabled:hover:bg-black/10 transition-colors flex items-center leading-0 gap-1"
                  href="/add"
                >
                  <Plus size={10} />
                  <span>Add</span>
                </Link>
                <button
                  className="p-2 text-xs  rounded-lg disabled:opacity-30 not-disabled:hover:text-white not-disabled:hover:bg-red-600 transition-colors  flex items-center leading-0 gap-1"
                  onClick={() =>
                    signOut({
                      fetchOptions: {
                        onSuccess: () => {
                          router.push("/login");
                        },
                      },
                    })
                  }
                >
                  <Power size={10} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <button className="p-2 text-xs  rounded-lg disabled:opacity-30 not-disabled:hover:text-white not-disabled:hover:bg-red-600 transition-colors  flex items-center leading-0 gap-1">
                    Login
                    <LogInIcon size={10}/>
                  </button>
                </Link>
              </>
            )
          ) : (
            <p className="p-2 text-xs  rounded-lg flex items-center leading-0 gap-1">Loading...</p>
          )}
        </div>
      </div>
    </nav>
  );
}
