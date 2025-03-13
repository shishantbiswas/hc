"use server";

import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";
import {
  checkLinksStatus,
  getActiveLink,
  sendLinkDownEmail,
  getInactiveLink,
  refreshLink,
  sendLinkRefreshEmail,
} from "@/inngest/functions";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    checkLinksStatus,
    getActiveLink,
    sendLinkDownEmail,
    getInactiveLink,
    refreshLink,
    sendLinkRefreshEmail,
  ],
});
