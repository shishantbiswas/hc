"use client";
import { RefreshLinkStatus } from "@/action/refresh-link-status";
import { RemoveLinkFromDB } from "@/action/rm-link";
import { Link } from "@prisma/client";
import { Trash } from "lucide-react";
import NextLink from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useTransition } from "react";
import { toast } from "sonner";

export default function LinkArray({ links }: { links: Link[] }) {
  const searchParams = useSearchParams();
  const sort = searchParams.get("type");
  const updateId = searchParams.get("update");

  return (
    <div className="space-y-4 mt-6">
      {links
        .sort((a, b) => {
          if (!sort) return 0;
          switch (sort) {
            case "inactive":
              return Number(b.isDown) - Number(a.isDown);
            case "active":
              return Number(a.isDown) - Number(b.isDown);
            case "updatedAt":
              return b.updatedAt.getTime() - a.updatedAt.getTime();
            default:
              return 0;
          }
        })
        .map((link) => (
          <LinkCard key={link.id} link={link} updateId={updateId} />
        ))}
    </div>
  );
}

export function LinkCard({
  link,
  updateId,
}: {
  link: Link;
  updateId: string | null;
}) {
  const [isDeleting, startDeleteTransition] = useTransition();
  const [isRefreshing, startRefreshTransition] = useTransition();

  const router = useRouter();

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (updateId == link.id) {
      timeout = setTimeout(() => {
        refreshLink();
        router.push("/dashboard");
      }, 3000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, []); // eslint-disable-line

  const refreshLink = () => {
    startRefreshTransition(() => {
      RefreshLinkStatus(link.id).then((res) => {
        if (res.type == "error") {
          toast.error(res.message);
        } else if (res.type == "warning") {
          toast.warning(res.message);
        } else if (res.type == "success") {
          toast.success(res.message);
        }
      });
    });
  };

  return (
    <div
      className={`bg-white shadow-md rounded p-3 space-y-6 ${
        link.isDown && "shadow-red-400"
      }`}
    >
      <div className="flex text-sm items-center justify-between">
        <div className="flex items-start">
          {/* <div> */}
            {link.favicon && (
              <img
                className="size-8 m-2"
                src={link.favicon}
                alt={link.name + "'s favicon"}
              />
            )}
          {/* </div> */}
          <div>
            <h3 className="text-lg font-semibold">{link.name}</h3>
            <NextLink
              href={link.href}
              target="_blank"
              className="opacity-60 text-xs "
            >
              {link.href}
            </NextLink>
          </div>
        </div>

        {link.isDown ? (
          <div className="bg-red-500 size-3 shadow-md shadow-red-400 animate-pulse rounded-full" />
        ) : (
          <div className="bg-green-500 size-3 shadow-md rounded-full" />
        )}
      </div>
      <div className="flex text-sm items-center justify-between">
        <div className="flex items-center gap-4 opacity-55">
          <p className="opacity-60 text-xs">
            Last Checked at {link.updatedAt.toLocaleString()}
          </p>
        </div>
        <div className="flex gap-2 items-center">
          {link.isDown && (
            <form action={refreshLink}>
              <button
                disabled={isRefreshing}
                className="p-[12px] text-xs leading-0  rounded-lg  disabled:opacity-30 not-disabled:hover:bg-black/10 transition-colors  flex items-center gap-1"
              >
                {isRefreshing ? "Refreshing" : "Refresh"}
              </button>
            </form>
          )}
          <form
            action={() => {
              startDeleteTransition(() => {
                RemoveLinkFromDB(link.id).then((res) => {
                  if (res.type == "error") {
                    toast.error(res.message);
                  } else if (res.type == "warning") {
                    toast.warning(res.message);
                  } else {
                    toast.success(res.message);
                  }
                });
              });
            }}
          >
            <button
              disabled={isDeleting}
              className="p-2 text-xs leading-0  rounded-lg  ring-1 disabled:opacity-30 not-disabled:hover:text-white not-disabled:hover:bg-red-600 transition-colors  flex items-center gap-1"
            >
              <Trash size={10} />
              {isDeleting ? "Deleting" : "Delete"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
