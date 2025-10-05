"use client";
import { Button } from "@workspace/ui/components/button"
import { useQuery, useMutation } from "convex/react"
import { api } from "@workspace/backend/_generated/api"

export default function Page() {
  const users = useQuery(api.users.getMany);
  const addUser = useMutation(api.users.addUser);
  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Hello World</h1>
        <Button size="sm">Button</Button>
        {users?.map((user: any) => (
          <div key={user._id}>{user.name}</div>
        ))}
        <Button size="sm" onClick={() => {
          addUser({ name: "John Doe" });
        }}>Add User</Button>
      </div>
    </div>
  )
}
 