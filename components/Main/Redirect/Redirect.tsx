import { Button, Typography } from "@material-tailwind/react";
import { IoCall } from "react-icons/io5";
import Link from "next/link";

/* redirects the user to a contacts page or to my github account
================================================================ */
export default function Redirect() {
  return (
    <section className="bg-gray-900 relative z-20">
      <div className="max-w-screen-xl px-2 lg:px-8 mx-auto py-24 relative">
        {/* blur */}
        <div className="h-80 w-80 scale-90 md:scale-110 blur-3xl rounded-full skew-x-12 rotate-90 bg-gradient-to-br from-indigo-700 to-pink-700 opacity-50 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"></div>

        <div className="flex flex-col items-center relative z-30">
          <Typography
            as="h2"
            className="text-white/90 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold pt-6"
          >
            Wanna Work Together ?
          </Typography>
          <Link href="/" className="mt-10">
            <Button
              className="rounded-full text-xl lg:text-2xl group flex items-center gap-2 justify-center hover:bg-white focus:bg-white active:bg-white hover:text-gray-900 focus:text-gray-900 text-gray-300 active:text-gray-900 outline outline-2 outline-gray-300 hover:outline-transparent hover:scale-105 hover:-translate-y-1"
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
              className="text-xs underline-offset-2 hover:underline hover:text-gray-300 text-gray-500 transition-colors duration-200 rounded-full"
            >
              Visit My Github Instead
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
