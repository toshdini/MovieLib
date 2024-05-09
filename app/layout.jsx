import { Inter } from "next/font/google"
import { createClient } from "@/utils/supabase/server";
import "./globals.css";

import { Providers } from "./providers";
import Nav from "./components/header";
import { Footer } from "./components/footer";

const inter = Inter({ subsets: ["latin"] });


export default async function RootLayout({ children }) {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();

  return (
    <html lang="en" className="light">
      <body>
        <Providers className={inter.className}>
          <Nav user={user} />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
