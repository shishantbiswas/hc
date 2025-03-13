import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "link-check",
  isDev: false,
  baseUrl: process.env.INNGEST_BASE_URL,
  eventKey: process.env.INNGEST_EVENT_KEY,
});
