"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function RemoveLinkFromDB(id: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return { message: "unauthorized!", type: "error" };
  }

  if (!id) {
    return { message: "data is required!", type: "error" };
  }

  const existing = await db.link.findUnique({
    where: {
      id,
    },
  });

  if (!existing) {
    return { message: "item not found", type: "error" };
  }

  await db.link.delete({
    where: {
      id,
    },
    
  });
  revalidatePath("/", "layout");

  return { message: "link removed successfully", type: "success" };
}
