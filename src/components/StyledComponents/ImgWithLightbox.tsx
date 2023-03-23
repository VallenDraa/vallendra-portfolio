import { CldImage, CldImageProps } from "next-cloudinary";
import R from "react";
import clsx from "clsx";
import { Transition } from "@headlessui/react";
import { IoClose } from "react-icons/io5";
import { BiZoomIn, BiZoomOut } from "react-icons/bi";
import Show from "utils/client/jsx/Show";
import LightboxIsActiveContext from "context/LightboxStatusCP";
import { BsAspectRatio } from "react-icons/bs";
import StyledButton from "./StyledButton";

type ImgWithLightboxProps = CldImageProps & {
  disabled?: boolean;
  title?: string;
};

const TRANSLATE_INTERVAL = 50;
const SCALE_INTERVAL = 0.5;
const MIN_IMG_SCALE = 1;
const MAX_IMG_SCALE = 3;

const scaleChecker = (prev: number, newVal: number) => {
  if (newVal > MAX_IMG_SCALE) return MAX_IMG_SCALE;
  if (newVal < MIN_IMG_SCALE) return MIN_IMG_SCALE;

  return newVal;
};

export default function ImgWithLightbox({
  disabled = false,
  title,
  className,
  ...props
}: ImgWithLightboxProps) {
  const imageWrapperRef = R.useRef<HTMLDivElement>(null);

  const { setLightboxIsActive } = R.useContext(LightboxIsActiveContext);
  const [isLightboxActive, setIsLightboxActive] = R.useState(false);
  const [imageScale, setImageScale] = R.useReducer(scaleChecker, MIN_IMG_SCALE);

  const [isDragging, setIsDragging] = R.useState(false);
  const [xTranslate, setXTranslate] = R.useState(0);
  const [yTranslate, setYTranslate] = R.useState(0);

  const handleDragging = (
    e: R.MouseEvent<HTMLDivElement> | R.TouchEvent<HTMLDivElement>,
  ) => {
    if (!isDragging) return;
    if (!imageWrapperRef.current) return;

    const pageX = "pageX" in e ? e.pageX : e.changedTouches[0].pageX;
    const pageY = "pageY" in e ? e.pageY : e.changedTouches[0].pageY;
    const newXTranslate =
      pageX - window.scrollX - imageWrapperRef.current.clientWidth;
    const newYTranslate =
      pageY - window.scrollY - imageWrapperRef.current.clientHeight;

    setXTranslate(newXTranslate);
    setYTranslate(newYTranslate);
  };

  const resetPositioning = () => {
    setXTranslate(0);
    setYTranslate(0);
  };

  const resetScaleAndPositioning = () => {
    setImageScale(MIN_IMG_SCALE);
    resetPositioning();
    setIsDragging(false);
  };

  const LightboxKbdHandler = (e: KeyboardEvent) => {
    switch (e.key) {
      case "Escape":
        if (isLightboxActive) setIsLightboxActive(false);
        break;

      case "r":
        resetScaleAndPositioning();
        break;

      case "=":
        setImageScale(imageScale + SCALE_INTERVAL);
        break;

      case "-":
        setImageScale(imageScale - SCALE_INTERVAL);
        break;

      // invert controls for scale > 1
      case "ArrowUp":
        setYTranslate(prev =>
          imageScale > 1
            ? prev + TRANSLATE_INTERVAL
            : prev - TRANSLATE_INTERVAL,
        );
        break;

      case "ArrowDown":
        setYTranslate(prev =>
          imageScale > 1
            ? prev - TRANSLATE_INTERVAL
            : prev + TRANSLATE_INTERVAL,
        );
        break;

      case "ArrowRight":
        setXTranslate(prev =>
          imageScale > 1
            ? prev - TRANSLATE_INTERVAL
            : prev + TRANSLATE_INTERVAL,
        );
        break;

      case "ArrowLeft":
        setXTranslate(prev =>
          imageScale > 1
            ? prev + TRANSLATE_INTERVAL
            : prev - TRANSLATE_INTERVAL,
        );
        break;

      default:
        break;
    }
  };

  /* disable window scroll when lightbox is active
  ================================================= */
  R.useEffect(() => {
    setLightboxIsActive(isLightboxActive);

    document.body.style.overflowY = isLightboxActive ? "hidden" : "auto";
  }, [isLightboxActive]);

  /* handle navigation keyboard control
  ================================================= */
  R.useEffect(() => {
    window.addEventListener("keydown", LightboxKbdHandler);

    return () => window.removeEventListener("keydown", LightboxKbdHandler);
  }, [isLightboxActive, imageScale]);

  /* reset controls when lightbox is turned off 
  ================================================= */
  R.useEffect(() => {
    if (isLightboxActive) return;

    resetScaleAndPositioning();
  }, [isLightboxActive]);

  /* reset positioning when scale is 1
  ================================================= */
  R.useEffect(() => {
    if (imageScale === 1) resetPositioning();
  }, [imageScale]);

  return (
    <>
      {/* translucent backdrop */}
      <Transition
        as={R.Fragment}
        show={isLightboxActive}
        enter="transition duration-300 ease-out"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition duration-300 ease-out"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          role="none"
          onClick={() => setIsLightboxActive(false)}
          className="fixed inset-0 z-[90] supports-[backdrop-filter]:backdrop-blur-sm dark:bg-zinc-900/60"
        />
      </Transition>

      {/* lightbox controls */}
      <Show when={isLightboxActive}>
        <div className="fixed inset-x-0 top-0 z-[110] bg-indigo-200/50 py-3 dark:bg-zinc-800/50">
          <div className="layout flex items-center justify-between">
            <span className="text-xl font-medium text-zinc-700/90 dark:text-white/90">
              {title}
            </span>

            <div className="flex items-center gap-2">
              {/* reset scale and positioning of the image */}
              <StyledButton
                onClick={resetScaleAndPositioning}
                className="items-center justify-center rounded-full p-1.5 !text-2xl text-zinc-700/90 transition duration-200 hover:bg-white/30 dark:text-white/90"
              >
                <BsAspectRatio />
              </StyledButton>

              {/* zoom the image in */}
              <StyledButton
                onClick={() => setImageScale(imageScale + SCALE_INTERVAL)}
                className="items-center justify-center rounded-full p-1.5 !text-2xl text-zinc-700/90 transition duration-200 hover:bg-white/30 dark:text-white/90"
              >
                <BiZoomIn />
              </StyledButton>

              {/* zoom the image out */}
              <StyledButton
                onClick={() => setImageScale(imageScale - SCALE_INTERVAL)}
                className="items-center justify-center rounded-full p-1.5 !text-2xl text-zinc-700/90 transition duration-200 hover:bg-white/30 dark:text-white/90"
              >
                <BiZoomOut />
              </StyledButton>

              {/* close the lightbox */}
              <StyledButton
                onClick={() => setIsLightboxActive(false)}
                className="hover:bg-red-TRANSLATE_INTERVAL0/30 items-center justify-center rounded-full p-1.5 !text-2xl text-zinc-700/90 transition duration-200 dark:text-white/90"
              >
                <IoClose />
              </StyledButton>
            </div>
          </div>
        </div>
      </Show>

      {/* lightbox image */}
      <Transition
        as="div"
        show={isLightboxActive}
        enter="transition duration-300 ease-out"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition duration-300 ease-out"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className={clsx(
          !isLightboxActive && "hidden",
          isLightboxActive &&
            "fixed left-1/2 top-1/2 z-[100] w-[80%] -translate-x-1/2 -translate-y-1/2 lg:w-[70%]",
        )}
      >
        <div
          ref={imageWrapperRef}
          role="none"
          style={{
            transform: isLightboxActive
              ? `scale(${imageScale}) translate(${xTranslate}px, ${yTranslate}px)`
              : "",
          }}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseMove={handleDragging}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
          onTouchMove={handleDragging}
          onDoubleClick={() =>
            setImageScale(
              imageScale >= MAX_IMG_SCALE
                ? MIN_IMG_SCALE
                : imageScale + SCALE_INTERVAL,
            )
          }
          className={clsx(
            "w-full",
            isLightboxActive &&
              !isDragging &&
              "transition-transform duration-300",
            isLightboxActive && imageScale > MAX_IMG_SCALE
              ? "cursor-move"
              : "cursor-zoom-in",
          )}
        >
          <CldImage {...props} format="webp" quality={50} draggable={false} />
        </div>
      </Transition>

      {/* preview image */}
      <CldImage
        {...props}
        onClick={e => {
          if (!isLightboxActive && !disabled)
            setIsLightboxActive(prev => !prev);

          if (props.onClick) props.onClick(e);
        }}
        className={clsx(
          className,
          !isLightboxActive && !disabled && "cursor-zoom-in",
        )}
        format="webp"
        quality={TRANSLATE_INTERVAL}
        draggable={false}
      />
    </>
  );
}
