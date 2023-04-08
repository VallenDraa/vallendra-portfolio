import clsx from "clsx";
import { CldImage, CldImageProps } from "next-cloudinary";
import { useState } from "react";
import Show from "utils/client/jsx/Show";

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
      <Show when={!hasLoaded}>
        <CldImage
          {...props}
          quality={1}
          height={144}
          width={192}
          format="webp"
          effects={[{ blur: "2000" }]}
          className="absolute my-0 h-full w-full blur-sm"
        />
      </Show>

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
