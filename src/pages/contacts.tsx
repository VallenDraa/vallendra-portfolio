import { Typography } from "@material-tailwind/react";
import { FormEvent } from "react";
import {
  IoWarning,
  IoInformationCircle,
  IoMail,
  IoPaperPlane,
  IoShareSocial,
} from "react-icons/io5";
import StyledInput from "../components/StyledComponents/StyledInput";
import StyledTextArea from "../components/StyledComponents/StyledTextArea";
import StyledButton from "../components/StyledComponents/StyledButton";
import { BiBlock } from "react-icons/bi";
import SocialsWithIcon from "../components/SocialWithIcons";
import IconWithTooltip from "../components/IconWithTooltip";
import Observe from "../components/Observe";
import fadeIn from "../utils/client/helpers/animateOnObserved";
import R from "react";
import { EmailBody } from "./api/email";
import Seo from "../seo/Seo";
import contactsPageSeo from "../seo/contactsPage.seo";
import StyledAlert from "../components/StyledComponents/StyledAlert";
import alertHandler from "../utils/client/helpers/alertHandler";

export default function Contacts() {
  /* Email body content refs
  ========================== */
  const emailRef = R.useRef("");
  const subjectRef = R.useRef("");
  const messageRef = R.useRef("");

  /* Email alert
  ========================== */
  const [showAlert, setShowAlert] = R.useState(false);
  const [emailIsSending, setEmailIsSending] = R.useState(false);
  const [emailHasError, setEmailHasError] = R.useState(false);

  const sendEmail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmailIsSending(true);

    if (!emailRef.current) return;
    if (!subjectRef.current) return;
    if (!messageRef.current) return;

    const email: EmailBody = {
      senderEmail: emailRef.current,
      emailSubject: subjectRef.current,
      message: messageRef.current,
    };

    try {
      await fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(email),
      });

      setEmailHasError(false);
    } catch (error) {
      setEmailHasError(true);
    } finally {
      alertHandler({
        setShowAlert,
        onShow: () => setEmailIsSending(false),
        showDelay: 500,
      });
    }
  };

  return (
    <>
      <Seo base={contactsPageSeo.base} og={contactsPageSeo.og} />

      {/* alert that is shown after sending an email */}
      <StyledAlert
        icon={
          emailHasError ? (
            <IoWarning className="text-2xl" />
          ) : (
            <IoInformationCircle className="text-2xl" />
          )
        }
        color={emailHasError ? "red" : "green"}
        show={showAlert}
        dismissible={{ onClose: () => setShowAlert(false) }}
      >
        {emailHasError
          ? "Failed to send email, please try again later !"
          : "Email was successfully sent !"}
      </StyledAlert>

      <div className="fade-bottom relative flex grow translate-y-20 flex-col after:-top-20">
        {/* page title*/}
        <Observe
          freezeOnceVisible
          onEnter={(ref) => fadeIn(ref, "animate-fade-in-left", 0)}
        >
          <header className="z-60 relative mx-auto mt-6 mb-3 flex w-full max-w-screen-xl flex-col px-8 opacity-0 2xl:px-2">
            <div className="relative flex w-fit items-center gap-1">
              <Typography
                as="h2"
                variant="h2"
                className="primary-gradient relative z-40 w-fit animate-breathing bg-gradient-to-r bg-gradient bg-clip-text text-start text-4xl font-bold capitalize !leading-[initial] text-transparent md:text-5xl"
              >
                Let's Connect
              </Typography>
              <span className="text-4xl md:text-5xl">🤝</span>
            </div>

            <Typography
              as="p"
              variant="paragraph"
              className="mb-5 mt-1 pl-0.5 text-justify text-base font-medium leading-loose text-indigo-700 dark:text-white/80 md:text-lg"
            >
              You can contact me via email or through others means provided
              below !
            </Typography>
          </header>
        </Observe>

        {/* form and other contact link */}
        <main className="relative z-20 mx-auto mb-10 flex w-full max-w-screen-xl flex-col-reverse gap-6 overflow-hidden px-8 sm:flex-row 2xl:px-2">
          {/* email form */}
          <Observe
            freezeOnceVisible
            onEnter={(ref) => fadeIn(ref, "animate-fade-in-left", 100)}
          >
            <form
              onSubmit={sendEmail}
              name="message-form"
              className="card-colors flex grow flex-col gap-4 rounded-md p-6 opacity-0 shadow-md"
            >
              <Observe
                freezeOnceVisible
                onEnter={(ref) => fadeIn(ref, "animate-fade-in-top", 200)}
              >
                <fieldset className="flex flex-col gap-4 opacity-0">
                  <div className="mb-3 space-y-1 ">
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
                      className="font-medium text-indigo-600 dark:text-gray-400"
                    >
                      Fill the fields below to send a message via email !
                    </Typography>
                  </div>

                  {/* inputs */}
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <StyledInput
                      onChange={(e) => (emailRef.current = e.target.value)}
                      required
                      label="E-mail"
                      type="email"
                      aria-label="email input"
                    />
                    <StyledInput
                      onChange={(e) => (subjectRef.current = e.target.value)}
                      required
                      label="Subject"
                      type="text"
                      aria-label="email subject input"
                    />
                  </div>

                  <StyledTextArea
                    onChange={(e) => (messageRef.current = e.target.value)}
                    required
                    label="Message"
                    rows={6}
                    aria-label="email content input"
                  />
                </fieldset>
              </Observe>

              <Observe
                freezeOnceVisible
                onEnter={(ref) => fadeIn(ref, "animate-fade-in-top", 400)}
              >
                <div
                  role="group"
                  className="flex items-center gap-2 self-end opacity-0"
                >
                  <StyledButton
                    disabled={emailIsSending}
                    icon={<BiBlock />}
                    type="reset"
                    variant="text"
                    size="md"
                    color="red"
                    className={`h-full ${
                      emailIsSending ? "animate-pulse" : ""
                    }`}
                  >
                    Reset
                  </StyledButton>

                  <StyledButton
                    disabled={emailIsSending}
                    icon={<IoPaperPlane />}
                    type="submit"
                    variant="filled"
                    size="md"
                    className={`${emailIsSending ? "animate-pulse" : ""}`}
                  >
                    Send Message
                  </StyledButton>
                </div>
              </Observe>
            </form>
          </Observe>

          {/* other social media */}
          <Observe
            freezeOnceVisible
            onEnter={(ref) => fadeIn(ref, "animate-fade-in-right", 200)}
          >
            <aside className="card-colors flex flex-col items-start gap-0 rounded-md p-6 opacity-0 shadow-md transition-[flex-basis] duration-300 dark:bg-gray-800/40 dark:shadow-gray-800/60 sm:basis-1/12">
              <header className="mb-3 w-full flex-col justify-start gap-2 space-y-1 border-b-2 border-indigo-300 pb-5 dark:border-gray-700 sm:justify-center">
                <div className="flex gap-2 sm:justify-center">
                  <IconWithTooltip
                    withPadding={false}
                    isButton={false}
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
                  variant="paragraph"
                  className="font-medium text-indigo-600 dark:text-gray-400 sm:hidden"
                >
                  Connect with me and stay updated on my projects or thoughts on
                  these platforms
                </Typography>
              </header>
              <Observe
                freezeOnceVisible
                onEnter={(ref) => fadeIn(ref, "animate-fade-in-top", 400)}
              >
                <main className="flex w-full grow justify-between opacity-0 sm:flex-col">
                  <SocialsWithIcon size="text-4xl" smSize="sm:text-5xl" />
                </main>
              </Observe>
            </aside>
          </Observe>
        </main>
      </div>
    </>
  );
}
