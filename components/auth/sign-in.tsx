"use client";

import { signIn } from "@/lib/auth-client";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export default function SignInPage() {
  const [email, setEmail] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const login = () => {
    if (!email) {
        toast.error("Email not provided");
      return;
    }
    startTransition(() => {
      signIn.magicLink({
        email,
        callbackURL: "/success?method=magic",
      });
    });
  };

  return (
    <section className=" h-[100vh] flex flex-col items-center justify-center">
      <div className=" max-w-xl">
        <h1 className="text-3xl font-semibold mb-4">Sign In</h1>
        <form
          className="flex flex-col "
          onSubmit={(ev) => {
            ev.preventDefault();
            login();
          }}
        >
          <label htmlFor="email">Email</label>
          <input
            id="email"
            autoComplete="email"
            className="border px-2 py-1 rounded-lg"
            type="text"
            onChange={(ev) => setEmail(ev.target.value)}
            value={email}
            placeholder="ada.lovelace@exmaple.com"
          />
          <button
            disabled={isPending}
            type="submit"
            className="w-full p-1 border mt-4 rounded-lg cursor-pointer"
          >
            {isPending ? "logging in..." : "Login"}
          </button>
        </form>
        <form
          className="flex flex-col max-w-xl"
          onSubmit={(ev) => {
            ev.preventDefault();
            signIn.social({
              provider: "google",
              callbackURL: "/success?method=google",
            });
          }}
        >
          <button
            disabled={isPending}
            type="submit"
            className="w-full p-1 bg-black text-white mt-4 rounded-lg cursor-pointer"
          >
            {isPending ? "logging in..." : "Sign in with Google"}
          </button>
        </form>
      </div>
    </section>
  );
}
