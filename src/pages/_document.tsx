import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className="dark">
      <Head />
      <body className="scrollbar-kece bg-indigo-50 caret-pink-300 overflow-x-hidden selection:bg-indigo-200/40 dark:bg-gray-900 dark:caret-pink-200 dark:selection:bg-indigo-400/40">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
