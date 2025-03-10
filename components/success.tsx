"use client";
import { signOut, useSession } from "@/lib/auth-client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

type LoginMethod = "google" | "magic" | string | null;

const Success = () => {
  const searchParams = useSearchParams();
  const method: LoginMethod = searchParams.get("method");
  const session = useSession();

  if (session.isPending) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div>
      {session.data?.session ? (
        <>
          <h1>
            {method == "google"
              ? "signed in with google"
              : "signed in  with magic link"}
          </h1>
          <button
            className="cursor-pointer"
            onClick={() => {
              signOut();
            }}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <h1>You are not signed in</h1>
          <Link href={"/"}>Go Home</Link>
        </>
      )}
    </div>
  );
};

export default Success;
