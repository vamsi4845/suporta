// import type React from "react"

// interface SmartSimpleBrilliantProps {
//   /** Fixed width from Figma: 482px */
//   width?: number | string
//   /** Fixed height from Figma: 300px */
//   height?: number | string
//   /** Optional className to pass to root */
//   className?: string
//   /** Theme palette */
//   theme?: "light" | "dark"
// }

// /**
//  * Smart · Simple · Brilliant – Calendar cards
//  * Generated from Figma via MCP with exact measurements (482×300px)
//  */
// const SmartSimpleBrilliant: React.FC<SmartSimpleBrilliantProps> = ({
//   width = 482,
//   height = 300,
//   className = "",
//   theme = "dark",
// }) => {
//   // Design tokens (derived from Figma local variables)
//   const themeVars =
//     theme === "light"
//       ? {
//           "--ssb-surface": "#ffffff",
//           "--ssb-text": "#1b1919",
//           "--ssb-border": "rgba(0,0,0,0.08)",
//           "--ssb-inner-border": "rgba(0,0,0,0.12)",
//           "--ssb-shadow": "rgba(0,0,0,0.12)",
//         }
//       : ({
//           "--ssb-surface": "#333937",
//           "--ssb-text": "#f8f8f8",
//           "--ssb-border": "rgba(255,255,255,0.16)",
//           "--ssb-inner-border": "rgba(255,255,255,0.12)",
//           "--ssb-shadow": "rgba(0,0,0,0.28)",
//         } as React.CSSProperties)

//   // Figma-exported SVG assets used for small icons
//   const img = "http://localhost:3845/assets/1b1e60b441119fb176db990a3c7fe2670a764855.svg"
//   const img1 = "http://localhost:3845/assets/a502f04ccfc3811f304b58a3a982a5b6fa070e91.svg"
//   const img2 = "http://localhost:3845/assets/9c07375bf3b9f1f1d8a0a24447829eb6f54fa928.svg"
//   const img3 = "http://localhost:3845/assets/19500d66798ef5ea9dc9d5f971cd0e9c29674bd3.svg"

//   return (
//     <div
//       className={className}
//       style={
//         {
//           width,
//           height,
//           position: "relative",
//           background: "transparent",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           ...themeVars,
//         } as React.CSSProperties
//       }
//       role="img"
//       aria-label="Two calendar cards with colored event rows"
//     >
//       <div
//         style={{
//           position: "relative",
//           width: "295.297px",
//           height: "212.272px",
//           transform: "scale(1.2)", // Added 1.2x scale transform
//         }}
//       >
//         {/* Left tilted card group */}
//         <div style={{ position: "absolute", left: "123.248px", top: "0px", width: 0, height: 0 }}>
//           <div style={{ transform: "rotate(5deg)", transformOrigin: "center" }}>
//             <div
//               style={{
//                 width: "155.25px",
//                 background: "#ffffff",
//                 borderRadius: "9px",
//                 padding: "6px",
//                 boxShadow: "0px 0px 0px 1px rgba(0,0,0,0.08), 0px 2px 4px rgba(0,0,0,0.07)",
//               }}
//             >
//               {/* Amber event */}
//               <div
//                 style={{
//                   width: "100%",
//                   height: "51px",
//                   borderRadius: "4px",
//                   overflow: "hidden",
//                   background: "rgba(245,158,11,0.1)",
//                   display: "flex",
//                 }}
//               >
//                 <div style={{ width: "2.25px", background: "#F59E0B" }} />
//                 <div style={{ padding: "4.5px", width: "100%" }}>
//                   <div style={{ display: "flex", gap: "3px", alignItems: "center" }}>
//                     <span
//                       style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: "9px", color: "#92400E" }}
//                     >
//                       2:00
//                     </span>
//                     <span
//                       style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: "9px", color: "#92400E" }}
//                     >
//                       PM
//                     </span>
//                     <div style={{ background: "#92400E", padding: "1.5px", borderRadius: "100px" }}>
//                       <div style={{ width: "8px", height: "8px", overflow: "hidden", position: "relative" }}>
//                         <img
//                           src={img || "/placeholder.svg"}
//                           alt="video"
//                           style={{ position: "absolute", inset: "20% 10% 20% 10%" }}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                   <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "9px", color: "#92400E" }}>
//                     1:1 with Heather
//                   </div>
//                 </div>
//               </div>

//               {/* Sky event */}
//               <div
//                 style={{
//                   width: "100%",
//                   height: "79.5px",
//                   borderRadius: "4px",
//                   overflow: "hidden",
//                   background: "rgba(14,165,233,0.1)",
//                   marginTop: "3px",
//                   display: "flex",
//                 }}
//               >
//                 <div style={{ width: "2.25px", background: "#0EA5E9" }} />
//                 <div style={{ padding: "4.5px", width: "100%" }}>
//                   <div style={{ display: "flex", gap: "3px", alignItems: "center" }}>
//                     <span
//                       style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: "9px", color: "#0C4A6E" }}
//                     >
//                       2:00
//                     </span>
//                     <span
//                       style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: "9px", color: "#0C4A6E" }}
//                     >
//                       PM
//                     </span>
//                     <div style={{ background: "#0C4A6E", padding: "1.5px", borderRadius: "100px" }}>
//                       <div style={{ width: "8px", height: "8px", overflow: "hidden", position: "relative" }}>
//                         <img
//                           src={img1 || "/placeholder.svg"}
//                           alt="video"
//                           style={{ position: "absolute", inset: "20% 10% 20% 10%" }}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                   <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "9px", color: "#0C4A6E" }}>
//                     Concept Design Review II
//                   </div>
//                 </div>
//               </div>

//               {/* Emerald event */}
//               <div
//                 style={{
//                   width: "100%",
//                   height: "51px",
//                   borderRadius: "4px",
//                   overflow: "hidden",
//                   background: "rgba(16,185,129,0.1)",
//                   marginTop: "3px",
//                   display: "flex",
//                 }}
//               >
//                 <div style={{ width: "2.25px", background: "#10B981" }} />
//                 <div style={{ padding: "4.5px", width: "100%" }}>
//                   <div style={{ display: "flex", gap: "3px", alignItems: "center" }}>
//                     <span
//                       style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: "9px", color: "#064E3B" }}
//                     >
//                       9:00
//                     </span>
//                     <span
//                       style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: "9px", color: "#064E3B" }}
//                     >
//                       AM
//                     </span>
//                   </div>
//                   <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "9px", color: "#064E3B" }}>
//                     Webinar: Figma ...
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Right card */}
//         <div style={{ position: "absolute", left: "0px", top: "6.075px", width: "155.25px" }}>
//           <div style={{ transform: "rotate(-5deg)", transformOrigin: "center" }}>
//             <div
//               style={{
//                 width: "155.25px",
//                 background: "#ffffff",
//                 borderRadius: "9px",
//                 padding: "6px",
//                 boxShadow:
//                   "-8px 6px 11.3px rgba(0,0,0,0.12), 0px 0px 0px 1px rgba(0,0,0,0.08), 0px 2px 4px rgba(0,0,0,0.06)",
//               }}
//             >
//               {/* Violet event */}
//               <div
//                 style={{
//                   width: "100%",
//                   height: "51px",
//                   borderRadius: "4px",
//                   overflow: "hidden",
//                   background: "rgba(139,92,246,0.1)",
//                   display: "flex",
//                 }}
//               >
//                 <div style={{ width: "2.25px", background: "#8B5CF6" }} />
//                 <div style={{ padding: "4.5px", width: "100%" }}>
//                   <div style={{ display: "flex", gap: "3px", alignItems: "center" }}>
//                     <span
//                       style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: "9px", color: "#581C87" }}
//                     >
//                       11:00
//                     </span>
//                     <span
//                       style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: "9px", color: "#581C87" }}
//                     >
//                       AM
//                     </span>
//                     <div style={{ background: "#581C87", padding: "1.5px", borderRadius: "100px" }}>
//                       <div style={{ width: "8px", height: "8px", overflow: "hidden", position: "relative" }}>
//                         <img
//                           src={img2 || "/placeholder.svg"}
//                           alt="video"
//                           style={{ position: "absolute", inset: "20% 10% 20% 10%" }}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                   <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "9px", color: "#581C87" }}>
//                     Onboarding Presentation
//                   </div>
//                 </div>
//               </div>

//               {/* Rose event */}
//               <div
//                 style={{
//                   width: "100%",
//                   height: "51px",
//                   borderRadius: "4px",
//                   overflow: "hidden",
//                   background: "#FFE4E6",
//                   display: "flex",
//                   marginTop: "3px",
//                 }}
//               >
//                 <div style={{ width: "2.25px", background: "#F43F5E" }} />
//                 <div style={{ padding: "4.5px", width: "100%" }}>
//                   <div style={{ display: "flex", gap: "3px", alignItems: "center" }}>
//                     <span
//                       style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: "9px", color: "#BE123C" }}
//                     >
//                       4:00
//                     </span>
//                     <span
//                       style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: "9px", color: "#BE123C" }}
//                     >
//                       PM
//                     </span>
//                     <div style={{ background: "#BE123C", padding: "1.5px", borderRadius: "100px" }}>
//                       <div style={{ width: "8px", height: "8px", overflow: "hidden", position: "relative" }}>
//                         <img
//                           src={img3 || "/placeholder.svg"}
//                           alt="video"
//                           style={{ position: "absolute", inset: "20% 10% 20% 10%" }}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                   <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "9px", color: "#BE123C" }}>
//                     🍷 Happy Hour
//                   </div>
//                 </div>
//               </div>

//               {/* Violet tall event */}
//               <div
//                 style={{
//                   width: "100%",
//                   height: "79.5px",
//                   borderRadius: "4px",
//                   overflow: "hidden",
//                   background: "rgba(139,92,246,0.1)",
//                   display: "flex",
//                   marginTop: "3px",
//                 }}
//               >
//                 <div style={{ width: "2.25px", background: "#8B5CF6" }} />
//                 <div style={{ padding: "4.5px", width: "100%" }}>
//                   <div style={{ display: "flex", gap: "3px", alignItems: "center" }}>
//                     <span
//                       style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: "9px", color: "#581C87" }}
//                     >
//                       11:00
//                     </span>
//                     <span
//                       style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: "9px", color: "#581C87" }}
//                     >
//                       AM
//                     </span>
//                   </div>
//                   <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "9px", color: "#581C87" }}>
//                     🍔 New Employee Welcome Lunch!
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default SmartSimpleBrilliant

import { cn } from '@workspace/ui/lib/utils'
import { Logo } from '@/modules/landing/components/logo'
import { Button } from '@workspace/ui/components/button'
import Link from 'next/link'
import Image from 'next/image'

export default function SmartSimpleBrilliant() {
    return (
        <section>
            <div className="py-24 md:py-32 min-w-[360px] md:min-w-[1060px] mx-auto">
                <div className="mx-auto max-w-5xl px-6">
                    <div className="relative mx-auto flex max-w-sm items-center justify-between">
                        <div className="space-y-6">
                            <IntegrationCard position="left-top">
                            <Image src="https://dar5y10gv8dj8.cloudfront.net/suporta/web.png" alt="logo" width={40} height={40} />
                            </IntegrationCard>
                            <IntegrationCard position="left-middle">
                            <Image src="https://dar5y10gv8dj8.cloudfront.net/suporta/csv.png" alt="logo" width={40} height={40} />
                            </IntegrationCard>
                            <IntegrationCard position="left-bottom">
                            <Image src="https://dar5y10gv8dj8.cloudfront.net/suporta/text.png" alt="logo" width={40} height={40} />
                            </IntegrationCard>
                        </div>
                        <div className="mx-auto my-2 flex w-fit justify-center gap-2">
                            <div className="bg-muted relative z-20 rounded-2xl border p-1">
                                <IntegrationCard
                                    className="shadow-black-950/10 dark:bg-background size-16 border-black/25 shadow-xl dark:border-white/25 dark:shadow-white/10"
                                    isCenter={true}>
                                    <Logo />
                                </IntegrationCard>
                            </div>
                        </div>
                        <div
                            role="presentation"
                            className="absolute inset-1/3 bg-[radial-gradient(var(--dots-color)_1px,transparent_1px)] opacity-50 [--dots-color:black] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] dark:[--dots-color:white]"></div>

                        <div className="space-y-6">
                            <IntegrationCard position="right-top">
                                <Image src="https://dar5y10gv8dj8.cloudfront.net/suporta/pdf.png" alt="logo" width={40} height={40} />
                            </IntegrationCard>
                            <IntegrationCard position="right-middle">
                               <Image src="https://dar5y10gv8dj8.cloudfront.net/suporta/text.png" alt="logo" width={40} height={40} />
                            </IntegrationCard>
                            <IntegrationCard position="right-bottom">
                                <Image src="https://dar5y10gv8dj8.cloudfront.net/suporta/csv.png" alt="logo" width={40} height={40} />
                            </IntegrationCard>
                        </div>
                    </div>
                    {/* <div className="mx-auto mt-12 max-w-lg space-y-6 text-center">
                        <h2 className="text-balance text-3xl font-semibold md:text-4xl">Integrate with your favorite tools</h2>
                        <p className="text-muted-foreground">Connect seamlessly with popular platforms and services to enhance your workflow.</p>

                        <Button
                            variant="outline"
                            size="sm"
                            asChild>
                            <Link href="#">Get Started</Link>
                        </Button>
                    </div> */}
                </div>
            </div>
        </section>
    )
}

const IntegrationCard = ({ children, className, position, isCenter = false }: { children: React.ReactNode; className?: string; position?: 'left-top' | 'left-middle' | 'left-bottom' | 'right-top' | 'right-middle' | 'right-bottom'; isCenter?: boolean }) => {
    return (
        <div className={cn('bg-background relative flex size-12 rounded-xl border dark:bg-transparent', className)}>
            <div className={cn('relative z-20 m-auto size-fit *:size-7', isCenter && '*:size-8')}>{children}</div>
            {position && !isCenter && (
                <div
                    className={cn(
                        'bg-linear-to-r to-muted-foreground/25 absolute z-10 h-px',
                        position === 'left-top' && 'left-full top-1/2 w-[130px] origin-left rotate-[25deg]',
                        position === 'left-middle' && 'left-full top-1/2 w-[120px] origin-left',
                        position === 'left-bottom' && 'left-full top-1/2 w-[130px] origin-left rotate-[-25deg]',
                        position === 'right-top' && 'bg-linear-to-l right-full top-1/2 w-[130px] origin-right rotate-[-25deg]',
                        position === 'right-middle' && 'bg-linear-to-l right-full top-1/2 w-[120px] origin-right',
                        position === 'right-bottom' && 'bg-linear-to-l right-full top-1/2 w-[130px] origin-right rotate-[25deg]'
                    )}
                />
            )}
        </div>
    )
}