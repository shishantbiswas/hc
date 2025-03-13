"use client";

import { AddLinkToDB } from "@/action/add-link";
import Form from "next/form";
import Link from "next/link";
import React, { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

const AddLink = () => {
  const [isPending, startTransition] = useTransition();
  const [state, setState] = useState({ message: "", type: "" });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setState({ message: "", type: "" });
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [state]);

  return (
    <section className=" h-[100vh] flex flex-col items-center justify-center">
      <div className=" max-w-xl">
        <h1 className="text-2xl font-semibold mb-4">Add URL</h1>
        <Form
          action={(data) => {
            setState({ message: "", type: "" });
            startTransition(() => {
              AddLinkToDB(data).then((res) => {
                setState(res);
                if (res.type == "error") {
                  toast.error(res.message);
                } else if (res.type == "warning") {
                  toast.warning(res.message);
                } else {
                  toast.success(res.message);
                  // router.push("/dashboard");
                }
              });
            });
          }}
          className="max-w-xl flex flex-col "
        >
          <label htmlFor="name" className="my-1 text-xs">
            Name
          </label>
          <input
            id="name"
            name="name"
            placeholder="Leave empty to autogenerate"
            className="border px-2.5 py-1.5 text-sm rounded-lg"
            type="text"
          />
          <label htmlFor="url" className="my-1 text-xs">
            Link
          </label>
          <input
            required
            placeholder="https://bsws.in or bsws.in"
            id="url"
            name="url"
            className="border px-2.5 py-1.5 text-sm rounded-lg"
            type="text"
          />
          {state.message && (
            <p
              className={`text-xs py-1 px-2 capitalize mt-2  rounded ${
                state.type == "error"
                  ? "text-red-500 bg-red-200"
                  : state.type == "warning"
                  ? "text-yellow-500 bg-yellow-100"
                  : "text-green-500 bg-green-100"
              }`}
              aria-live={state.type == "error" ? "assertive" : "polite"}
            >
              {state.message}
            </p>
          )}
          <button
            type="submit"
            className="w-full  p-1 border mt-4 rounded-lg cursor-pointer"
          >
            {isPending ? "Adding..." : "Add"}
          </button>
        </Form>
        <Link href="/dashboard">
          <button className="w-full bg-black text-white p-1 border mt-4 rounded-lg cursor-pointer">
            Go to Dashboard
          </button>
        </Link>
      </div>
    </section>
  );
};

export default AddLink;
