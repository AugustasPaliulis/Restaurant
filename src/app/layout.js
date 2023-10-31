import MainLayout from "@/layouts/main_layout";
import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Restaurant",
  description: "Restaurant web",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* NAVBAR */}
        <Navbar />
        {/* Layout of page */}
        <MainLayout>{children}</MainLayout>
        <Footer />
      </body>
    </html>
  );
}
