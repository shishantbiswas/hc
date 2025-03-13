"use server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function RefreshLinkStatus(id: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return { message: "unauthorized!", type: "error" };
  }

  if (!id) {
    return { message: "data is required!", type: "warning" };
  }

  const existing = await db.link.findUnique({
    where: {
      id,
    },
  });

  if (!existing) {
    return { message: "item not found", type: "warning" };
  }

  const res = await checkStatus(existing.href);
  if (res.result == "error") {
    await db.link.update({
      where: {
        id,
      },
      data: {
        updatedAt: new Date(),
      },
    });
    return { message: "url couldn't be reached!", type: "error" };
  }

  await db.link.update({
    where: {
      id,
    },
    data: {
      isDown: false,
    },
  });

  revalidatePath("/", "layout");

  return { message: "link updated successfully", type: "success" };
}

async function checkStatus(url: string) {
  const response = await fetch(url, { cache: "no-store" }).catch(() => {
    null;
  });
  if (!response || !response.ok || response.status != 200) {
    return { result: "error" };
  }
  return { result: "ok" };
}
