import { Inter } from "next/font/google"
import Nav from "./components/header";
import { Providers } from "./providers";
import "./globals.css";
import { Footer } from "./components/footer";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light">
      <body>
        <Providers className={inter.className}>
          <Nav />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
