import { auth } from "@/auth";
import { Github } from "lucide-react";
import { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Home",
  };
}

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <>
      <section
        style={{
          backgroundImage: "url(/rays.avif)",
        }}
        className="m-4 flex items-center text-white justify-start gap-4 rounded-xl overflow-hidden cursor-default select-none"
      >
        <div className=" pt-16 p-8 flex flex-col justify-end bg-white/10  backdrop-blur-sm">
          <p className="px-3 py-1 rounded-2xl border w-fit transition-colors hover:bg-white/10 text-sm">
            Screw Unexpected Outages
          </p>
          <h1 className="mt-6 text-4xl">
            What if you don&apos;t have to worry about site status manually?
          </h1>

          <div className="border mt-8 rounded-md bg-muted/50 p-4 bg-white/25 ">
            <p className="text-[16px] leading-snug  ">
              Does your bullshit
              <Link
                className="text-fuchsia-400  hover:underline "
                href={"https://render.com/docs/free#free-web-services"}
              >
                {" "}
                hosting provider
              </Link>{" "}
              stops your app/service/API from doing it&apos;s job, try monitoring it
              using our service and get notified when your service is down down
            </p>
          </div>
          <p className="mt-6">Our service offers </p>
          <ul className="pl-2 opacity-70 list-disc list-inside">
            <li>Open source</li>
            <li>Free site monitoring</li>
            <li>Get notified straight to you mail</li>
          </ul>
          <div className="flex gap-2 items-center mt-6 text-sm">
            {session?.session ? (
              <>
                <Link
                  href="/dashboard"
                  className="px-2.5 rounded py-2 border bg-black text-white w-fit"
                >
                  Go to dashboard
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="login"
                  className="px-2.5 transition-colors hover:bg-white/10 rounded py-2 border bg-black/5 w-fit"
                >
                  Login
                </Link>
                <Link
                  href="https://github.com/shishantbiswas/hc"
                  target="_blank"
                  className="px-2.5 flex transition-colors hover:bg-white/10 items-center gap-2 rounded py-2 border bg-black/5 w-fit"
                >
                  <Github size={14}/>
                  Github
                </Link>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
