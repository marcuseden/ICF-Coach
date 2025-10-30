import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n/language-context";

export const metadata: Metadata = {
  title: "YourCoachAgent - Professional Coaching That Fits Your Life | Professionell coaching som passar ditt liv",
  description: "AI-powered coaching sessions, human wisdom, real results. ICF-certified professional coaching for modern leaders. | AI-drivna coachingsessioner, mänsklig visdom, verkliga resultat. ICF-certifierad professionell coaching för moderna ledare.",
  icons: {
    icon: '/favicon.ico',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv">
      <head>
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
      </head>
      <body className="antialiased">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
