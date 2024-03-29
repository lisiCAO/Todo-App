import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Todo App",
  description: "A simple todo app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <AuthProvider>
        <body className={inter.className}>
          <div className="flex flex-col min-h-screen">
            <NavBar />
            <main className="flex-grow">
              {children}
            </main>
            <footer className="flex justify-center items-center h-24 bg-custom-gray">
              <p className="text-custom-text">© 2024 - Lisi Cao</p>
            </footer>
          </div>
        </body>
      </AuthProvider>
    </html>
  );
}
