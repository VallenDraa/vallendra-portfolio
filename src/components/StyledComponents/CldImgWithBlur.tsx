import clsx from "clsx";
import { CldImage, CldImageProps } from "next-cloudinary";
import { useState } from "react";

type CldImgWithBlurProps = CldImageProps & {
  hasDynamicSize?: boolean;
};

export default function CldImgWithBlur({
  className,
  hasDynamicSize = true,
  ...props
}: CldImgWithBlurProps) {
  const [hasLoaded, setHasLoaded] = useState(false);

  return (
    <div
      className={clsx(
        !className?.includes("absolute") && "relative",
        className,
        "overflow-clip",
      )}
    >
      <CldImage
        {...props}
        quality={1}
        height={144}
        width={192}
        format="webp"
        effects={[{ blur: "2000" }]}
        className={clsx(!hasLoaded && "blur-sm", "absolute my-0 h-full w-full")}
      />

      <CldImage
        {...props}
        format="webp"
        sizes={
          hasDynamicSize
            ? "75vw, (min-width: 480px) 80vw, (min-width: 768px) 100vw"
            : ""
        }
        className={clsx(
          !className?.includes("absolute") ? "relative" : "absolute",
          "z-10 w-full",
        )}
        onLoad={() => setHasLoaded(true)}
      />
    </div>
  );
}
