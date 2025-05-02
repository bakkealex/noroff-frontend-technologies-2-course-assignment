import type { Metadata } from "next";
import { Montserrat_Alternates } from "next/font/google";
import "@/styles/globals.css";
import PageHeader from "@/components/shared/PageHeader";
import PageFooter from "@/components/shared/PageFooter";

const montserratAlternates = Montserrat_Alternates({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Movie Theatre, by Alexander Bakke",
  description: "Movie Theatre - Information about the latest movies"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserratAlternates.className} flex flex-col min-h-screen`}>
        <PageHeader />
        <main className="flex-1 bg-gray-50 dark:bg-gray-900 transition-colors">{children}</main>
        <PageFooter />
      </body>
    </html>
  );
}