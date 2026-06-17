import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/context/UserContext";
import { CourseProvider } from "@/context/CourseContext";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { AuroraBackground } from "@/components/ui/AuroraBackground";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JSVerse Ultimate - Learn JavaScript",
  description: "A world-class interactive JavaScript learning ecosystem.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-300 font-sans">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <AuroraBackground />
          <CustomCursor />
          <CourseProvider>
            <UserProvider>
              <Navbar />
              <main className="flex-1 pt-16 relative z-10">
                {children}
              </main>
            </UserProvider>
          </CourseProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
