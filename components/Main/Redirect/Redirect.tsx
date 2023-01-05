import { Button, Typography } from "@material-tailwind/react";
import { IoCall } from "react-icons/io5";
import Link from "next/link";
import { useRef } from "react";

/* redirects the user to a contacts page or to my github account
================================================================ */
export default function Redirect() {
  const contactBtnRef = useRef<HTMLButtonElement>(null);

  return (
    <section className="bg-gray-900 relative z-20">
      <div className="max-w-screen-2xl px-2 lg:px-8 mx-auto py-24 flex flex-col items-center">
        <Typography
          as="h2"
          className="text-gray-100 text-3xl sm:text-4xl xl:text-6xl font-bold pt-6"
        >
          Wanna Work Together ?
        </Typography>
        <Button
          className="mt-10 p-0 rounded-full text-xl lg:text-2xl group flex items-center justify-center hover:bg-white focus:bg-white active:bg-white hover:text-black focus:text-black text-gray-300 active:text-black outline outline-2 outline-gray-300 hover:outline-transparent hover:scale-105 hover:-translate-y-1"
          variant="text"
        >
          <Link
            href="/"
            className="py-3 px-6 duration-200 text-center relative w-max flex justify-center items-center gap-3"
          >
            <span className="duration-200">Contact Me</span>
            <IoCall className="duration-200" />
          </Link>
        </Button>
        <Button
          variant="text"
          size="sm"
          color="gray"
          className="mt-4 text-xs underline-offset-2 hover:underline hover:text-gray-300 text-gray-500 transition-colors duration-200 rounded-full"
        >
          <Link href="https://github.com/vallendraa" target="_blank">
            Visit My Github Instead
          </Link>
        </Button>
      </div>
    </section>
  );
}
