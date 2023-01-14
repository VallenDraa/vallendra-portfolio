import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className="dark">
      <Head />
      <body className="overflow-x-hidden selection:bg-indigo-500/50">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
