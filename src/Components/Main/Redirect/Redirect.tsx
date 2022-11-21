import { Button, Typography } from "@material-tailwind/react";
import { FC } from "react";
import { IoCall } from "react-icons/io5";
import { Link } from "react-router-dom";
import Line from "../../Line/Line";

// redirects the user to a contacts page or to my github account
//text-transparent bg-clip-text animate-main-gradient bg-gradient bg-gradient-to-r from-pink-300 via-light-blue-300 to-blue-500
const Redirect: FC = () => {
  return (
    <section className="bg-gray-900 relative z-20">
      <div className="max-w-screen-xl mx-auto py-24 flex flex-col items-center">
        <Line className="scale-y-[2.5] relative -top-5 bg-gray-600" />
        <Typography as="h2" className="text-white text-[5rem] font-bold pt-8">
          Wanna Work Together ?
        </Typography>
        <Button
          className="mt-10 p-0 rounded-full text-xl group flex items-center justify-center hover:bg-white focus:bg-white active:bg-white hover:text-black focus:text-black active:text-black outline outline-2 outline-white hover:outline-transparent hover:scale-105 hover:-translate-y-1"
          size="lg"
          variant="text"
          color="white"
        >
          <Link
            to="/"
            className="py-3 px-6 duration-200 text-center relative w-max flex justify-center items-center gap-3"
          >
            <span className="duration-200">Contact Me</span>
            <IoCall className="duration-200" />
          </Link>
        </Button>
        <span></span>
      </div>
    </section>
  );
};

export default Redirect;
