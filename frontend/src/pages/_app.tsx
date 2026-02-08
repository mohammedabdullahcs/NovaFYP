import type { AppProps } from "next/app";
import { Sora, Space_Grotesk } from "next/font/google";
import "@/styles/globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["400", "500", "600", "700"]
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  weight: ["400", "500", "600", "700"]
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${sora.variable} ${spaceGrotesk.variable} font-sans`}>
      <Component {...pageProps} />
    </div>
  );
}
