"use client";
import { useMutation, useQuery } from "convex/react";
import { api } from "@workspace/backend/_generated/api";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { Button } from "@workspace/ui/components/button";

export default function Page() {
  const addUser = useMutation(api.users.addUser);
  return (
    <div className="flex items-center justify-center min-h-svh"> 
    <OrganizationSwitcher hidePersonal/>
    <Button onClick={() => {
      addUser({name: "John Doe"});
    }}>
      Add User
    </Button>
    </div>
  )
}
