import { Button, Typography } from "@material-tailwind/react";
import { IoCall } from "react-icons/io5";
import Link from "next/link";

/* redirects the user to a contacts page or to my github account
================================================================ */
export default function Redirect() {
  return (
    <section className="relative z-20 bg-gray-900">
      <div className="relative mx-auto max-w-screen-xl px-2 py-24 lg:px-8">
        {/* blur */}
        <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rotate-90 skew-x-12 scale-90 rounded-full bg-gradient-to-br from-indigo-700 to-pink-700 opacity-50 blur-3xl md:scale-110"></div>

        <div className="relative z-30 flex flex-col items-center">
          <Typography
            as="h2"
            className="pt-6 text-3xl font-bold text-white/90 sm:text-4xl md:text-5xl lg:text-6xl"
          >
            Wanna Work Together ?
          </Typography>
          <Link href="/" className="mt-10">
            <Button
              className="group flex items-center justify-center gap-2 rounded-full text-xl text-gray-300 outline outline-2 outline-gray-300 focus:bg-white focus:text-gray-900 hover:-translate-y-1 hover:scale-105 hover:bg-white hover:text-gray-900 hover:outline-transparent active:bg-white active:text-gray-900 lg:text-2xl"
              variant="text"
            >
              <span className="duration-200">Contact Me</span>
              <IoCall className="duration-200" />
            </Button>
          </Link>
          <Link
            href="https://github.com/vallendraa"
            target="_blank"
            className="mt-4 inline-block"
          >
            <Button
              variant="text"
              size="sm"
              color="gray"
              className="rounded-full text-xs text-gray-500 underline-offset-2 transition-colors duration-200 hover:text-gray-300 hover:underline"
            >
              Visit My Github Instead
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
