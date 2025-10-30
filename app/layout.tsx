import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "YourCoachAgent - Professional Coaching That Fits Your Life",
  description: "AI-powered coaching sessions, human wisdom, real results. ICF-certified professional coaching for modern leaders.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
