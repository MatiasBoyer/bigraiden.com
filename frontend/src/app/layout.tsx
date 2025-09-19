import "../styles/globals.css";
import { metadata as c_metadata } from "../constants/metadata.constant";
import Footer from "@/components/footer.component";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

export const metadata = c_metadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <div className="flex-grow flex flex-col justify-center items-center">
          {children}
        </div>

        <Footer />
      </body>
    </html>
  );
}
