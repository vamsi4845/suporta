"use client";
import { Button } from "@workspace/ui/components/button"
import { useQuery } from "convex/react";
import { api } from "@workspace/backend/_generated/api";

export default function Page() {
  const users = useQuery(api.users.getMany);
  return (
    <div className="flex items-center justify-center min-h-svh"> 
      {users?.map((user: any) => (
        <div key={user._id}>{user.name}</div>
      ))}
    </div>
  )
}
