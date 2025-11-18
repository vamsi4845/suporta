
import { Providers } from "@/components/providers"
import { ClerkProvider } from '@clerk/nextjs'
import { Analytics } from "@vercel/analytics/react"
import "@workspace/ui/globals.css"
import { Metadata } from "next"
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google"

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const fontSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: "400",
})

export const metadata: Metadata = {
  title: "Suporta - Effortless Customer Support",
  description: "AI support that works for your team & customers.",
  authors: [{ name: "Suporta", url: "https://suporta.vamsi.app" }],
  creator: "Vamsi Sai",
  keywords: [
    "Suporta",
    "AI support bot",
    "knowledge base",
    "support",
    "questions",
    "answers",
  ],
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
  },
  openGraph: {
    title: "Suporta - Effortless Customer Support",
    description: "AI support that works for your team & customers.",
    url: "https://suporta.vamsi.app",
    siteName: "Suporta",
    images: [
      {
        url: "https://suporta.vamsi.app/og.png",
        width: 1200,
        height: 630,
        alt: "Suporta - Effortless Customer Support",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Suporta - Effortless Customer Support",
    description: "AI support that works for your team & customers.",
    images: ["https://suporta.vamsi.app/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} ${fontSerif.variable} font-sans antialiased`}
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
