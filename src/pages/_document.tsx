import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className="dark scroll-smooth">
      <Head />
      <noscript>
        Oops your javascript is disabled, Please enable it to continue to my
        porftolio.
      </noscript>

      <body className="overflow-x-hidden scroll-smooth bg-indigo-50 caret-pink-400 selection:bg-indigo-400/40 dark:bg-zinc-900 dark:caret-pink-300">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
