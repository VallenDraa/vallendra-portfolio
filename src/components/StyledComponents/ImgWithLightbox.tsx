import { CldImage, CldImageProps } from "next-cloudinary";
import R from "react";
import clsx from "clsx";
import { Transition } from "@headlessui/react";
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

const TRANSLATE_INTERVAL = 50;
const SCALE_INTERVAL = 0.5;
const MIN_IMG_SCALE = 1;
const MAX_IMG_SCALE = 3;

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
  const [xTranslate, setXTranslate] = R.useState(0);
  const [yTranslate, setYTranslate] = R.useState(0);

  const resetPositioning = R.useCallback(() => {
    setXTranslate(0);
    setYTranslate(0);
  }, []);

  const resetScaleAndPositioning = R.useCallback(() => {
    setImageScale({ override: MIN_IMG_SCALE });
    resetPositioning();
    setIsDragging(false);
  }, []);

  const handleStartDrag = R.useCallback(
    (e: R.MouseEvent<HTMLDivElement> | R.TouchEvent<HTMLDivElement>) => {
      if (imageScale === MIN_IMG_SCALE) return;
      setIsDragging(true);

      const pageX = "pageX" in e ? e.pageX : e.changedTouches[0].pageX;
      const pageY = "pageY" in e ? e.pageY : e.changedTouches[0].pageY;

      dragStartPointRef.current = { x: pageX, y: pageY };
    },
    [imageScale],
  );

  const handleDragging = R.useCallback(
    (e: R.MouseEvent<HTMLDivElement> | R.TouchEvent<HTMLDivElement>) => {
      if (!isDragging) return;
      if (!imageWrapperRef.current) return;

      const { x: xStart, y: yStart } = dragStartPointRef.current;

      const pageX = "pageX" in e ? e.pageX : e.changedTouches[0].pageX;
      const pageY = "pageY" in e ? e.pageY : e.changedTouches[0].pageY;

      setXTranslate(prev => prev + (pageX - xStart) / imageScale);
      setYTranslate(prev => prev + (pageY - yStart) / imageScale);

      dragStartPointRef.current = { x: pageX, y: pageY };
    },
    [isDragging, imageScale],
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
            if (isLightboxActive) setIsLightboxActive(false);
            break;

          case "r":
            resetScaleAndPositioning();
            break;

          case "=":
            if (imageScale < MAX_IMG_SCALE)
              setImageScale({ add: SCALE_INTERVAL });
            break;

          case "-":
            if (imageScale > MIN_IMG_SCALE)
              setImageScale({ add: -SCALE_INTERVAL });
            break;

          // invert controls for scale > 1
          case "ArrowUp":
            if (imageScale > MIN_IMG_SCALE)
              setYTranslate(prev => prev + TRANSLATE_INTERVAL);
            break;

          case "ArrowDown":
            if (imageScale > MIN_IMG_SCALE)
              setYTranslate(prev => prev - TRANSLATE_INTERVAL);
            break;

          case "ArrowRight":
            if (imageScale > MIN_IMG_SCALE)
              setXTranslate(prev => prev - TRANSLATE_INTERVAL);
            break;

          case "ArrowLeft":
            if (imageScale > MIN_IMG_SCALE)
              setXTranslate(prev => prev + TRANSLATE_INTERVAL);
            break;

          default:
            break;
        }
      },
      150,
      { leading: true },
    ),
    [isLightboxActive, imageScale],
  );

  /* disable window scroll when lightbox is active
  ================================================= */
  R.useEffect(() => {
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

  /* reset position if scale is 1
  ================================================= */
  R.useEffect(() => {
    if (imageScale === MIN_IMG_SCALE) {
      resetPositioning();
    }
  }, [imageScale]);

  /* control context
  ================================================= */
  R.useEffect(() => setLightboxIsActive(isLightboxActive), [isLightboxActive]);

  return (
    <>
      <Transition
        as="div"
        show={isLightboxActive}
        enter="transition duration-300 ease-out"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition duration-300 ease-out"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className="fixed inset-0 left-1/2 top-1/2 z-[100] flex h-screen w-screen -translate-x-1/2 -translate-y-1/2 items-center justify-center"
      >
        {/* translucent backdrop */}
        <div
          role="none"
          onClick={() => {
            setIsLightboxActive(false);
          }}
          className="fixed inset-0 bg-indigo-100/80 dark:bg-zinc-900/80"
        />

        {/* lightbox controls */}
        <div className="fixed top-0 z-[110] w-full bg-indigo-50/50 py-3 dark:bg-zinc-800/50">
          <div className="layout flex items-center justify-between">
            <span className="text-xl font-medium text-zinc-700/90 dark:text-white/90">
              {title}
            </span>

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
                onClick={resetScaleAndPositioning}
                disabled={
                  imageScale === MIN_IMG_SCALE &&
                  xTranslate === 0 &&
                  yTranslate === 0
                }
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
        </div>

        {/* lightbox image */}
        <div
          ref={imageWrapperRef}
          role="none"
          style={{
            transform: `scale(${imageScale}) translate(${xTranslate}px, ${yTranslate}px)`,
          }}
          draggable={false}
          onMouseLeave={() => isDragging && setIsDragging(false)}
          onMouseDown={handleStartDrag}
          onMouseUp={handleStopDrag}
          onMouseMove={handleDragging}
          onTouchStart={handleStartDrag}
          onTouchEnd={handleStopDrag}
          onTouchMove={handleDragging}
          onDoubleClick={() =>
            setImageScale(
              imageScale >= MAX_IMG_SCALE
                ? { override: MIN_IMG_SCALE }
                : { add: SCALE_INTERVAL },
            )
          }
          className={clsx(
            !isLightboxActive && "hidden",
            isLightboxActive &&
              !isDragging &&
              "transition-transform duration-300",
            isLightboxActive && imageScale > MIN_IMG_SCALE
              ? "cursor-move"
              : "cursor-zoom-in",
          )}
        >
          <CldImage
            {...props}
            quality={50}
            format="webp"
            draggable={false}
            className="mx-auto"
          />
        </div>
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
