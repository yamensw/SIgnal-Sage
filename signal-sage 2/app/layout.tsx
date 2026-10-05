import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {title:"Signal & Sage — From fog to forward motion",description:"Munich-based strategy, technology and education for businesses ready to move forward.",icons:{icon:"/owl.webp",shortcut:"/owl.webp"}};
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="en"><body>{children}</body></html>}