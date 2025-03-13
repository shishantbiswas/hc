"use server";

import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";
import {
  checkLinkStatus,
  getActiveLink,
  sendLinkDownEmail,
  getInactiveLink,
  refreshLink,
  sendLinkRefreshEmail,
} from "@/inngest/functions";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    checkLinkStatus,
    getActiveLink,
    sendLinkDownEmail,
    getInactiveLink,
    refreshLink,
    sendLinkRefreshEmail,
  ],
});
