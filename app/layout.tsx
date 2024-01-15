import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import ToastProvider from "@/components/providers/ToastProvider";
import NotesContext from "@/components/context/NoteContext";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Notez",
  description: "Simple note taking app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={manrope.className}>
        <NotesContext>
          <ToastProvider />
          {children}
        </NotesContext>
      </body>
    </html>
  );
}
