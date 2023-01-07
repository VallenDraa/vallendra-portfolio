import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="selection:bg-indigo-500/50 overflow-x-hidden">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
