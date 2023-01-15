import { Button, Typography } from "@material-tailwind/react";
import Head from "next/head";
import StyledInput from "../components/StyledComponents/StyledInput";
import { IoMail, IoPaperPlane } from "react-icons/io5";
import { MdBlock } from "react-icons/md";
import { FormEvent } from "react";
import StyledTextArea from "../components/StyledComponents/StyledTextArea";

export default function Contacts() {
  function sendMessage(e: FormEvent) {
    e.preventDefault();
  }

  return (
    <>
      <Head>
        <title>VallenDra | Contacts</title>
      </Head>
      <div className="fade-bottom relative flex grow translate-y-20 flex-col after:-top-20 dark:bg-gray-900">
        {/* blur */}
        <div className="absolute right-20 top-20 h-80 w-80 rotate-0 skew-x-12 scale-110 rounded-full bg-gradient-to-br from-indigo-700 to-pink-700 opacity-50 blur-3xl transition-transform duration-200" />

        {/* page title*/}
        <header className="z-60 relative mx-auto mt-6 mb-3 flex w-full max-w-screen-xl flex-col overflow-hidden px-8 xl:px-0">
          <div className="gradient-underline gradient-underline--indigo-to-pink relative flex w-fit items-center gap-1">
            <Typography
              as="h2"
              variant="h2"
              className="animate-breathing bg-gradient-to-r from-indigo-300 to-pink-200 bg-gradient bg-clip-text text-start text-5xl font-bold capitalize text-transparent"
            >
              Let's Connect
            </Typography>
            <span className="text-5xl">🤝</span>
          </div>

          <Typography
            as="p"
            variant="paragraph"
            className="my-5 pl-0.5 text-justify font-medium leading-loose text-white/80"
          >
            You can contact me via email or through others means that are
            provided below !
          </Typography>
        </header>

        {/* form and other contact link */}
        <main className="relative z-20 mx-auto mb-10 flex w-full max-w-screen-xl flex-col gap-6 px-8 xl:flex-row xl:px-0">
          {/* email form */}
          <form
            onSubmit={sendMessage}
            name="message-form"
            className="flex flex-col gap-4 rounded-md p-6 shadow-md dark:bg-gray-800/40 dark:shadow-gray-800/60 xl:basis-2/3"
          >
            <fieldset className="flex flex-col gap-4">
              <div className="mb-3 space-y-1">
                <Typography
                  as="legend"
                  variant="h3"
                  className="flex items-center gap-2 bg-gradient-to-tr from-light-blue-500 to-white bg-clip-text text-2xl font-bold uppercase text-transparent md:text-3xl"
                >
                  <IoMail className="rounded-lg bg-gray-700/90 p-1 text-3xl text-light-blue-400" />
                  Email Form
                </Typography>
                <Typography as="span" className="font-medium text-gray-400">
                  Fill the fields below to send a message via email !
                </Typography>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <StyledInput required label="Name" name="name" type="text" />
                <StyledInput
                  required
                  label="E-mail"
                  name="email"
                  type="email"
                />
                <StyledInput label="Phone" name="phone" type="tel" />
                <StyledInput
                  required
                  label="Subject"
                  name="subject"
                  type="text"
                />
              </div>
              <StyledTextArea
                required
                label="Message"
                name="message"
                rows={6}
              />
            </fieldset>

            <div role="group" className="flex gap-2 self-end">
              <Button
                type="submit"
                variant="text"
                size="md"
                color="red"
                className="group relative flex w-max items-center justify-center gap-2 rounded-full text-center duration-200"
              >
                <span className="translate-x-2.5 transition-transform duration-200 group-hover:translate-x-0">
                  Reset
                </span>
                <MdBlock className="relative -translate-x-4 text-sm  opacity-0 transition duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
              </Button>

              <Button
                type="submit"
                variant="filled"
                size="md"
                className="group relative flex w-max items-center justify-center gap-2 rounded-full text-center duration-200"
              >
                <span className="translate-x-2.5 transition-transform duration-200 group-hover:translate-x-0">
                  Send Message
                </span>
                <IoPaperPlane className="relative -translate-x-4 text-sm  opacity-0 transition duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
              </Button>
            </div>
          </form>

          {/* other social media */}
          <aside className="flex grow flex-col gap-4 rounded-md p-6 shadow-md dark:bg-gray-800/40 dark:shadow-gray-800/60"></aside>
        </main>
      </div>
    </>
  );
}
