import { db } from "@/lib/db";
import { inngest } from "./client";
import { Link } from "@prisma/client";
import { fetchRetry } from "@/utils/helpers";
import { sendLinkDownAlert, sendRefreshAlert } from "@/lib/mail";
import { revalidatePath } from "next/cache";

export const getActiveLink = inngest.createFunction(
  { id: "get-active-link" },
  { cron: "*/10 * * * *" },
  async ({ step }) => {
    const links = await step.run(
      "load-active-links",
      async () =>
        await db.link.findMany({
          where: {
            isDown: false,
          },
        })
    );

    if (links.length === 0) {
      return {
        status: "error",
        message: "No active links found. Skipping event dispatch.",
      };
    }

    const events = links.map((link) => {
      return {
        name: "check/send.active.link",
        data: link,
      };
    });
    await step.sendEvent("send-active-links-events", events);
  }
);

export const checkLinkStatus = inngest.createFunction(
  { id: "check-link-status" },
  { event: "check/send.active.link" },
  async ({ event, step }) => {
    const link = event.data as Link;

    const isActive = await step.run(
      "load-active-links",
      async () => await fetchRetry(link.href, { cache: "no-store" })
    );

    if (isActive) {
      await db.link.update({
        where: {
          id: link.id,
        },
        data: {
          updatedAt: new Date().toISOString(),
        },
      });
      return {
        status: "success",
        message: "Link is Active.",
      };
    } else {
      await db.link.update({
        where: {
          id: link.id,
        },
        data: {
          isDown: true,
          updatedAt: new Date().toISOString(),
        },
      });
      revalidatePath("/", "layout");
      await step.sendEvent("send-link-down-events", {
        name: "mail/send.link.down.email",
        data: link,
      });
      return {
        status: "error",
        message: "Link is inactive. Preparing to send mail",
      };
    }
  }
);

export const sendLinkDownEmail = inngest.createFunction(
  { id: "send-link-down-email" },
  { event: "mail/send.link.down.email" },
  async ({ event, step }) => {
    const link = event.data as Link;

    const user = await step.run(
      "get-user",
      async () =>
        await db.user.findUnique({
          where: {
            id: link.userId,
          },
        })
    );

    if (!user) {
      return {
        status: "error",
        message: "No user found associated with link.",
      };
    }

    await sendLinkDownAlert(user.email, link, new Date());
    return {
      status: "success",
      message: "Sending Link Down mail to user.",
    };
  }
);

export const getInactiveLink = inngest.createFunction(
  { id: "get-inactive-link" },
  { cron: "0 */12 * * *" },
  async ({ step }) => {
    const links = await step.run(
      "load-inactive-links",
      async () =>
        await db.link.findMany({
          where: {
            isDown: true,
          },
        })
    );

    if (links.length === 0) {
      return {
        status: "error",
        message: "No active links found. Skipping event dispatch.",
      };
    }

    const events = links.map((link) => {
      return {
        name: "refresh/send.inactive.link",
        data: link,
      };
    });
    await step.sendEvent("send-inactive-links-events", events);
  }
);

export const refreshLink = inngest.createFunction(
  { id: "refresh-link-status" },
  { event: "refresh/send.inactive.link" },
  async ({ event, step }) => {
    const link = event.data as Link;
    const isActive = await fetchRetry(link.href, { cache: "no-store" });
    if (isActive) {
      await db.link.update({
        where: {
          id: link.id,
        },
        data: {
          isDown: false,
          updatedAt: new Date().toISOString(),
        },
      });
      return;
    } else {
      await db.link.update({
        where: {
          id: link.id,
        },
        data: {
          updatedAt: new Date().toISOString(),
        },
      });
      revalidatePath("/", "layout");
      await step.sendEvent("send-link-down-events", {
        name: "mail/send.link.refresh.email",
        data: link,
      });
    }
  }
);

export const sendLinkRefreshEmail = inngest.createFunction(
  { id: "send-link-refresh-email" },
  { event: "mail/send.link.refresh.email" },
  async ({ event, step }) => {
    const link = event.data as Link;

    const user = await step.run(
      "get-user",
      async () =>
        await db.user.findUnique({
          where: {
            id: link.userId,
          },
        })
    );

    if (!user) {
      return { status: "error", message: "no user found" };
    }

    await sendRefreshAlert(user.email, link, new Date());

    return { status: "success", message: "refresh email send" };
  }
);
