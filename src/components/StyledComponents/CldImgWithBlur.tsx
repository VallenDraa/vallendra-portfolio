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
        enter="ease-out duration-500"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-500"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className="absolute inset-0 z-20"
      >
        <CldImage
          {...props}
          src={src}
          quality={1}
          height={72}
          width={96}
          format="webp"
          className="my-0 h-full w-full blur-md"
        />
      </Transition>

      <CldImage
        {...props}
        src={src}
        format="webp"
        sizes={
          hasDynamicSize
            ? "75vw, (min-width: 480px) 80vw, (min-width: 768px) 100vw"
            : ""
        }
        className={clsx(
          "z-10 w-full",
          !className?.includes("absolute") ? "relative" : "absolute",
        )}
        onLoad={() => setHasNotLoaded(false)}
      />
    </div>
  );
}
