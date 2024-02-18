import MainLayout from "@/layouts/main_layout";
import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { FirebaseAuthContext } from "@/context/firebase/auth/context";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Restaurant",
  description: "Restaurant web",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Script
        id="Cookiebot"
        src="https://consent.cookiebot.com/uc.js"
        data-cbid="09554e7a-afed-4041-ae77-6edbd95c96c0"
        data-blockingmode="auto"
        type="text/javascript"
      ></Script>
      <body className={inter.className}>
        {/* NAVBAR */}
        <FirebaseAuthContext>
          <Navbar />
          {/* Layout of page */}
          <MainLayout>{children}</MainLayout>
          <Footer />
        </FirebaseAuthContext>
      </body>
    </html>
  );
}
