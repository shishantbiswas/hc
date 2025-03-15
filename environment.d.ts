declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      DIRECT_URL: string;
      BETTER_AUTH_SECRET: string;
      NEXT_PUBLIC_APP_URL: string;
      GOOGLE_CLIENT_SECRET: string;
      GOOGLE_CLIENT_ID: string;
      RESEND_API_KEY: string;
      INNGEST_EVENT_KEY: string;
      INNGEST_BASE_URL: string;
      INNGEST_SIGNING_KEY: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
