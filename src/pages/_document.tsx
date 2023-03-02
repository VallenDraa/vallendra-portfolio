import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className="dark">
      <Head />
      <noscript>
        Oops your javascript is disabled, Please enable it to continue to my
        porftolio.
      </noscript>

      <body className="overflow-x-hidden bg-indigo-50 caret-indigo-500 selection:bg-pink-200/40 dark:bg-zinc-900 dark:caret-pink-200 dark:selection:bg-indigo-400/40">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
