
import "@workspace/ui/globals.css"
import { Geist, Geist_Mono } from "next/font/google"
import { Providers } from "@/components/providers"
import { ClerkProvider } from '@clerk/nextjs'
import { Analytics } from "@vercel/analytics/react"
import { Metadata } from "next"

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})


export const metadata: Metadata = {
  title: "Supportly - Effortless Customer Support",
  description:"AI support that works for your team & customers."
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased `}
      >
        <Analytics />
        <ClerkProvider>
          <Providers>
              {children}
          </Providers>
        </ClerkProvider>
      </body>
    </html>
  )
}
