import "@/styles/globals.scss";
import { Analytics } from "@vercel/analytics/react";
import { Noto_Sans_JP } from 'next/font/google';

// const noto = Noto_Sans({
//   weight: ['300', '500', '700'],
//   style: ['normal'],
//   subsets: ['latin'],
// });
//
const notoJP = Noto_Sans_JP({
  weight: ['300', '500', '700'],
  style: ['normal'],
  subsets: ['latin'],
});

export default function App({ Component, pageProps }) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${notoJP.style.fontFamily}
        }
      `}</style>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
