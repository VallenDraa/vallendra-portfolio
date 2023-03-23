import { CldImage, CldImageProps } from "next-cloudinary";
import R from "react";
import clsx from "clsx";
import { Transition } from "@headlessui/react";
import { IoClose } from "react-icons/io5";
import { BiZoomIn, BiZoomOut } from "react-icons/bi";
import Show from "utils/client/jsx/Show";
import LightboxIsActiveContext from "context/LightboxStatusCP";
import StyledButton from "./StyledButton";

type ImgWithLightboxProps = {
  disabled?: boolean;
} & CldImageProps;

export default function ImgWithLightbox({
  disabled = false,
  className,
  ...props
}: ImgWithLightboxProps) {
  const { setLightboxIsActive } = R.useContext(LightboxIsActiveContext);

  const [isActive, setIsActive] = R.useState(false);
  const [scale, setScale] = R.useReducer((prev: number, next: number) => {
    if (next > 1.8) return 1.8;
    if (next < 1) return 1;

    return next;
  }, 1);

  /* For disabling window scroll when lightbox is active
  ====================================================== */
  R.useEffect(() => {
    setLightboxIsActive(isActive);

    document.body.style.overflowY = isActive ? "hidden" : "auto";
  }, [isActive]);

  /* For handling navigation keyboard control
  ====================================================== */
  R.useEffect(() => {
    const LightboxKbdHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isActive) setIsActive(false);
      }
    };

    window.addEventListener("keydown", LightboxKbdHandler);

    return () => window.removeEventListener("keydown", LightboxKbdHandler);
  }, [isActive]);

  /* For resetting scale
  ====================================================== */
  R.useEffect(() => {
    if (isActive) return;

    setScale(1);
  }, [isActive]);

  return (
    <>
      {/* translucent backdrop */}
      <Transition
        as={R.Fragment}
        show={isActive}
        enter="transition duration-[350ms] ease-out"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition duration-[350ms] ease-out"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          role="none"
          onClick={() => setIsActive(false)}
          className="fixed inset-0 z-[90] supports-[backdrop-filter]:backdrop-blur-md dark:bg-zinc-900/60"
        />
      </Transition>

      {/* lightbox controls */}
      <Show when={isActive}>
        <div className="fixed right-10 top-5 z-[110] flex items-center gap-2">
          <StyledButton
            onClick={() => setScale(scale + 0.2)}
            className="items-center justify-center rounded-full p-1.5 !text-3xl text-white transition duration-200 hover:bg-white/30"
          >
            <BiZoomIn />
          </StyledButton>
          <StyledButton
            onClick={() => setScale(scale - 0.2)}
            className="items-center justify-center rounded-full p-1.5 !text-3xl text-white transition duration-200 hover:bg-white/30"
          >
            <BiZoomOut />
          </StyledButton>

          <StyledButton
            onClick={() => setIsActive(false)}
            className="items-center justify-center rounded-full p-1.5 !text-3xl text-white transition duration-200 hover:bg-red-500/30"
          >
            <IoClose />
          </StyledButton>
        </div>
      </Show>

      {/* lightbox image */}
      <div
        style={props.style}
        className={clsx(
          className,
          isActive &&
            "fixed left-1/2 top-1/2 z-[100] w-[80%] -translate-x-1/2 -translate-y-1/2 animate-fade-in lg:w-[70%]",
        )}
      >
        <CldImage
          {...props}
          onClick={e => {
            if (!isActive && !disabled) setIsActive(prev => !prev);

            if (props.onClick) props.onClick(e);
          }}
          style={{
            transform: isActive ? `scale(${scale}) translate(0, 0)` : "",
          }}
          className={clsx(
            "w-full",
            !isActive && !disabled && "cursor-zoom-in",
            isActive && "transition-transform duration-300",
            isActive && scale > 1 && "cursor-move",
          )}
          format="webp"
          quality={50}
        />
      </div>
    </>
  );
}
