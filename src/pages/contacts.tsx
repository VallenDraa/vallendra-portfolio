import { Typography } from "@material-tailwind/react";
import Head from "next/head";
import { FormEvent } from "react";
import { IoMail, IoPaperPlane, IoShareSocial } from "react-icons/io5";
import StyledInput from "../components/StyledComponents/StyledInput";
import StyledTextArea from "../components/StyledComponents/StyledTextArea";
import StyledButton from "../components/StyledComponents/StyledButton";
import { BiBlock } from "react-icons/bi";
import SocialsWithIcon from "../components/SocialWithIcons";
import IconWithTooltip from "../components/IconWithTooltip";

export default function Contacts() {
  function sendMessage(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <>
      <Head>
        <title>VallenDra | Contacts</title>
      </Head>
      <div className="fade-bottom relative flex grow translate-y-20 flex-col bg-indigo-50 after:-top-20 dark:bg-gray-900">
        {/* page title*/}
        <header className="z-60 relative mx-auto mt-6 mb-3 flex w-full max-w-screen-xl flex-col overflow-hidden px-8 xl:px-0">
          <div className="relative flex w-fit items-center gap-1">
            <Typography
              as="h2"
              variant="h2"
              className="primary-gradient relative z-40 animate-breathing bg-gradient-to-r bg-gradient bg-clip-text text-start text-5xl font-bold capitalize text-transparent"
            >
              Let's Connect
            </Typography>
            <span className="text-5xl">🤝</span>
          </div>

          <Typography
            as="p"
            variant="paragraph"
            className="mb-5 mt-1 pl-0.5 text-justify font-medium leading-loose  text-indigo-400 dark:text-white/80"
          >
            You can contact me via email or through others means that are
            provided below !
          </Typography>
        </header>

        {/* form and other contact link */}
        <main className="relative z-20 mx-auto mb-10 flex w-full max-w-screen-xl flex-col-reverse gap-6 px-8 sm:flex-row xl:px-0">
          {/* email form */}
          <form
            onSubmit={sendMessage}
            name="message-form"
            className="card-colors flex grow flex-col gap-4 rounded-md p-6 shadow-md"
          >
            <fieldset className="flex flex-col gap-4">
              <div className="mb-3 space-y-1">
                <Typography
                  as="legend"
                  variant="h3"
                  className="flex items-center gap-2 bg-gradient-to-tr from-pink-300 to-pink-100 bg-clip-text text-2xl font-bold uppercase text-transparent md:text-3xl"
                >
                  <IoMail className="icon-with-bg-colors rounded-lg p-1 text-3xl text-pink-300" />
                  Email Form
                </Typography>
                <Typography
                  as="span"
                  className="font-medium text-indigo-300 dark:text-gray-400"
                >
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
              <StyledButton
                icon={<BiBlock />}
                type="reset"
                variant="text"
                size="md"
                color="red"
              >
                Reset
              </StyledButton>

              <StyledButton
                icon={<IoPaperPlane />}
                type="submit"
                variant="filled"
                size="md"
              >
                Send Message
              </StyledButton>
            </div>
          </form>

          {/* other social media */}
          <aside className="card-colors flex flex-col items-start gap-4 rounded-md p-6 shadow-md transition-[flex-basis] duration-300 dark:bg-gray-800/40 dark:shadow-gray-800/60 sm:basis-1/12">
            <header className="mb-3 w-full flex-col justify-start gap-2 space-y-1 border-b-2 border-indigo-300 pb-5 dark:border-gray-700 sm:justify-center">
              <div className="flex gap-2 sm:justify-center">
                <IconWithTooltip
                  text="My Socials"
                  placement="top"
                  icon={
                    <IoShareSocial className="icon-with-bg-colors rounded-lg p-1 text-3xl text-light-blue-400 sm:text-4xl" />
                  }
                />

                <Typography
                  as="h3"
                  variant="h4"
                  className="flex items-center bg-gradient-to-tr from-light-blue-500 to-light-blue-200 bg-clip-text font-bold uppercase text-transparent sm:hidden"
                >
                  My Socials
                </Typography>
              </div>

              <Typography
                as="p"
                className="font-medium text-indigo-300 dark:text-gray-400 sm:hidden"
              >
                Connect with me and stay updated on my projects or thoughts on
                these platforms
              </Typography>
            </header>
            <main className="flex w-full grow justify-between sm:flex-col ">
              <SocialsWithIcon size="text-4xl" smSize="sm:text-5xl" />
            </main>
          </aside>
        </main>
      </div>
    </>
  );
}
