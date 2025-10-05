"use client"

import * as React from "react"
import { ConvexProvider, ConvexReactClient } from "convex/react"

if(!process.env.NEXT_PUBLIC_CONVEX_URL) {
  throw new Error("NEXT_PUBLIC_CONVEX_URL is not set")
}

const convexClient = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ConvexProvider client={convexClient}>
      {children}
    </ConvexProvider>
  )
}
