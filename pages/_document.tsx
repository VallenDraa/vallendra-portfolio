import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className="dark">
      <Head />
      <body className="overflow-x-hidden scrollbar-thin scrollbar-thumb-white/30 selection:bg-indigo-500/50 hover:scrollbar-thumb-white/50 dark:scrollbar-track-gray-900">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
