import Head from "next/head";

export default function Contacts() {
  return (
    <>
      <Head>
        <title>VallenDra | Contacts</title>
      </Head>
      <div className="fade-bottom relative flex grow translate-y-20 flex-col after:-top-20 dark:bg-gray-900">
        {/* blur */}
        <div
          className={`absolute right-20 top-20 h-80 w-80 rotate-0 skew-x-12 scale-110 rounded-full bg-gradient-to-br from-indigo-700 to-pink-700 opacity-50 blur-3xl transition-transform duration-200`}
        />
      </div>
    </>
  );
}
