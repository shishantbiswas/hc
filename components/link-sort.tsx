"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function LinkSort() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sort = searchParams.get("type");

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sort">Sort</label>
      <select
        defaultValue={sort ? sort :""}
        id="sort"
        className="py-1 px-2 rounded-md border"
        onChange={(e) => {
          const params = new URLSearchParams(searchParams.toString());
          params.set("type", e.target.value);
          router.push(`/dashboard?${params.toString()}`)
        }}
      >
        <option value="default">Default</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
        <option value="updatedAt">Last Checked</option>
      </select>
    </div>
  );
}
