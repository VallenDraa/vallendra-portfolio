import clsx from "clsx";
import { CldImage, CldImageProps } from "next-cloudinary";
import { Transition } from "@headlessui/react";
import { useState } from "react";

type CldImgWithBlurProps = CldImageProps & {
  hasDynamicSize?: boolean;
};

export default function CldImgWithBlur({
  className,
  hasDynamicSize = true,
  src,
  ...props
}: CldImgWithBlurProps) {
  const [hasNotLoaded, setHasNotLoaded] = useState(true);

  return (
    <div
      className={clsx(
        !className?.includes("absolute") && "relative",
        className,
        "overflow-clip",
      )}
    >
      <Transition
        show={hasNotLoaded}
        enter="ease-out duration-150"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className="absolute inset-0 z-20 blur-md backdrop-blur-md"
      >
        <CldImage
          {...props}
          src={src}
          quality={1}
          height={36}
          width={48}
          format="webp"
          priority
          className="m-0 h-full w-full"
        />
      </Transition>

      <CldImage
        {...props}
        src={src}
        format="webp"
        priority={false}
        onLoad={() => setHasNotLoaded(false)}
        sizes={
          hasDynamicSize
            ? "75vw, (min-width: 480px) 80vw, (min-width: 768px) 100vw"
            : ""
        }
        className={clsx(
          "z-10 w-full",
          !className?.includes("absolute") ? "relative" : "absolute",
        )}
      />
    </div>
  );
}
