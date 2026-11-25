import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import "./light.css";

export const metadata: Metadata = {
  title: "Mandip Pandit — Software Engineer",
  description:
    "Mandip Pandit is a Bengaluru-based software engineer building reliable Java and Spring Boot systems for warehouse operations, banking, and the teams behind them.",
  applicationName: "Mandip Pandit Portfolio",
  keywords: [
    "Mandip Pandit",
    "Software Engineer",
    "Java",
    "Spring Boot",
    "Microservices",
    "Honeywell",
    "LogLens",
  ],
  authors: [{ name: "Mandip Pandit" }],
  creator: "Mandip Pandit",
  openGraph: {
    type: "website",
    title: "Mandip Pandit — Software Engineer",
    description:
      "Backend-focused engineer building reliable systems for warehouse operations, banking, and the teams behind them.",
    siteName: "Mandip Pandit",
    locale: "en_IN",
  },
  twitter: {
    card: "summary",
    title: "Mandip Pandit — Software Engineer",
    description:
      "Backend-focused engineer building reliable systems for warehouse operations, banking, and the teams behind them.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#f7f9fd",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Mandip Pandit",
    jobTitle: "Software Engineer",
    email: "mailto:mandip.pandit95@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bengaluru",
      addressCountry: "IN",
    },
    sameAs: [
      "https://github.com/mandipdungeon17",
      "https://www.linkedin.com/in/mandip-pandit",
      "https://leetcode.com/u/mandip17",
    ],
  };

  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
