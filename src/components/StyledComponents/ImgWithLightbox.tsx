import { CldImage, CldImageProps } from "next-cloudinary";
import R from "react";
import clsx from "clsx";
import { Transition, Dialog } from "@headlessui/react";
import { IoClose } from "react-icons/io5";
import { BiZoomIn, BiZoomOut } from "react-icons/bi";
import LightboxIsActiveContext from "context/LightboxStatusCP";
import { BsAspectRatio } from "react-icons/bs";
import throttle from "just-throttle";
import StyledButton from "./StyledButton";

type ImgWithLightboxProps = CldImageProps & {
  disabled?: boolean;
  title?: string;
};

type DragEvent =
  | R.MouseEvent<HTMLImageElement>
  | R.TouchEvent<HTMLImageElement>;

const TRANSLATE_INTERVAL = 50;
const SCALE_INTERVAL = 0.5;
const MIN_IMG_SCALE = 1;
const MAX_IMG_SCALE = 4;

const scaleChecker = (
  prev: number,
  incoming: { add?: number; override?: number },
) => {
  let newVal: number;

  if (incoming.add) {
    newVal = prev + incoming.add;
  } else if (incoming.override) {
    newVal = incoming.override;
  } else {
    newVal = MIN_IMG_SCALE;
  }

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

  const dragStartPointRef = R.useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const xTranslateRef = R.useRef(0);
  const yTranslateRef = R.useRef(0);

  const resetPositioning = R.useCallback(() => {
    xTranslateRef.current = 0;
    yTranslateRef.current = 0;
  }, []);

  const resetScaleAndPositioning = R.useCallback(() => {
    setImageScale({ override: MIN_IMG_SCALE });
    resetPositioning();
  }, []);

  const renderImgPosition = R.useCallback(
    (scale: number, xTranslate: number, yTranslate: number) => {
      if (!imageWrapperRef.current) return;

      imageWrapperRef.current.style.transform = `scale(${scale}) translate(${xTranslate}px, ${yTranslate}px)`;
    },
    [imageWrapperRef],
  );

  const handleStartDrag = R.useCallback(
    (e: DragEvent) => {
      if (imageScale === MIN_IMG_SCALE) return;
      setIsDragging(true);

      const pageX = "pageX" in e ? e.pageX : e.changedTouches[0].pageX;
      const pageY = "pageY" in e ? e.pageY : e.changedTouches[0].pageY;

      dragStartPointRef.current = { x: pageX, y: pageY };
    },
    [imageScale],
  );

  const handleDragging = R.useCallback(
    (e: DragEvent) => {
      if (!isDragging) return;
      if (!imageWrapperRef.current) return;

      const { x: xStart, y: yStart } = dragStartPointRef.current;

      const pageX = "pageX" in e ? e.pageX : e.changedTouches[0].pageX;
      const pageY = "pageY" in e ? e.pageY : e.changedTouches[0].pageY;

      xTranslateRef.current += (pageX - xStart) / imageScale;
      yTranslateRef.current += (pageY - yStart) / imageScale;

      renderImgPosition(
        imageScale,
        xTranslateRef.current,
        yTranslateRef.current,
      );

      dragStartPointRef.current = { x: pageX, y: pageY };
    },
    [isDragging, imageScale, xTranslateRef, yTranslateRef],
  );

  const handleStopDrag = R.useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
  }, [isDragging]);

  const LightboxKbdHandler = R.useCallback(
    throttle(
      (e: KeyboardEvent) => {
        switch (e.key) {
          case "Escape":
            setIsLightboxActive(false);
            break;

          case "r":
            resetScaleAndPositioning();
            setIsDragging(false);
            break;

          case "=":
            if (imageScale < MAX_IMG_SCALE)
              setImageScale({ add: SCALE_INTERVAL });
            break;

          case "-":
            if (imageScale > MIN_IMG_SCALE)
              setImageScale({ add: -SCALE_INTERVAL });
            break;

          case "ArrowUp":
            if (imageScale > MIN_IMG_SCALE)
              yTranslateRef.current += TRANSLATE_INTERVAL;
            break;

          case "ArrowDown":
            if (imageScale > MIN_IMG_SCALE)
              yTranslateRef.current -= TRANSLATE_INTERVAL;
            break;

          case "ArrowRight":
            if (imageScale > MIN_IMG_SCALE)
              xTranslateRef.current -= TRANSLATE_INTERVAL;
            break;

          case "ArrowLeft":
            if (imageScale > MIN_IMG_SCALE)
              xTranslateRef.current += TRANSLATE_INTERVAL;
            break;

          default:
            break;
        }

        renderImgPosition(
          imageScale,
          xTranslateRef.current,
          yTranslateRef.current,
        );
      },
      150,
      { leading: true },
    ),
    [imageScale, xTranslateRef, yTranslateRef],
  );

  /*  lightbox lifecycle
  ================================================= */
  R.useEffect(() => {
    setLightboxIsActive(isLightboxActive);

    if (isLightboxActive) {
      document.body.style.overflowY = "hidden";
    } else {
      setIsDragging(false);
      resetScaleAndPositioning();
    }
  }, [isLightboxActive]);

  /* handle navigation keyboard control
  ================================================= */
  R.useEffect(() => {
    window.addEventListener("keydown", LightboxKbdHandler);

    return () => window.removeEventListener("keydown", LightboxKbdHandler);
  }, [isLightboxActive, imageScale]);

  /* re-render image after scale is changed
  ================================================= */
  R.useEffect(() => {
    if (imageScale === MIN_IMG_SCALE) resetPositioning();

    renderImgPosition(imageScale, xTranslateRef.current, yTranslateRef.current);
  }, [imageScale]);

  return (
    <>
      <Transition show={isLightboxActive}>
        <Dialog onClose={() => null} className="fixed z-[60]">
          <Transition.Child
            enter="transition duration-300 ease-out"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition duration-300 ease-out"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            className="fixed inset-0 flex h-screen items-center justify-center"
          >
            {/* translucent backdrop */}
            <div
              role="none"
              onClick={() => setIsLightboxActive(false)}
              className="fixed inset-0 bg-indigo-100/80 dark:bg-zinc-900/80"
            />

            {/* lightbox controls */}
            <Dialog.Panel className="absolute top-0 z-10 w-full bg-indigo-50/50 py-3 dark:bg-zinc-800/50">
              <div className="layout flex items-center justify-between gap-2">
                <Dialog.Title className="h5 font-medium text-zinc-700/90 dark:text-white/90">
                  {title}
                </Dialog.Title>

                <div className="flex items-center gap-2">
                  {/* zoom the image in */}
                  <StyledButton
                    onClick={() => setImageScale({ add: SCALE_INTERVAL })}
                    disabled={imageScale === MAX_IMG_SCALE}
                    className={clsx(
                      "disabled:cursor-not-allowed disabled:text-zinc-700/40 disabled:hover:bg-transparent disabled:dark:text-white/40",
                      "items-center justify-center rounded-full p-1.5 !text-2xl text-zinc-700/90 transition duration-200 hover:bg-white/30 dark:text-white/90",
                    )}
                  >
                    <BiZoomIn />
                  </StyledButton>

                  {/* zoom the image out */}
                  <StyledButton
                    onClick={() => setImageScale({ add: -SCALE_INTERVAL })}
                    disabled={imageScale === MIN_IMG_SCALE}
                    className={clsx(
                      "disabled:cursor-not-allowed disabled:text-zinc-700/40 disabled:hover:bg-transparent disabled:dark:text-white/40",
                      "items-center justify-center rounded-full p-1.5 !text-2xl text-zinc-700/90 transition duration-200 hover:bg-white/30 dark:text-white/90",
                    )}
                  >
                    <BiZoomOut />
                  </StyledButton>

                  {/* reset scale and positioning of the image */}
                  <StyledButton
                    onClick={() => {
                      resetScaleAndPositioning();
                      setIsDragging(false);
                    }}
                    disabled={imageScale === MIN_IMG_SCALE}
                    className={clsx(
                      "disabled:cursor-not-allowed disabled:text-zinc-700/40 disabled:hover:bg-transparent disabled:dark:text-white/40",
                      "items-center justify-center rounded-full p-1.5 !text-2xl text-zinc-700/90 transition duration-200 hover:bg-white/30 dark:text-white/90",
                    )}
                  >
                    <BsAspectRatio />
                  </StyledButton>

                  {/* close the lightbox */}
                  <StyledButton
                    onClick={() => {
                      setIsLightboxActive(false);
                    }}
                    className="items-center justify-center rounded-full p-1.5 !text-2xl text-zinc-700/90 transition duration-200 hover:bg-red-500/30 dark:text-white/90"
                  >
                    <IoClose />
                  </StyledButton>
                </div>
              </div>
            </Dialog.Panel>

            {/* lightbox image */}
            <Dialog.Panel
              ref={imageWrapperRef}
              role="none"
              draggable={false}
              onClick={() => setIsLightboxActive(false)}
              className={clsx(
                "layout relative",
                isLightboxActive &&
                  !isDragging &&
                  "transition-transform duration-300",
              )}
              style={{ transform: `scale(1) translate(0px, 0px)` }}
            >
              {/* placeholder for loading image */}
              <CldImage
                {...props}
                quality={90}
                format="webp"
                draggable={false}
                onClick={e => e.stopPropagation()}
                className={clsx(
                  "relative z-10 mx-auto w-full",
                  isLightboxActive && imageScale > MIN_IMG_SCALE
                    ? "cursor-move"
                    : "cursor-zoom-in",
                )}
                onMouseLeave={() => isDragging && setIsDragging(false)}
                onMouseDown={handleStartDrag}
                onMouseUp={handleStopDrag}
                onMouseMove={handleDragging}
                onTouchStart={handleStartDrag}
                onTouchEnd={handleStopDrag}
                onTouchMove={handleDragging}
                onDoubleClick={() => {
                  setImageScale(
                    imageScale >= MAX_IMG_SCALE
                      ? { override: MIN_IMG_SCALE }
                      : { add: SCALE_INTERVAL },
                  );
                }}
              />
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>

      {/* preview image */}
      <CldImage
        {...props}
        onClick={e => {
          if (!isLightboxActive && !disabled) {
            setIsLightboxActive(true);
          }

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
